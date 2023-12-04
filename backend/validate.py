import re


def validate_email(email):
    # email
    return re.match(r'^[\w\.-]+@[\w\.-]+$', email) is not None
