from app import app
from openai import OpenAI
import requests
from flask import request
import os
import json

gpt_api_key = os.environ.get("OPENAI_API_KEY")


@app.route("/")
def index():
    return "This is an awesome Hack Junction project!"


def get_item_name(image):
    # dummy
    return "Logitech Mouse M100"

    client = OpenAI(api_key=gpt_api_key)
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "system",
                "content": "You are given an image of a single item. Please provide a name of the item (name of item, as well as any other information that is helpful in identifying the item, such as manufacturer, model number)",
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{image}"},
                    },
                ],
            },
        ],
        max_tokens=500,
    )

    return response.choices[0].message.content


def get_typed_response(item_name):
    schema = {
        "type": "object",
        "properties": {
            "item_name": {
                "type": "string",
                "description": "Provide a short name of the item, for example, 'plastic bottle'",
            },
            "statement": {
                "type": "string",
                "description": 'Provide the expected CO2 savings by recycling the item, as well as a comparision. An example of expected statement is: "Saves 20 kg CO2, equals 50 miles driving."',
            },
            "saved_CO2_kg": {
                "type": "number",
                "description": "The exact number of saved CO2 in kg. Make a best guess estimate.",
            },
            "comparision": {
                "type": "string",
                "description": "Example: 50 miles driving",
            },
        },
        "required": ["item_name", "statement", "saved_CO2_kg", "comparision"],
    }

    client = OpenAI(api_key=gpt_api_key)
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {
                "role": "system",
                "content": f"Print information about recycling the user provided item",
            },
            {
                "role": "user",
                "content": item_name,
            },
        ],
        functions=[{"name": "print", "parameters": schema}],
        function_call={"name": "print"},
        max_tokens=500,
    )

    print(response.choices[0].message.function_call.arguments)

    return json.loads(response.choices[0].message.function_call.arguments)


@app.route("/generate-response", methods=["POST"])
def generate_typed_response():
    data = request.get_json()

    item_name = get_item_name(data["image"])
    response = get_typed_response(item_name)

    return response


@app.route("/submit-recycled-item", methods=["POST"])
def submit_recycled_item():
    data = request.get_json()

    item_name = data["item_name"]
    saved_CO2_kg = data["saved_CO2_kg"]
    recycle_date = data["recycle_date"]

    print(f"Item name: {item_name}")
    print(f"Saved CO2: {saved_CO2_kg}")

    currentPoints = 0

    if saved_CO2_kg > 0:
        currentPoints = currentPoints + saved_CO2_kg
        recycle_data = {
            "item_name": item_name,
            "saved_CO2_kg": saved_CO2_kg,
            "recycle_date": recycle_date,
        }
        print(recycle_data)

    print(f"Current points: {currentPoints}")
