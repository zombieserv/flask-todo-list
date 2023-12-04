import React from 'react';
import {observer} from 'mobx-react-lite';
import {ITask} from '../models/Task';
import authStore from '../stores/AuthStore';
import Checkbox from './UI/Checkbox';
import taskStore from '../stores/TaskStore';

interface TaskListItemProps {
    task: ITask;
}

const TaskListItem: React.FC<TaskListItemProps> = observer(({task}) => {
    const {isEditing, editedText} = taskStore.getEditingTask(task);

    const handleCheckboxChange = async () => {
        await taskStore.updateTaskStatus(task);
    };

    const handleEditClick = () => {
        taskStore.startEditing(task);
    };

    const handleEditSubmit = async () => {
        await taskStore.updateTaskText(task);
        taskStore.stopEditing(task);
    };

    return (
        <li className="bg-gray-100 p-4 rounded-md flex flex-col md:flex-row justify-between items-center">
            <div className="flex-1">
                {authStore.token ? (
                    isEditing ? (
                        <input
                            type="text"
                            value={editedText}
                            onChange={(e) => taskStore.setEditingText(e.target.value, task)}
                            className="mb-2 p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    ) : (
                        <span className="text-gray-800 font-bold">{task.text}</span>
                    )
                ) : (
                    <span className="text-gray-800 font-bold">{task.text}</span>
                )}
                <p className="text-gray-600">{`Пользователь: ${task.user}`}</p>
                <p className="text-gray-600">{`Почта: ${task.email}`}</p>
                <p className="text-gray-600">{`Дата: ${new Date(task.date).toLocaleString()}`}</p>
                { task.edited ? <span className="text-xs">Изменено администратором</span> : ""}
            </div>
            {authStore.token && (
                <div
                    className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleEditSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Сохранить
                            </button>
                            <button
                                onClick={() => taskStore.stopEditing(task)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                            >
                                Отмена
                            </button>
                        </>
                    ) : (
                        <>
                            <Checkbox label="Выполнено" checked={task.status} onChange={handleCheckboxChange}/>
                            <button
                                onClick={handleEditClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Редактировать
                            </button>
                        </>
                    )}
                </div>
            )}
            {!authStore.token && (
                <span
                    className={`text-sm font-bold ${
                        task.status ? 'text-green-500' : 'text-red-500'
                    }`}
                >
          {task.status ? '✅ Выполнено' : '❌ Не выполнено'}
        </span>
            )}
        </li>
    );
});

export default TaskListItem;
