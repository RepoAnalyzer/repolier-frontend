import { Contributor, getContributors } from "api/contributors";
import { makeAutoObservable, runInAction } from "mobx";

import { RequestSortBy, searchRepos } from "components/search-bar/search-repos.util";

import { REPOS } from './__mocks__';
import { getRepoFullName } from "utils/get-repo-full-name";

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

    _comparingItems: string[] = [];
    _contributors: Map<string, Contributor[]> = new Map();

    constructor() {
        REPOS.forEach((repo) => {
            this.itemsMap.set(getRepoFullName(repo), repo);
        })
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

    public get comparingItems() {
        return this._comparingItems;
    }

    public addToComparison(repo: Repo) {
        this.userIsSearching = false;
        this.itemsMap.set(getRepoFullName(repo), repo)
    }

    public removeFromComparison(repo: Repo) {
        const repoFullName = getRepoFullName(repo);

        this.itemsMap.delete(repoFullName);

        this.removeFromDetailedComparison(repoFullName);
    }

    public removeFromDetailedComparison(repoFullName: string) {
        const repoIndex = this._comparingItems.findIndex((name) => name === repoFullName);

        this._comparingItems = [...this._comparingItems.slice(0, repoIndex), ...this._comparingItems.slice(repoIndex + 1)];
    }

    public setDetailedComparison(repoFullName: string, isChecked: boolean) {
        if (isChecked) {
            this._comparingItems.push(repoFullName);
        } else {
            this.removeFromDetailedComparison(repoFullName);
        }
    }

    public getComparingItemsInfo() {
        return this._comparingItems.map((repoFullName) => {
            const repo = this.itemsMap.get(repoFullName);

            if (!repo) {
                throw new TypeError(`Requested to compare inexisting repo by name: ${repoFullName}`);
            }

            return getContributors(repo.owner, repo.name).then((response) => {
                this._contributors.set(repoFullName, response)
            }).catch(console.error);
        })
    }
}

export const reposStore = new ReposStore();
