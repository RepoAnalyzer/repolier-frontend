import { searchRepos } from "components/search-bar/search-repos.util";
import { makeAutoObservable, runInAction } from "mobx";

export type Repo = {
    name: string;
    description: string;
    language: string;
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
    _userIsSearching = false;
    _isInitialized = false;
    _isFetching = false;
    _error?: Error = undefined;
    _sortBy: SortBy = 'stars';
    _searchItems: Repo[] = [];

    // items: Repo[] = []
    items: Repo[] = [
        { "name": "tesseract", "description": "Tesseract Open Source OCR Engine (main repository)", "language": "C++", "stars": 50926, "watchers": 50926, "score": 1, "avatar": "https://avatars.githubusercontent.com/u/8401422?v=4", "owner": "tesseract-ocr", "created_at": "2014-08-12T18:04:59Z", "updated_at": "2023-05-14T13:25:30Z", "url": "https://github.com/tesseract-ocr/tesseract", forks: 4342, open_issues: 321 },
        { "name": "storybook", "description": "Storybook is a frontend workshop for building UI components and pages in isolation. Made for UI development, testing, and documentation. ", "language": "TypeScript", "stars": 78530, "watchers": 78530, "score": 1, "avatar": "https://avatars.githubusercontent.com/u/22632046?v=4", "owner": "storybookjs", "created_at": "2016-03-18T04:23:44Z", "updated_at": "2023-05-14T13:08:35Z", "url": "https://github.com/storybookjs/storybook", forks: 311, open_issues: 333 },
        { "name": "Next-js-Boilerplate", "description": "🚀🎉📚 Boilerplate and Starter for Next.js 13+, Tailwind CSS 3.3 and TypeScript ⚡️ Made with developer experience first: Next.js + TypeScript + ESLint + Prettier + Husky + Lint-Staged + Jest + Testing Library + Cypress + Storybook + Commitlint + VSCode + Netlify + PostCSS + Tailwind CSS", "language": "TypeScript", "stars": 3890, "watchers": 3890, "score": 1, "avatar": "https://avatars.githubusercontent.com/u/5209935?v=4", "owner": "ixartz", "created_at": "2020-07-22T19:47:35Z", "updated_at": "2023-05-14T11:53:10Z", "url": "https://github.com/ixartz/Next-js-Boilerplate", forks: 123, open_issues: 12 },
    ];

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
