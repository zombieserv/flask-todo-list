from functools import wraps
from flask import request, jsonify
from utils import check_access_token


def authentication(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        required_fields = ['login', 'token']
        form_data = request.get_json()
        if not all(field in form_data for field in required_fields):
            return jsonify({"error": "Unauthorized"}), 401

        valid_token = check_access_token(form_data['login'], form_data['token'])
        if not valid_token:
            return jsonify({"error": "Unauthorized"}), 401
        return func(*args, **kwargs)

    return wrapper
