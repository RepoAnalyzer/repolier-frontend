import { makeAutoObservable, runInAction } from "mobx";

import { RequestSortBy, searchRepos } from "components/search-bar/search-repos.util";

export type Repo = {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    open_issues: number;
    watchers: number;
    score: number;
    avatar: string;
    owner: string;
    created_at: string;
    updated_at: string;
    url: string;
};

export type SortBy = Omit<keyof Repo, 'description' | 'language' | 'avatar' | 'url'>

class ReposStore {
    _searchTerm = '';
    _userIsSearching = false;
    _isInitialized = false;
    _isFetching = false;
    _error?: Error = undefined;
    _requestSortBy: RequestSortBy = 'stars';
    _sortBy: SortBy = 'stars';
    _searchItems: Repo[] = [];

    itemsMap: Map<string, Repo> = new Map();

    comparingItems: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public get searchTerm() {
        return this._searchTerm;
    }

    public set searchTerm(searchTerm: string) {
        this._searchTerm = searchTerm;
    }

    public get userIsSearching() {
        return this._userIsSearching;
    }

    public set userIsSearching(isSearching: boolean) {
        this._userIsSearching = isSearching;
    }

    public get requestSortBy() {
        return this._requestSortBy;
    }

    public set requestSortBy(requestSortBy: RequestSortBy) {
        this._requestSortBy = requestSortBy;
    }

    public get sortBy() {
        return this._sortBy;
    }

    public set sortBy(sortBy: SortBy) {
        this._sortBy = sortBy;
    }

    public get searchItems() {
        return this._searchItems;
    }

    public set searchItems(repos: Repo[]) {
        this._searchItems = repos;
    }

    public get isInitialized() {
        return this._isInitialized;
    }

    public get isFetching() {
        return this._isFetching;
    }

    public get error() {
        return this._error;
    }

    public get nothingFound() {
        return this.isInitialized && this.searchItems.length < 1;
    }

    public async fetch() {
        if (!this.searchTerm) {
            runInAction(() => {
                this.searchItems = []
            })

            return;
        }

        try {
            runInAction(() => {
                this._isFetching = true;
            })

            const result = await searchRepos(this.searchTerm, this.requestSortBy)

            runInAction(() => {
                this._isFetching = false;
                this._isInitialized = true;
                this.searchItems = result;
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

    public get items() {
        return Array.from(this.itemsMap, ([, value]) => value);
    }

    public addToComparison(repo: Repo) {
        this.userIsSearching = false;
        this.itemsMap.set(repo.name, repo)
    }

    public removeFromComparison(repo: Repo) {
        this.itemsMap.delete(repo.name)
    }

    public setDetailedComparison(repoName: string, isChecked: boolean) {
        if (isChecked) {
            this.comparingItems.push(repoName)
        } else {
            this.comparingItems = this.comparingItems.splice(this.comparingItems.findIndex((name) => name === repoName), 1);
        }
    }
}

export const reposStore = new ReposStore();
