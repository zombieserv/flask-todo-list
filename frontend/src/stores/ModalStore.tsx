import {makeAutoObservable} from 'mobx';

class ModalStore {
    isOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    openModal() {
        this.isOpen = true;
    }

    closeModal() {
        this.isOpen = false;
    }
}

const modalStore = new ModalStore();
export default modalStore;
