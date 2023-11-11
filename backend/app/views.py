from app import app
# from openai import OpenAI
import requests
import base64
from flask import request, jsonify
# import sys

# from utils import encode_image



gpt_api_key="API_KEY"


@app.route('/')
def index():
    return 'This is an awesome Hack Junction project!'

@app.route('/generate-response', methods = ['POST'])
def generate_response():

    data = request.get_json()

    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {gpt_api_key}"
    }

    payload = {
    "model": "gpt-4-vision-preview",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What’s in this image?"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": f"data:image/jpeg;base64,{data['image']}"
            }
          }
        ]
      }
    ],
        "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    print(response.json())

    return response.json()

