import requests
from env import *
from models import User, Task

users_url = "http://backend:5000/users"
users_response = requests.get(users_url)
users_count = len(users_response.json())

if users_count == 0:
    superuser = User(login="admin", password="123", is_admin=True)
    superuser.save()

    tasks = [
        {"text": "Заключить новый контракт", "status": True, "date": "2023-01-01T09:00:00.000Z"},
        {"text": "Подготовить презентацию", "status": False, "date": "2023-01-05T14:30:00.000Z"},
        {"text": "Подготовить доклад", "status": False, "date": "2023-01-02T10:15:00.000Z"},
        {"text": "Подготовить отчет по проекту", "status": True, "date": "2023-01-03T11:30:00.000Z"},
        {"text": "Организовать встречу", "status": False, "date": "2023-01-07T14:00:00.000Z"},
        {"text": "Подготовить протокол совещания", "status": False, "date": "2023-01-04T12:45:00.000Z"},
        {"text": "Оценить производственные мощности", "status": False, "date": "2023-01-09T15:30:00.000Z"},
        {"text": "Подготовить отчет по плану", "status": False, "date": "2023-01-11T09:30:00.000Z"},
        {"text": "Составить график работ", "status": False, "date": "2023-01-06T16:00:00.000Z"},
        {"text": "Обучение новых сотрудников", "status": False, "date": "2023-01-10T10:30:00.000Z"},
        {"text": "Провести аудит", "status": True, "date": "2023-01-13T11:00:00.000Z"},
        {"text": "Разработать стратегию продаж", "status": False, "date": "2023-01-14T14:15:00.000Z"},
        {"text": "Согласовать бюджет", "status": True, "date": "2023-01-16T09:45:00.000Z"},
        {"text": "Участвовать в совещании", "status": False, "date": "2023-01-18T13:30:00.000Z"},
        {"text": "Разработать новую стратегию атаки", "status": False, "date": "2023-01-17T11:15:00.000Z"},
        {"text": "Организовать мероприятие", "status": True, "date": "2023-01-20T14:30:00.000Z"},
        {"text": "Обучение новых менеджеров", "status": True, "date": "2023-01-22T09:30:00.000Z"},
        {"text": "Наладить производственные мощности", "status": False, "date": "2023-01-23T12:45:00.000Z"},
    ]
    for task in tasks:
        task = Task(user=superuser['id'], email="admin@admin.com", text=task['text'], status=task['status'])
        task.save()
    print(f"Test data has been added to the database: 1 user and {len(tasks)} tasks.")
else:
    print(f"There are already {users_count} users in the database. No new users & tasks added.")
