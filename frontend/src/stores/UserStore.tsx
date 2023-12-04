import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import {IUser} from "../models/Task";

class UserStore {
    users: IUser[] = [];

    constructor() {
        makeAutoObservable(this);
        this.fetchUsers();
    }

    async fetchUsers() {
        try {
            const response = await axios.get('http://127.0.0.1:5000/users');
            this.setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    setUsers(users: IUser[]) {
        this.users = users;
    }
}

const userStore = new UserStore();
export default userStore;
