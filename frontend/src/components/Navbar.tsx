import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl"><Link to="/">ToDo list</Link></div>
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:underline">
              Главная
            </Link>
            <Link to="/auth" className="text-white hover:underline">
              Авторизация
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
