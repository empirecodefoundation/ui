
from transformers import pipeline

class AIModel:
    def __init__(self):
        self.model = pipeline("text-generation", model="t5-small")

    def generate_response(self, query):
        response = self.model(query, max_length=100)
        return response[0]['generated_text']

# Example usage:
if __name__ == "__main__":
    model = AIModel()
    query = "Hello, how are you?"
    response = model.generate_response(query)
    print(response)
