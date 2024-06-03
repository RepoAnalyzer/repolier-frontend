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

