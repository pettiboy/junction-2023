from app import app
from openai import OpenAI
import requests
from flask import request
import os

gpt_api_key = os.environ.get("OPENAI_API_KEY")


@app.route("/")
def index():
    return "This is an awesome Hack Junction project!"


def get_item_name(image):
    client = OpenAI(api_key=gpt_api_key)
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "system",
                "content": "You are given an image of an item. Please return only the name of an item in one word.",
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
    # schema = {
    #     "type": "object",
    #     "properties": {
    #         "item": {"type": "string"},
    #         "recyclability_score": {"type": "string"},
    #         "how_to_recycle": {"type": "string"},
    #     },
    # }

    client = OpenAI(api_key=gpt_api_key)
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": f'Provide a concise environmental impact statement for recycling a {item_name}, including the numerical information (for example, saved CO2) and a relatable comparison. Statement should be as short as possible, maximum 3 words without "recycling {item_name}" part. The example of expected statement is: "Saves 20 kg CO2, equals 50 miles driving." .Also return only the exact number of saved CO2 in kg. Return both the statement and the number in JSON format. Also include the ${item_name} in the response with item_name as the key.',
            },
            {
                "role": "user",
                "content": item_name,
            },
        ],
        # functions=[{"name": "get_typed_response", "parameters": schema}],
        # function_call={"name": "get_typed_response"},
        max_tokens=500,
    )

    print(response.choices[0].message.content)

    return response.choices[0].message.content


@app.route("/generate-response", methods=["POST"])
def generate_typed_response():
    data = request.get_json()

    item_name = get_item_name(data["image"])
    print(item_name)

    response = get_typed_response(item_name)

    print(response)

    return response
