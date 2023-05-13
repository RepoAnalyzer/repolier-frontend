import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { palette, semanticPalette } from 'assets/palette/palette';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';

import { Repo, reposStore, SortBy } from 'components/repos/repos.store';
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

export type SearchResultProps = {
    repo: Repo;
}

const ANIMATION = '0.2s ease-in-out';

export const SearchResultStyled = styled.div`
    transition: background-color ${ANIMATION};

    &:hover {
        background-color: ${semanticPalette.hover};
    }
`

export const AddToComparisonButton = styled.button`
    background-color: ${semanticPalette.contrasting};

    transition: opacity ${ANIMATION};
    opacity: 0;

    div:hover > & {
        opacity: 1;
    }
`

export const SearchResult = (props: SearchResultProps) => {
    return (
        <SearchResultStyled>
            <div>{JSON.stringify(props.repo)}</div>
            <AddToComparisonButton onClick={() => {
                reposStore.addToComparison(props.repo)
                reposStore.searchItems = []
            }}>Add to comparison</AddToComparisonButton>
        </SearchResultStyled>
    );
}

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

const ITEMS_PER_PAGE = 5;

export const searchRepos = async (searchTerm: string, sortBy: SortBy) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=${ITEMS_PER_PAGE}&sort=${sortBy as string}`);
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

const SEARCH_DEBOUNCE_TIMEOUT = 500;

export type InputProps = {
    isSearching: boolean;
}

const SearchBarStyled = styled.div<SearchBarStyledProps>`
    border-radius: 16px;
    padding: 6px 32px 4px;
    background-color: ${(props) => props.isSearching ? semanticPalette.primary : 'inherit'};
`

const Input = styled.input<InputProps>`
    width: 800px;
    height: 32px;
    padding: 2px 8px;
    font-size: 24px;
    line-height: 24px;
    border-radius: 8px;
    border: 1px solid ${(props) => !props.isSearching ? semanticPalette.vague : semanticPalette.contrasting2};
    background-color: ${(props) => !props.isSearching ? palette.black : semanticPalette.primary};
    color: ${(props) => !props.isSearching ? semanticPalette.primary : semanticPalette.informational.primary};
    outline: none;

    &:focus {
        border: 2px inset ${semanticPalette.contrasting2};
        width: 798px;
        height: 30px;
    }

    &::placeholder {
        color: ${(props) => !props.isSearching ? semanticPalette.informational.secondary : semanticPalette.informational.primary};
    }
`

type SearchBarStyledProps = {
    isSearching: boolean;
};

export const Shimmer = styled.div`
    background-color: red;
`

export const SearchResults = observer(() =>
    <div >
        {
            reposStore.searchItems.length < 1 ? Array(ITEMS_PER_PAGE).fill(undefined).map((_item, key) => <Shimmer key={`shimmer - ${key} `} />) :
                reposStore.searchItems.slice().sort(sortFunction(reposStore.sortBy)).map(repo => <SearchResult key={repo.name} repo={repo} />)
        }
    </div >
)

export const SearchBar = observer(() => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useCallback((searchTerm: string) => {
        searchRepos(searchTerm, reposStore.sortBy).then((repos) => {
            reposStore.searchItems = repos
        }).catch(console.error)
    }, []);

    const search = useMemo(() => debounce(handleSearch, SEARCH_DEBOUNCE_TIMEOUT), [handleSearch]);

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;

        setSearchTerm(searchTerm)

        search(searchTerm)
    }, [search]);

    const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
        reposStore.sortBy = event.target.value;
    }

    return (
        <OutsideClickHandler onOutsideClick={() => { reposStore.isSearching = false }}>
            < SearchBarStyled isSearching={reposStore.isSearching} >
                <Input
                    onFocus={() => { reposStore.isSearching = true }}
                    type="text"
                    placeholder="Search..."
                    isSearching={reposStore.isSearching}
                    value={searchTerm}
                    onChange={onInputChange}
                />
                <div>
                    <span><b>Sort by: </b></span>
                    <select value={reposStore.sortBy as string} onChange={handleSort}>
                        {sortOptions.map(option => <option key={option.value as string} value={option.value as string}>{option.label}</option>)}
                    </select>
                </div>
                <hr />
                {reposStore.isSearching && <SearchResults />}
            </SearchBarStyled >
        </OutsideClickHandler >
    );
});
