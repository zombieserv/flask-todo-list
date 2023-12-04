from flask import request, jsonify
from models import User
from utils import generate_access_token, check_access_token


def get_users():
    all_users = User.objects.all()
    user_list = [
        {
            "id": str(user['id']),
            "login": user['login'],
        } for user in all_users
    ]
    return jsonify(user_list)


def check_auth():
    required_fields = ['login', 'password']
    form_data = request.get_json()

    if not all(field in form_data for field in required_fields):
        return jsonify({"error": f"Missing required fields: {', '.join(required_fields)}"}), 400

    login, password = form_data['login'], form_data['password']

    if User.check_auth(login, password):
        token = generate_access_token(login, password)
        return jsonify({"message": "Successful login", "token": token}), 200

    return jsonify({"error": "Incorrect login or password"}), 401


def check_token():
    required_fields = ['login', 'token']
    form_data = request.get_json()

    if not all(field in form_data for field in required_fields):
        return jsonify({"error": f"Missing required fields: {', '.join(required_fields)}"}), 400

    login, token = form_data['login'], form_data['token']

    validate_token = check_access_token(login, token)
    return jsonify({"is_valid": validate_token}), 200


def logout():
    required_fields = ['login', 'token']
    form_data = request.get_json()

    if not all(field in form_data for field in required_fields):
        return jsonify({"error": f"Missing required fields: {', '.join(required_fields)}"}), 400

    login, token = form_data['login'], form_data['token']

    try:
        user = User.objects.get(login=login, is_logged=True)
        correct_token = generate_access_token(user.login, user.password)
        if correct_token == token:
            user.is_logged = False
            user.save()
            return jsonify({"logout": "success"}), 200
        return jsonify({"error": "Invalid token"}), 401
    except User.DoesNotExist:
        return jsonify({"error": "The user is not authorized or the login is incorrect"}), 200
