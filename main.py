# NOT USED

from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

url = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct"
token = "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"  # Replace with your Hugging Face token

def llm(query):
    parameters = {
        "max_new_tokens": 5000,
        "temperature": 0.01,
        "top_k": 50,
        "top_p": 0.95,
        "return_full_text": False
    }
    
    prompt = f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>You are a helpful and smart assistant. You accurately provide answer to the provided user query.<|eot_id|><|start_header_id|>user<|end_header_id|> Here is the query: ```{query}```.
        Provide precise and concise answer.<|eot_id|><|start_header_id|>assistant<|end_header_id|>"""
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        "inputs": prompt,
        "parameters": parameters
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response_text = response.json()[0]['generated_text'].strip()

    return response_text

@app.route('/query', methods=['POST'])
def predict():
    data = request.get_json()
    query_text = data.get('query', '')
    if query_text:
        result = llm(query_text)
        return jsonify({'response': result})
    return jsonify({'response': 'No query provided'}), 400

if __name__ == "__main__":
    app.run(debug=True)
