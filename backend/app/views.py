from app import app
from openai import OpenAI
import requests
from flask import request
import os

gpt_api_key = os.environ.get("OPENAI_API_KEY")


@app.route("/")
def index():
    return "This is an awesome Hack Junction project!"

def get_image_description(image):
    client = OpenAI(api_key=gpt_api_key)
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that helps people recycle. You are given an image. You must describe the item (item type, manufacturer, model, etc.). Output information you can find about the item in the image.",
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


def get_typed_response(item_description):
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
                "content": "Only output JSON in the following format: item, recyclability_score, how_to_recycle",
            },
            {
                "role": "user",
                "content": item_description,
            },
        ],
        # functions=[{"name": "get_typed_response", "parameters": schema}],
        # function_call={"name": "get_typed_response"},
        max_tokens=500,
    )
    return response.choices[0].message.content


@app.route("/generate-response", methods=["POST"])
def generate_typed_response():
    data = request.get_json()

    image_description = get_image_description(data["image"])
    print(image_description)

    response = get_typed_response(image_description)

    return response
