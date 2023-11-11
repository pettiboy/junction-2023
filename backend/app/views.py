from app import app

# from openai import OpenAI
import requests
from flask import request
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
