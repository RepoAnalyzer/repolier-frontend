import React, { ChangeEvent, useState } from 'react';
/* import RepoCard from './RepoCard'; */
export type RepoResponse = {
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    watchers_count: number;
    score: number;
    owner: { avatar_url: string; };
    created_at: string;
    updated_at: string;
    html_url: string;
}

export type SearchResponse = {
    items: Array<RepoResponse>
}

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

export type SearchResultProps = {
    repo: Repo;
}

export const SearchResult = (props: SearchResultProps) => {
    return <div>{JSON.stringify(props.repo)}</div>
}

export type SortBy = Omit<keyof Repo, 'description' | 'language' | 'avatar' | 'url'>

const sortOptions: { value: SortBy, label: string }[] = [
    { value: 'stars', label: 'Stars' },
    { value: 'watchers', label: 'Watchers Count' },
    { value: 'score', label: 'Score' },
    { value: 'name', label: 'Name' },
    { value: 'created_at', label: 'Created At' },
    { value: 'updated_at', label: 'Updated At' }
];

const sortFunction = (sortBy: SortBy) => (a: Repo, b: Repo): number => {
    switch (sortBy) {
        case 'name':
            return a.name.localeCompare(b.name);
        case 'stars':
            return b.stars - a.stars;
        case 'watchers':
            return b.watchers - a.watchers;
        case 'score':
            return b.score - a.score;
        case 'created_at':
            return getDateDifference(b.created_at, b.created_at);
        case 'updated_at':
            return getDateDifference(b.updated_at, b.updated_at);
        default:
            return 0
    }
}

export const searchRepos = async (searchTerm: string, sortBy: SortBy) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&sort=${sortBy as string}`);
    const data = await response.json() as SearchResponse;

    return data.items.map((item: RepoResponse) => ({
        name: item.name,
        description: item.description,
        language: item.language,
        stars: item.stargazers_count,
        watchers: item.watchers_count,
        score: item.score,
        avatar: item.owner.avatar_url,
        created_at: item.created_at,
        updated_at: item.updated_at,
        url: item.html_url
    }));
}

const getDateDifference = (b: string, a: string) => Number(new Date(b)) - Number(new Date(a));

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [repos, setRepos] = useState<Repo[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>('stars');

    const handleSearch = () => {
        searchRepos(searchTerm, sortBy).then(setRepos).catch(console.error)
    }

    const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    }

    return (
        <div className='search'>
            <h4>Search Here for Github!</h4>
            <div className="search-bar">
                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="sort">
                <span><b>Sort by: </b></span>
                <select value={sortBy as string} onChange={handleSort}>
                    {sortOptions.map(option => <option key={option.value as string} value={option.value as string}>{option.label}</option>)}
                </select>
            </div>
            <hr />
            <div className="repo-list">
                {repos.length ? 'None' :
                    repos.sort(sortFunction(sortBy)).map(repo => <SearchResult key={repo.name} repo={repo} />)}
            </div>
        </div >
    );
}
