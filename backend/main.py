from mongoengine import ValidationError

from routes import task_routes
from env import *
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

app.register_blueprint(task_routes)


@app.errorhandler(ValidationError)
def handle_validation_error(e):
    response = jsonify({"error": str(e)})
    response.status_code = 400
    return response


if __name__ == '__main__':
    app.run(host=os.getenv("APP_URL"), port=os.getenv("APP_PORT"), debug=True)
