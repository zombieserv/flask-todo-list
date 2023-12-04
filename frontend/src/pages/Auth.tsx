import React from 'react';
import {observer} from 'mobx-react-lite';
import Navbar from '../components/Navbar';
import authStore from '../stores/AuthStore';
import {useNavigate} from 'react-router-dom'

const AuthPage: React.FC = observer(() => {
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await authStore.login();

        if (success) {
            navigate('/auth');
        }
    };
    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        const logout = await authStore.logout();
        if (logout) {
            navigate('/auth');
        }
    };

    return (
        <>
            <Navbar/>
            <div className="max-w-2xl mx-auto p-4">
                <div className="bg-white p-8 rounded shadow-md">
                    {authStore.loadToken ? (
                        <p>Загрузка...</p>
                    ) : (
                        <>
                            {authStore.token ? (
                                <>
                                    <h1 className="text-2xl font-bold mb-4">Привет, {authStore.username}</h1>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                    >
                                        Выйти
                                    </button>
                                </>
                            ) : (
                                <form onSubmit={handleLogin}>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                                            Логин:
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={authStore.username}
                                            onChange={(e) => authStore.setUsername(e.target.value)}
                                            required
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                            Пароль:
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={authStore.password}
                                            onChange={(e) => authStore.setPassword(e.target.value)}
                                            required
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                    >
                                        Войти
                                    </button>
                                    {authStore.error && (
                                        <div className="pt-5 text-red-500">{authStore.error}</div>
                                    )}
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
});

export default AuthPage;
