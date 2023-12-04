import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import ModalForm from './UI/ModalForm';
import modalStore from '../stores/ModalStore';
import userStore from '../stores/UserStore';
import taskStore from "../stores/TaskStore";

const TaskCreateForm: React.FC = observer(() => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        taskStore.setNewTask({user: e.target.value});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        taskStore.setNewTask({[name]: value});
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        taskStore.setNewTask({[name]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await taskStore.addTask();
            modalStore.closeModal();

            setTimeout(() => {
                taskStore.setNewTask({
                    user: taskStore.newTask.user,
                    email: taskStore.newTask.email,
                    text: taskStore.newTask.text,
                });
            }, 100);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="mt-8">
            <button
                onClick={() => modalStore.openModal()}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-blue active:green mb-5"
            >
                ➕ Новая задача
            </button>
            <ModalForm isOpen={modalStore.isOpen} onRequestClose={() => modalStore.closeModal()}>
                <div className="w-80">
                    <h2 className="text-xl font-bold mb-4">Создание задачи</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                                Пользователь
                            </label>
                            <select
                                id="user"
                                name="user"
                                value={taskStore.newTask.user}
                                onChange={handleSelectChange}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            >
                                <option value="" disabled hidden>
                                    Выберите пользователя
                                </option>
                                {userStore.users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.login}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={taskStore.newTask.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                                Text:
                            </label>
                            <textarea
                                id="text"
                                name="text"
                                value={taskStore.newTask.text}
                                onChange={handleTextAreaChange}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-blue active:green"
                        >
                            Добавить задачу
                        </button>
                    </form>
                </div>
            </ModalForm>
        </div>
    );
});

export default TaskCreateForm;