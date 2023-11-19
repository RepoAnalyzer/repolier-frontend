import { makeAutoObservable, runInAction } from "mobx";

import { repoMapper, RequestSortBy } from "components/repos/repo.mapper";

import { Repo } from "./repos.types";

interface TransactionScript {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run: (...args: any[]) => void
}

export class SearchTS implements TransactionScript {
    _searchItems: Repo[] = [];
    _isFetching = false;
    _isInitialized = false;
    _error?: Error = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    public async run(searchTerm: string, requestSortBy: RequestSortBy) {
        if (!searchTerm) {
            runInAction(() => {
                this._searchItems = []
            })

            return;
        }

        try {
            runInAction(() => {
                this._isFetching = true;
            })

            const result = await repoMapper.read(searchTerm, requestSortBy)

            runInAction(() => {
                this._isFetching = false;
                this._isInitialized = true;
                this._searchItems = result;
            })

            return result;

        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this._error = error as Error;
                })
            }
        }
    }
}

export const searchTS = new SearchTS()
