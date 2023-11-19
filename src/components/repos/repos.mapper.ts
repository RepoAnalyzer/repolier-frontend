import { makeAutoObservable, runInAction } from "mobx";

import { searchRepos, RequestSortBy } from "components/search-bar/search-repos.util";

import { Repo } from "./repos.types";

export class ReposMapper {
    _searchItems: Repo[] = [];
    _isFetching = false;
    _isInitialized = false;
    _error?: Error = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    public async read(searchTerm: string, requestSortBy: RequestSortBy) {
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

            const result = await searchRepos(searchTerm, requestSortBy)

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

export const reposMapper = new ReposMapper()
