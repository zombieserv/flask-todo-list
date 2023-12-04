import {makeAutoObservable} from 'mobx';
import axios from 'axios';

class AuthStore {
    username: string = '';
    password: string = '';
    token: string | null = null;
    error: string | null = null;
    loadToken = true;

    constructor() {
        makeAutoObservable(this);
        this.checkToken();
    }

    async login() {
        try {
            this.setError(null);
            const response = await axios.post('http://127.0.0.1:5000/auth', {
                login: this.username,
                password: this.password
            });
            const {token} = response.data;

            this.setToken(token);

            document.cookie = `tdlst_login=${this.username}; max-age=900; path=/`;
            document.cookie = `tdlst_token=${token}; max-age=900; path=/`;

            return true;
        } catch (error) {
            console.error('Error logging in:', error);
            this.setError('Incorrect login or password.');
            return false;
        }
    }

    async checkToken() {
        const usernameCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tdlst_login\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const tokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tdlst_token\s*=\s*([^;]*).*$)|^.*$/, "$1");

        if (usernameCookie && tokenCookie) {
            const isValidToken = await this.validateToken(usernameCookie, tokenCookie);

            if (isValidToken) {
                this.setUsername(usernameCookie);
                this.setToken(tokenCookie);
            } else {
                this.logout();
            }
        }
        this.loadToken = false;
    }

    async validateToken(login: string, token: string) {
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/token', {login, token});
            return response.data.is_valid;
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
    }

    setToken(token: string | null) {
        this.token = token;
    }

    setUsername(username: string) {
        this.username = username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setError(error: string | null) {
        this.error = error;
    }

    async logout() {
        await axios.post('http://127.0.0.1:5000/auth/logout', {login: this.username, token: this.token});
        this.setUsername('');
        this.setPassword('');
        this.setToken('');
        document.cookie = 'tdlst_login=; max-age=0; path=/';
        document.cookie = 'tdlst_token=; max-age=0; path=/';
        return true;
    }
}

const authStore = new AuthStore();
export default authStore;
