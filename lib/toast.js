import Store from './store';

const store = new Store();
let id = 0;

function toast(item, onClose, onClick, onDismiss) {
    id += 1;
    store.add({ id, onClose, onClick, onDismiss, ...item });
}

function resetStoreForTests() {
    id = 0;
    store.clear();
}

export { toast, store, resetStoreForTests };
