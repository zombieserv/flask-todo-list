from bson import ObjectId
from flask import request, jsonify
from models import Task, User
from validate import validate_email


def get_tasks():
    order_param = request.args.get('order', default='date')
    current_page = int(request.args.get('page', default=1))
    paginate_start_idx = (current_page - 1) * 3
    paginate_end_idx = paginate_start_idx + 3

    if order_param not in ('date', '-date', 'status', '-status', 'user', '-user', 'email', '-email'):
        return jsonify({"error": "Invalid order parameter"}), 400

    all_tasks = Task.objects.all()
    total_tasks_count = all_tasks.count()
    paginate_tasks = all_tasks.order_by(order_param)[paginate_start_idx:paginate_end_idx]
    tasks_list = [
        {
            "id": str(task['id']),
            "email": task['email'],
            "user": task["user"]["login"],
            "text": task['text'],
            "status": task['status'],
            "date": task['date'],
            "edited": task['edited'],
        } for task in paginate_tasks
    ]

    tasks_list = {
        "page": current_page,
        "total": total_tasks_count,
        "tasks": tasks_list
    }
    return jsonify(tasks_list)


def add_task():
    required_fields = ['user', 'email', 'text']
    form_data = request.get_json()

    if not all(field in form_data for field in required_fields):
        return jsonify({"error": f"Missing required fields: {', '.join(required_fields)}"}), 400

    if not validate_email(form_data['email']):
        return jsonify({"error": "Email is incorrect"}), 400

    user_id = form_data['user']
    if not ObjectId.is_valid(user_id):
        return jsonify({"error": "User id not valid"}), 400

    try:
        user = User.objects.get(id=form_data['user'])
    except User.DoesNotExist:
        return jsonify({"error": "User not found"}), 404

    email = form_data['email']
    text = form_data['text']
    task = Task(user=user, email=email, text=text)
    task.save()

    return jsonify({"message": "Task added successfully"}), 201


def change_task():
    required_fields = ['id', 'text', 'status']
    form_data = request.get_json()

    if not all(field in form_data for field in required_fields):
        return jsonify({"error": f"Missing required fields: {', '.join(required_fields)}"}), 400

    task_id = form_data['id']
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return jsonify({"error": "Task not found"}), 404

    if task.text != form_data['text']:
        task.edited = True
    task.text = form_data['text']
    task.status = form_data['status']
    task.save()

    return jsonify({"message": "Task updated successfully"}), 202
