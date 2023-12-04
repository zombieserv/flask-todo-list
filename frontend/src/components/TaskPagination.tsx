import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalTasks: number;
    onPageChange: (newPage: number) => void;
}

const TaskPagination: React.FC<PaginationProps> = ({currentPage, totalTasks, onPageChange}) => {
    const total_pages = Math.ceil(totalTasks / 3);
    return (
        <div className="flex justify-center items-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                ◀️ Назад
            </button>
            <span className="mx-2">
        Страница {currentPage} / {total_pages}
      </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === total_pages}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded ${currentPage === total_pages ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                Далее ▶️
            </button>
        </div>
    );
};

export default TaskPagination;
