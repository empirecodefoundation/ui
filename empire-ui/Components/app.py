from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_model import AIModel

app = Flask(__name__)
CORS(app)
from flask import Flask, request, jsonify
from ai_model import AIModel

app = Flask(__name__)

# Initialize the AI model
model = AIModel()

@app.route('/generate-response', methods=['POST'])
def generate_response():
    data = request.get_json()
    query = data.get('query')
    if query:
        response = model.generate_response(query)
        return jsonify({'response': response})
    else:
        return jsonify({'error': 'Missing query'}), 400

if __name__ == "__main__":
    app.run(debug=True)
