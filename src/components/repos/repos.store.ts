import { Contributor, getContributors } from "api/contributors";
import { getLanguages, Languages } from "api/languages";
import { makeAutoObservable, runInAction } from "mobx";

import { RequestSortBy, searchRepos } from "components/search-bar/search-repos.util";
import { getRepoFullName } from "utils/get-repo-full-name";

// import { REPOS } from './__mocks__';

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

const MOST_STARS = 366721;
// const MOST_FORKS = 242860;
const GOOD_FORKS = 24286;
const YEAR = 360 * 24 * 60 * 60 * 1000;
// const BAD_NUMBER_OF_OPEN_ISSUES = 200;

const getDateScore = (date: string, inPeriod: number) => Math.min((Date.now() - Number(new Date(date))), inPeriod) / inPeriod

const getScore = (repo: Repo) => {
    // console.log(repo.name)

    const scores = {
        stars: repo.stars / MOST_STARS,
        forks: Math.min(1, repo.forks / GOOD_FORKS),
        updated: 1 - getDateScore(repo.updated_at, YEAR),
        created: getDateScore(repo.created_at, 5 * YEAR),
        // openIssues: 1 - repo.open_issues / BAD_NUMBER_OF_OPEN_ISSUES,
    }

    // console.log({ scores })

    return Math.min(1, (scores.stars + scores.forks + scores.updated + scores.created * scores.updated) / 4);
}

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
    _languages: Map<string, Languages> = new Map();

    constructor() {
        // REPOS.forEach((repo) => {
        //     this.itemsMap.set(getRepoFullName(repo), repo);
        // })
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
        this.removeContributors(repoFullName);
        this.removeLanguages(repoFullName);
    }

    public removeFromDetailedComparison(repoFullName: string) {
        const repoIndex = this._comparingItems.findIndex((name) => name === repoFullName);

        this._comparingItems = [...this._comparingItems.slice(0, repoIndex), ...this._comparingItems.slice(repoIndex + 1)];
    }

    public setDetailedComparison(repoFullName: string, isChecked: boolean) {
        if (isChecked) {
            this._comparingItems = [...this._comparingItems, repoFullName];
            void this.getContributors(repoFullName);
            void this.getLanguages(repoFullName);
        } else {
            this.removeFromDetailedComparison(repoFullName);
            this.removeContributors(repoFullName);
            this.removeLanguages(repoFullName);
        }
    }


    public get contributors() {
        return Array.from(this._contributors.values());
    }

    public get contributorsMap() {
        return this._contributors;
    }

    public async getContributors(repoFullName: string) {
        const repo = this.itemsMap.get(repoFullName);

        if (!repo) {
            throw new TypeError(`Requested to get contributors for inexisting repo by name: ${repoFullName}`);
        }

        const contributors = await getContributors(repo.owner, repo.name);

        this._contributors.set(repoFullName, contributors);
    }

    public removeContributors(repoFullName: string) {
        this._contributors.delete(repoFullName);
    }

    public get languagesMap() {
        return this._languages;
    }

    public async getLanguages(repoFullName: string) {
        const repo = this.itemsMap.get(repoFullName);

        if (!repo) {
            throw new TypeError(`Requested to get languages for inexisting repo by name: ${repoFullName}`);
        }

        const languages = await getLanguages(repo.owner, repo.name);

        this._languages.set(repoFullName, languages)
    }

    public removeLanguages(repoFullName: string) {
        this._languages.delete(repoFullName);
    }

    public getRepoScore(repoFullName: string) {
        const repo = this.itemsMap.get(repoFullName);

        if (!repo) {
            throw new TypeError(`Requested to get a score for inexisting repo by name: ${repoFullName}`);
        }

        return getScore(repo);
    }
}

export const reposStore = new ReposStore();
