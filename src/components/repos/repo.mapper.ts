import { makeAutoObservable } from 'mobx';

import { Repo } from 'components/repos/repos.types';

import { RepoResponse, RequestSortBy, SearchResponse } from './repo.mapper.types';

export const ITEMS_PER_PAGE = 5;

export class RepoMapper {
    private GITHUB_TOKEN?: string = undefined;

    constructor() {
        this.GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

        makeAutoObservable(this);
    }

    async read(searchTerm: string, sortBy: RequestSortBy): Promise<Repo[]> {
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=${ITEMS_PER_PAGE}&sort=${sortBy as string}`, {
            headers: this.GITHUB_TOKEN ? { Authorization: `Bearer ${this.GITHUB_TOKEN}` } : undefined
        });

        const data = await response.json() as SearchResponse;

        return data.items.map((item: RepoResponse) => ({
            name: item.name,
            description: item.description,
            language: item.language,
            stars: item.stargazers_count,
            forks: item.forks_count,
            open_issues: item.open_issues_count,
            watchers: item.watchers_count,
            score: item.score,
            avatar: item.owner.avatar_url,
            owner: item.owner.login,
            created_at: item.created_at,
            updated_at: item.updated_at,
            url: item.html_url
        }));
    }
}

export const repoMapper = new RepoMapper()
