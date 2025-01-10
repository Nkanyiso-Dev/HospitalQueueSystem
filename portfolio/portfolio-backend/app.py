from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Portfolio Backend is Running!"

@app.route("/contact", methods=["POST"])
def contact():
    data = request.json
    # Simulate saving the message (e.g., to a database)
    return jsonify({"message": f"Thank you, {data['name']}!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
