from flask import Flask, render_template, request
import openai
import base64
import os

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
    file = request.files["file"]

    # Convert file to base64 for OpenAI Vision
    file_bytes = file.read()
    file_b64 = base64.b64encode(file_bytes).decode("utf-8")

    # Use GPT-4o mini with vision
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are an assistant that extracts structured information (Issue Category, Title, Description) from images or videos."
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Extract Issue Category, Title, and Description from this file."},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/png;base64,{file_b64}"}
                    }
                ]
            }
        ]
    )

    # Get response
    extracted_text = response.choices[0].message["content"]

    result = {
        "issue_category": "Auto-detected",
        "issue_title": "Extracted Title",
        "detailed_description": extracted_text
    }

    return render_template("index.html", result=result)


if __name__ == "__main__":
    app.run(debug=True)