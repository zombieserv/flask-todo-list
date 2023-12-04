import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import SelectDropdown from "./UI/SelectDropdown";
import TaskListItem from "./TaskListItem";
import TaskPagination from "./TaskPagination";
import TaskCreateForm from "./TaskCreateForm";
import taskStore from '../stores/TaskStore';
import authStore from "../stores/AuthStore";

const TaskList: React.FC = observer(() => {
    useEffect(() => {
        taskStore.fetchTasks();
    }, [taskStore.sortOrder, taskStore.currentPage]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSort = event.target.value;
        taskStore.setSortOrder(selectedSort);
    };

    const handlePageChange = (newPage: number) => {
        taskStore.setCurrentPage(newPage);
    };

    const sortOptions = [
        {value: 'date', label: '🔼 Дата'},
        {value: '-date', label: '🔽 Дата'},
        {value: 'status', label: '🔼 Статус'},
        {value: '-status', label: '🔽 Статус'},
        {value: 'user', label: '🔼 Пользователь'},
        {value: '-user', label: '🔽 Пользователь'},
        {value: 'email', label: '🔼 Электронная почта'},
        {value: '-email', label: '🔽 Электронная почта'},
    ];

    return (
        <div>
            <TaskCreateForm/>

            {taskStore.loadTasks || authStore.loadToken ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <SelectDropdown
                        label="Сортировка"
                        options={sortOptions}
                        value={taskStore.sortOrder}
                        onChange={handleSortChange}
                    />
                    <ul className="space-y-4">
                        {taskStore.tasks.map((task) => (
                            <TaskListItem key={task.id} task={task}/>
                        ))}
                    </ul>
                    <TaskPagination
                        totalTasks={taskStore.totalTasks}
                        currentPage={taskStore.currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
});

export default TaskList;
