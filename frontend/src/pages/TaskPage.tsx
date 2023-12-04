import React from 'react';
import TaskList from '../components/TaskList';
import Navbar from "../components/Navbar";

const TaskPage: React.FC = () => {
    return (
        <>
            <Navbar/>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Задачи</h1>
                <TaskList/>
            </div>
        </>
    );
};

export default TaskPage;
