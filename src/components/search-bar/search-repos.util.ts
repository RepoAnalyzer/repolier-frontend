import { Repo } from 'components/repos/repos.store';

export type RepoResponse = {
    name: string;
    description: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    watchers_count: number;
    score: number;
    owner: { avatar_url: string; login: string };
    created_at: string;
    updated_at: string;
    html_url: string;
}

export type RequestSortBy = 'stars' | 'forks' | 'updated'

export type SearchResponse = {
    items: Array<RepoResponse>
}

export const ITEMS_PER_PAGE = 5;

export const searchRepos = async (searchTerm: string, sortBy: RequestSortBy): Promise<Repo[]> => {
    if (!searchTerm) {
        return [];
    }

    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=${ITEMS_PER_PAGE}&sort=${sortBy as string}`, {
        headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : undefined
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

