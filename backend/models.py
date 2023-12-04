import os
from datetime import datetime

from mongoengine import connect, ReferenceField, BooleanField, signals
from mongoengine import DynamicDocument, StringField, DateTimeField

DB_HOST = "mongodb://{}:{}@mongodb:27017".format(
    os.getenv('MONGODB_INITDB_ROOT_USERNAME'),
    os.getenv('MONGODB_INITDB_ROOT_PASSWORD'))

connect('beejee', host=DB_HOST)


class User(DynamicDocument):
    login = StringField(required=True)
    password = StringField(required=True)
    is_admin = BooleanField(required=True)
    is_logged = BooleanField(default=False)

    @classmethod
    def check_auth(cls, username, password):
        try:
            user = cls.objects.get(login=username, password=password, is_admin=True)
            if user:
                user.is_logged = True
                user.save()
                return user
            return None
        except cls.DoesNotExist:
            return False


class Task(DynamicDocument):
    user = ReferenceField(User, required=True)
    email = StringField(required=True)
    text = StringField(required=True)
    status = BooleanField(default=False)
    edited = BooleanField(default=False)
    date = DateTimeField()


def set_date(sender, document, **kwargs):
    if not document.date:
        document.date = datetime.now()


signals.pre_save.connect(set_date, sender=Task)
