import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { Store } from 'stores/store';

const INTERNAL_LIMIT = 250;

export const DEFAULT_LIMIT = Number(localStorage.getItem('storeFetchLimit') || INTERNAL_LIMIT);

export abstract class StoreWithFetch<TItem, TArgs> extends Store<TItem> {
    public isInitialized = false;
    public isFetching = false;
    public error?: Error = undefined;
    public total = 0;
    public offset = 0;

    constructor() {
        super();
        makeObservable(this, {
            isInitialized: observable,
            isFetching: observable,
            error: observable,
            offset: observable,
            total: observable,
            fetch: action,
            setOffset: action,
            nextOffset: action,
            prevOffset: action,
        });
    }

    abstract getItemsFromApi(args?: TArgs): Promise<unknown>;
    public getItemByIdFromApi?(args: TArgs): Promise<unknown>;

    abstract processPayload(payload: unknown, isAdditional?: boolean): void;

    public get noDataLoaded() {
        return !this.isInitialized || this.isFetching;
    }

    public async fetch(args?: TArgs, skipFetch?: boolean) {
        runInAction(() => {
            this.isFetching = !skipFetch;
            this.error = undefined;
        });

        return this.getItemsFromApi(args)
            .then((payload) => {
                runInAction(() => {
                    // TODO: payload is not typed good enough.
                    const total = (payload as { count: number }).count;
                    const isAdditional = this.offset > 0;

                    if (!isAdditional) this.reset();

                    this.isInitialized = true;

                    if (total) {
                        this.setTotal(total);
                    }

                    this.processPayload(payload, isAdditional);
                    this.isFetching = false;
                });
            })
            .catch((error) => {
                if (!(error instanceof Error)) {
                    throw error;
                }

                if (!axios.isCancel(error)) {
                    console.error(error);

                    runInAction(() => {
                        this.error = error;
                        this.isFetching = false;
                    });
                }
            });
    }

    public async fetchById(args: TArgs) {
        runInAction(() => {
            this.isFetching = true;
            this.error = undefined;
        });

        await this.getItemByIdFromApi?.(args)
            .then((payload) => {
                runInAction(() => {
                    this.isInitialized = true;

                    this.processPayload({ items: [payload] }, true);
                });
            })
            .catch((error) => {
                if (!(error instanceof Error)) {
                    throw error;
                }

                runInAction(() => {
                    this.error = error;
                });
            })
            .finally(() => {
                runInAction(() => {
                    this.isFetching = false;
                });
            });
    }

    protected setTotal(n: number) {
        runInAction(() => {
            this.total = n;
        });
    }

    public setOffset(n: number) {
        runInAction(() => {
            this.offset = n;
        });
    }

    public nextOffset(n?: number) {
        if (this.isAllLoaded) {
            return;
        }

        const num = n ?? DEFAULT_LIMIT;

        if (this.offset + num < this.total) {
            this.offset += num;
        }
    }

    public prevOffset(n?: number) {
        const num = n ?? DEFAULT_LIMIT;

        if (this.offset - num > 0) {
            this.offset -= num;
        }
    }

    public reset() {
        super.reset();
        this.setOffset(0);
        this.setTotal(0);

        this.isInitialized = false;
        this.isFetching = false;
        this.error = undefined;
    }

    public get isNotLoaded() {
        return !this.isInitialized && !this.isFetching;
    }

    public deleteItem(key: string, withChangeTotal?: boolean) {
        super.deleteItem(key);

        if (withChangeTotal) {
            this.setTotal(this.total - 1);
        }
    }

    public get isAllLoaded() {
        return this.itemsLength >= this.total;
    }
}
