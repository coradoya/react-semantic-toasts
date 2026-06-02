class Store {
    items = [];

    listeners = new Set();

    subscribe = onStoreChange => {
        this.listeners.add(onStoreChange);
        return () => {
            this.listeners.delete(onStoreChange);
        };
    };

    getSnapshot = () => this.items;

    getServerSnapshot = () => [];

    notify() {
        this.listeners.forEach(listener => listener());
    }

    add(item) {
        this.items = [...this.items, item];
        this.notify();
    }

    remove(item) {
        this.items = this.items.filter(storeItem => storeItem !== item);
        this.notify();
    }

    clear() {
        this.items = [];
        this.notify();
    }
}

export default Store;
