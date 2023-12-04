import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import {ITask} from '../models/Task';
import authStore from "./AuthStore";
import {NOTIFICATION_TYPE, Store} from 'react-notifications-component';

class TaskStore {
    tasks: ITask[] = [];
    currentPage: number = 1;
    totalTasks: number = 0;
    sortOrder: string = '-date';
    newTask = {user: '', email: '', text: ''};
    editingTasks: Record<number, { isEditing: boolean; editedText: string }> = {};
    loadTasks = true;

    constructor() {
        makeAutoObservable(this);
        this.fetchTasks();
    }

    async fetchTasks() {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/tasks?order=${this.sortOrder}&page=${this.currentPage}`);
            this.totalTasks = response.data.total;
            this.tasks = response.data.tasks;
            this.loadTasks = false
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
            this.notification("При получении задач произошла ошибка", "danger", errorMessage)
        }
    }

    setCurrentPage(newPage: number) {
        this.currentPage = newPage;
    }

    setSortOrder(newSortOrder: string) {
        this.sortOrder = newSortOrder;
    }

    setTasks(tasks: ITask[]) {
        this.tasks = tasks;
    }

    async addTask() {
        try {
            await axios.post('http://127.0.0.1:5000/tasks', this.newTask);
            this.setNewTask({
                user: '',
                email: '',
                text: '',
            });
            this.fetchTasks();
            this.notification("Задача добавлена.", "success")
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
            this.notification("При создании задачи произошла ошибка", "danger", errorMessage)
        }
    }

    setNewTask(newTask: Partial<ITask>) {
        this.newTask = {...this.newTask, ...newTask};
    }

    startEditing(task: ITask) {
        const taskId = task.id as number;
        this.editingTasks[taskId] = {isEditing: true, editedText: this.tasks.find((t) => t.id === taskId)?.text || ''};
    }

    stopEditing(task: ITask) {
        const taskId = task.id as number;
        this.editingTasks[taskId] = {isEditing: false, editedText: ''};
    }

    getEditingTask(task: ITask) {
        const taskId = task.id as number;
        return this.editingTasks[taskId] || {isEditing: false, editedText: ''};
    }

    setEditingText(editedText: string, task: ITask) {
        const taskId = task.id as number;
        if (this.editingTasks[taskId]) {
            this.editingTasks[taskId].editedText = editedText;
        }
    }

    async updateTaskStatus(task: ITask) {
        try {
            await axios.patch(`http://127.0.0.1:5000/tasks`, {
                id: task.id, text: task.text,
                status: !task.status, login: authStore.username, token: authStore.token
            });
            this.fetchTasks();
            this.notification("Статус задачи обновлён.", "success")
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
            this.notification("При обновлении статуса произошла ошибка", "danger", errorMessage)
        }
    }

    async updateTaskText(task: ITask) {
        const taskId = task.id as number;
        try {
            await axios.patch(`http://127.0.0.1:5000/tasks`, {
                id: task.id, text: this.editingTasks[taskId].editedText,
                status: task.status, login: authStore.username, token: authStore.token
            });
            this.fetchTasks();
            this.notification("Текст задачи обновлён.", "success")

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
            this.notification("При обновлении текста произошла ошибка", "danger", errorMessage)
        }
    }

    notification(title: string, type: NOTIFICATION_TYPE, message?: string) {
        Store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }
}

const taskStore = new TaskStore();
export default taskStore;
