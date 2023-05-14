import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';

import { Repo, reposStore, SortBy } from 'components/repos/repos.store';

import { Input, Overlay, SearchBarStyled, SearchResultsStyled, Shimmer } from './search-bar.style';
import { ITEMS_PER_PAGE } from './search-repos.util';
import { SearchResult } from './search-result';

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

const getDateDifference = (b: string, a: string) => Number(new Date(b)) - Number(new Date(a));

const SEARCH_DEBOUNCE_TIMEOUT = 500;

export const SearchResults = observer(() => {
    if (reposStore.error) {
        return <span>Whoops! {reposStore.error.message}</span>
    }

    if (reposStore.isFetching) {
        return (
            <SearchResultsStyled>
                {Array(ITEMS_PER_PAGE).fill(undefined).map((_item, key) => <Shimmer key={`shimmer - ${key} `} />)}
            </SearchResultsStyled>
        );
    }

    if (reposStore.nothingFound) {
        return <span>Nothing found... Try another request</span>
    }

    return (
        <SearchResultsStyled>
            {
                reposStore.searchItems.slice().sort(sortFunction(reposStore.sortBy)).map(repo => (
                    <SearchResult
                        key={repo.name}
                        repo={repo}
                        onAddToComparisonClick={(repo) => { reposStore.addToComparison(repo) }}
                    />)
                )
            }
        </SearchResultsStyled>
    )
})

export const SearchBar = observer(() => {
    const [searchTerm, setSearchTerm] = useState('');

    const search = useMemo(() => debounce((searchTerm: string) => reposStore.fetch(searchTerm), SEARCH_DEBOUNCE_TIMEOUT), []);

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;

        setSearchTerm(searchTerm)

        void search(searchTerm)
    }, [search]);

    const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
        reposStore.sortBy = event.target.value;
    }

    return (
        <>
            <OutsideClickHandler onOutsideClick={() => { reposStore.userIsSearching = false }}>
                <SearchBarStyled isSearching={reposStore.userIsSearching}>
                    <Input
                        onFocus={() => { reposStore.userIsSearching = true }}
                        type="text"
                        placeholder="Search..."
                        isSearching={reposStore.userIsSearching}
                        value={searchTerm}
                        onChange={onInputChange}
                    />
                    {reposStore.userIsSearching && (
                        <>
                            <div>
                                <span><b>Sort by </b></span>
                                <select value={reposStore.sortBy as string} onChange={handleSort}>
                                    {sortOptions.map(option => (
                                        <option
                                            key={option.value as string}
                                            value={option.value as string}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <SearchResults />
                        </>
                    )}
                </SearchBarStyled>
            </OutsideClickHandler>
            {reposStore.userIsSearching && <Overlay />}
        </>
    );
});
