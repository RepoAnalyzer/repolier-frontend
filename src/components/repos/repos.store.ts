import { searchRepos } from "components/search-bar/search-repos.util";
import { makeAutoObservable, runInAction } from "mobx";

export type Repo = {
    name: string;
    description: string;
    language: string;
    stars: number;
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
    _userIsSearching = false;
    _isInitialized = false;
    _isFetching = false;
    _error?: Error = undefined;
    _sortBy: SortBy = 'stars';
    _searchItems: Repo[] = [];

    items: Repo[] = []

    constructor() {
        makeAutoObservable(this);
    }

    public get userIsSearching() {
        return this._userIsSearching;
    }

    public set userIsSearching(isSearching: boolean) {
        this._userIsSearching = isSearching;
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

    public async fetch(searchTerm: string) {
        try {
            runInAction(() => {
                this._isFetching = true;
            })
            const result = await searchRepos(searchTerm, this.sortBy)
            runInAction(() => {
                this._isFetching = false;
                this._isInitialized = true;
                this.searchItems = result;
            })

        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this._error = error as Error;
                })
            }
        }
    }

    public addToComparison(repo: Repo) {
        this.userIsSearching = false;
        this.items.push(repo)
    }
}

export const reposStore = new ReposStore();
