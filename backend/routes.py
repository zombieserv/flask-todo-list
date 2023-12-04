from flask import Blueprint

from controllers.auth_controller import check_auth, check_token, logout, get_users
from controllers.task_controller import get_tasks, add_task, change_task
from middleware import authentication

task_routes = Blueprint('task_routes', __name__)

task_routes.route('/auth', methods=['POST'])(check_auth)
task_routes.route('/auth/token', methods=['POST'])(check_token)
task_routes.route('/auth/logout', methods=['POST'])(logout)
task_routes.route('/users', methods=['GET'])(get_users)

task_routes.route('/tasks', methods=['GET'])(get_tasks)
task_routes.route('/tasks', methods=['POST'])(add_task)
task_routes.route('/tasks', methods=['PATCH'])(authentication(change_task))
