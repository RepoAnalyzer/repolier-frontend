import { makeAutoObservable } from "mobx";

export type Repo = {
    name: string;
    description: string;
    language: string;
    stars: number;
    watchers: number;
    score: number;
    avatar: string;
    created_at: string;
    updated_at: string;
    url: string;
};

export type SortBy = Omit<keyof Repo, 'description' | 'language' | 'avatar' | 'url'>

class ReposStore {
    _isSearching = false;
    _sortBy: SortBy = 'stars';
    _searchItems: Repo[] = [];

    // itemsMap = new Map<string, Repo>;
    items: Repo[] = []

    constructor() {
        makeAutoObservable(this);
    }

    public get isSearching() {
        return this._isSearching;
    }

    public set isSearching(isSearching: boolean) {
        this._isSearching = isSearching;
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

    public addToComparison(repo: Repo) {
        this.isSearching = false;
        this.items.push(repo)
    }
}

export const reposStore = new ReposStore();
