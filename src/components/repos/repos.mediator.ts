import { makeAutoObservable } from 'mobx';
import { searchTS } from 'scripts/search.script';

import { RequestSortBy } from 'components/repos/repo.mapper';
import { getRepoFullName } from 'utils/get-repo-full-name';

import { contributorsRepoService } from './contributors.service';
import { getScore } from './getScore';
import { languagesRepoService } from './languages.service';
import { Repo, SortBy } from './repos.types';

export type LanguagesMap = Map<string, number>;

class ReposMediator {
    _searchTerm = '';
    _userIsSearching = false;
    _isInitialized = false;
    _isFetching = false;
    _error?: Error = undefined;
    _requestSortBy: RequestSortBy = 'stars';
    _sortBy: SortBy = 'stars';

    public itemsMap: Map<string, Repo> = new Map();

    _comparingItems: string[] = [];

    public services = {
        languages: languagesRepoService,
        contributors: contributorsRepoService,
    };

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
        return searchTS._searchItems;
    }

    public get isInitialized() {
        return searchTS._isInitialized;
    }

    public get isFetching() {
        return searchTS._isFetching;
    }

    public get error() {
        return searchTS._error;
    }

    public get nothingFound() {
        return this.isInitialized && this.searchItems.length < 1;
    }

    public get items() {
        return Array.from(this.itemsMap, ([, value]) => value);
    }

    public get comparingItems() {
        return this._comparingItems;
    }

    public addToComparison(repo: Repo) {
        this.userIsSearching = false;
        this.itemsMap.set(getRepoFullName(repo), repo);
    }

    public removeFromComparison(repo: Repo) {
        const repoFullName = getRepoFullName(repo);

        this.itemsMap.delete(repoFullName);

        this.removeFromDetailedComparison(repoFullName);
    }

    public removeFromDetailedComparison(repoFullName: string) {
        const repoIndex = this._comparingItems.findIndex((name) => name === repoFullName);

        if (repoIndex === -1) {
            throw new TypeError(`Requested to remove data for nonexisting repo by name: ${repoFullName}`);
        }

        this._comparingItems = [
            ...this._comparingItems.slice(0, repoIndex),
            ...this._comparingItems.slice(repoIndex + 1),
        ];

        Object.values(this.services).forEach((service) => service.remove(repoFullName));
    }

    public addToDetailedComparison(repoFullName: string) {
        const repo = this.itemsMap.get(repoFullName);

        if (!repo) {
            throw new TypeError(`Requested to get services data for nonexisting repo by name: ${repoFullName}`);
        }

        this._comparingItems = [...this._comparingItems, repoFullName];

        Object.values(this.services).forEach((service) => service.add(repo));
    }

    public setDetailedComparison(repoFullName: string, isChecked: boolean) {
        if (isChecked) {
            this.addToDetailedComparison(repoFullName);
        } else {
            this.removeFromDetailedComparison(repoFullName);
        }
    }

    public getRepoScore(repoFullName: string) {
        const repo = this.itemsMap.get(repoFullName);

        if (!repo) {
            throw new TypeError(`Requested to get a score for inexisting repo by name: ${repoFullName}`);
        }

        return getScore(repo);
    }
}

export const reposMediator = new ReposMediator();
