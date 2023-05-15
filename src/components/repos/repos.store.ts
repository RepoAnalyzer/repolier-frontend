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
        this.itemsMap.set(
            'tesseract', { "name": "tesseract", "description": "Tesseract Open Source OCR Engine (main repository)", "language": "C++", "stars": 50926, "watchers": 50926, "score": 1, "avatar": "https://avatars.githubusercontent.com/u/8401422?v=4", "owner": "tesseract-ocr", "created_at": "2014-08-12T18:04:59Z", "updated_at": "2023-05-14T13:25:30Z", "url": "https://github.com/tesseract-ocr/tesseract", forks: 4342, open_issues: 321 });

        this.itemsMap.set(
            'storybook', { "name": "storybook", "description": "Storybook is a frontend workshop for building UI components and pages in isolation. Made for UI development, testing, and documentation. ", "language": "TypeScript", "stars": 78530, "watchers": 78530, "score": 1, "avatar": "https://avatars.githubusercontent.com/u/22632046?v=4", "owner": "storybookjs", "created_at": "2016-03-18T04:23:44Z", "updated_at": "2023-05-14T13:08:35Z", "url": "https://github.com/storybookjs/storybook", forks: 311, open_issues: 333 }
        );
        this.itemsMap.set(
            'Next-js-Boilerplate', { "name": "Next-js-Boilerplate", "description": "🚀🎉📚 Boilerplate and Starter for Next.js 13+, Tailwing asdf fdf sdf  asdjfk asdjfk fdf sdf a sdf asdf   asdf asdf  df sdf asdf  sdf df df  asdf  asdfTailwind CSS 3.3 and TypeScript ⚡️ Made with developer experience first: Next.js + TypeScript + ESLint + Prettier + Husky + Lint-Staged + Jest + Testing Library + Cypress + Storybook + Commitlint + VSCode + Netlify + PostCSS + Tailwind CSS", "language": "TypeScript", "stars": 3890, "watchers": 3890, "score": 1, "avatar": "https://avatars.githubusercontent.com/u/5209935?v=4", "owner": "ixartz", "created_at": "2020-07-22T19:47:35Z", "updated_at": "2023-05-14T11:53:10Z", "url": "https://github.com/ixartz/Next-js-Boilerplate", forks: 123, open_issues: 12 }
        );
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
