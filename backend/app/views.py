from app import app
from openai import OpenAI
import requests
from flask import request
import json
import os

# import sys

# from utils import encode_image

# use environment variable called OPENAI_API_KEY
gpt_api_key = os.environ.get("OPENAI_API_KEY")


@app.route("/")
def index():
    return "This is an awesome Hack Junction project!"


@app.route("/generate-response", methods=["POST"])
def generate_response():
    data = request.get_json()

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {gpt_api_key}",
    }

    payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "What’s in this image?",  # todo prompt engineering to make it more technical
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{data['image']}"},
                    },
                ],
            }
        ],
        "max_tokens": 300,
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )

    print(response.json())

    return response.json()


@app.route("/generate-response-2", methods=["POST"])
def generate_typed_response():
    data = request.get_json()
    client = OpenAI(api_key=gpt_api_key)

    schema = {
        "type": "object",
        "properties": {
            "item": {"type": "string"},
            "recyclability_score": {"type": "string"},
            "how_to_recycle": {"type": "string"},
        },
    }

    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        # response_format={"type": "json_object"},
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Can you return only the JSON in the following format: item, recyclability_score, how_to_recycle? about the object in this image? Do not return any non-json text or numbering",
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{data['image']}"},
                    },
                ],
            }
        ],
        # functions=[{"name": "get_typed_response", "parameters": schema}],
        # function_call={"name": "get_typed_response"},
        max_tokens=300,
    )

    print(response.choices[0].message.content)

    return json.dumps(response.choices[0].message.content.replace("json", ""))
