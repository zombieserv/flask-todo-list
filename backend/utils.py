import hashlib
from models import User


def generate_access_token(username, password):
    token_data = f"{username}|{password}|tdlst"
    access_token = hashlib.md5(token_data.encode()).hexdigest()
    return access_token


def check_access_token(username, token):
    try:
        user = User.objects.get(login=username, is_logged=True)
        correct_token = generate_access_token(user.login, user.password)
        if correct_token == token:
            return True
        return False
    except User.DoesNotExist:
        return False
