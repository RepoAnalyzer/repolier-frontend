import { get } from 'lodash';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

export abstract class Store<TItem> {
    public itemMap = new Map<string, TItem>();

    constructor() {
        makeObservable(this, {
            itemMap: observable,
            items: computed,
            itemKeys: computed,
            itemEntries: computed,
            setItem: action,
            setItemsByPairs: action,
            setItems: action,
            reset: action,
            deleteItem: action,
        });
    }

    public get items() {
        return [...this.itemMap.values()];
    }

    public get itemKeys() {
        return [...this.itemMap.keys()];
    }

    public get itemEntries() {
        return [...this.itemMap.entries()];
    }

    public get itemsLength() {
        return this.itemMap.size;
    }

    public hasItem(key?: string) {
        return key && this.itemMap.has(key);
    }

    public getItem(key?: string) {
        return key ? this.itemMap.get(key) : undefined;
    }

    private _setItem(key: string, value?: TItem) {
        if (value) {
            this.itemMap.set(key, value);
        } else {
            this.itemMap.delete(key);
        }
    }

    public setItem(key: string, value?: TItem) {
        runInAction(() => this._setItem(key, value));
    }

    public setItemsByPairs(pairs: Array<{ key: string; value?: TItem }>) {
        pairs.forEach((pair: { key: string; value?: TItem }) => {
            this._setItem(pair.key, pair.value);
        });
    }

    public setItems(items: Array<TItem>, key?: string) {
        const itemKey = key || 'id';

        runInAction(() => {
            items.forEach((item) => {
                this.itemMap.set(String(get(item, itemKey)), item);
            });
        });
    }

    // Если ключ не передавать, то по-умолчанию возьмет id. Если передать, то будет искать в объекте item такой ключ.
    // Если передать третий параметр isExternalKey, то искать ключ внутри объекта не будет, установит ключ как есть
    public setItemWithoutAction(item: TItem, key?: string | number, isExternalKey?: boolean) {
        const itemKey = String(isExternalKey ? key : get(item, key || 'id'));

        this.itemMap.set(itemKey, item);
    }

    // Логика работы такая же, как выше, только с экшеном
    public setItemWithAction(item: TItem, key?: string | number, isExternalKey?: boolean) {
        const itemKey = String(isExternalKey ? key : get(item, key || 'id'));

        runInAction(() => this.itemMap.set(itemKey, item));
    }

    public deleteItem(key: string) {
        runInAction(() => this.itemMap.delete(key));
    }

    public reset() {
        this.itemMap.clear();
    }
}
