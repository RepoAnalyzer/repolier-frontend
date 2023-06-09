import React, { ChangeEvent, useCallback, useMemo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { debounce } from 'lodash';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Repo, reposStore, SortBy } from 'components/repos/repos.store';

import { Input, Overlay, SearchBarStyled, SearchResultsStyled, Select, Shimmer } from './search-bar.style';
import { ITEMS_PER_PAGE, RequestSortBy } from './search-repos.util';
import { SearchResult } from './search-result';

const sortOptions: { value: SortBy, label: string }[] = [
    { value: 'stars', label: 'Stars' },
    { value: 'watchers', label: 'Watchers Count' },
    { value: 'score', label: 'Score' },
    { value: 'forks', label: 'Forks Count' },
    { value: 'open_issues', label: 'Open Issues Count' },
    { value: 'name', label: 'Name' },
    { value: 'created_at', label: 'Created At' },
    { value: 'updated_at', label: 'Updated At' }
];

const requestSortOptions: { value: RequestSortBy, label: string }[] = [
    { value: 'stars', label: 'Stars' },
    { value: 'forks', label: 'Forks Count' },
    { value: 'updated', label: 'Updated At' }
];
const sortFunction = (sortBy: SortBy) => (a: Repo, b: Repo): number => {
    switch (sortBy) {
        case 'name':
            return a.name.localeCompare(b.name);
        case 'created_at':
            return getDateDifference(b.created_at, a.created_at);
        case 'updated_at':
            return getDateDifference(b.updated_at, a.updated_at);
        default:
            return Number(b[sortBy as keyof Repo]) - Number(a[sortBy as keyof Repo]);
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
                        key={`${repo.owner}/${repo.name}`}
                        repo={repo}
                        onAddToComparisonClick={(repo) => { reposStore.addToComparison(repo) }}
                    />)
                )
            }
        </SearchResultsStyled>
    )
})

export const SearchBar = observer(() => {
    const search = useMemo(() => debounce(() => reposStore.fetch(), SEARCH_DEBOUNCE_TIMEOUT), []);

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        reposStore.searchTerm = e.target.value;

        void search()
    }, [search]);

    const handleRequestSort = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        runInAction(() => {
            reposStore.requestSortBy = event.target.value as RequestSortBy;

            void search()
        })
    }, [search]);

    const handleSort = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        reposStore.sortBy = event.target.value;
    }, []);

    return (
        <>
            <OutsideClickHandler onOutsideClick={() => { reposStore.userIsSearching = false }}>
                <SearchBarStyled isSearching={reposStore.userIsSearching}>
                    <Input
                        onFocus={() => { reposStore.userIsSearching = true }}
                        type="text"
                        placeholder="Search..."
                        isSearching={reposStore.userIsSearching}
                        value={reposStore.searchTerm}
                        onChange={onInputChange}
                    />
                    {reposStore.userIsSearching && (
                        <>
                            <Select>
                                <span><b>Sort by </b></span>
                                <select value={reposStore.requestSortBy as string} onChange={handleRequestSort}>
                                    {requestSortOptions.map(option => (
                                        <option
                                            key={option.value as string}
                                            value={option.value as string}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </Select>
                            <SearchResults />
                            {reposStore.searchTerm && reposStore.searchItems.length > 1 && (
                                <div>
                                    <span><b>Sort results by </b></span>
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
                            )}
                        </>
                    )}
                </SearchBarStyled>
            </OutsideClickHandler>
            {reposStore.userIsSearching && <Overlay />}
        </>
    );
});
