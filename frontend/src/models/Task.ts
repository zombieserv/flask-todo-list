export interface ITask {
    id?: number,
    user: string,
    email: string,
    text: string,
    status: boolean,
    date: string,
    edited: boolean,
}

export interface IUser {
    id: number,
    login: string
}