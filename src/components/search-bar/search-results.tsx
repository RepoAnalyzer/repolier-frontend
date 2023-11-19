import React from 'react';
import { observer } from 'mobx-react-lite';
import { Repo, SortBy } from 'components/repos/repos.types';
import { reposStore } from 'components/repos/repos.store';

import { ITEMS_PER_PAGE } from './search-repos.util';
import { SearchResultsStyled, Shimmer } from './search-bar.style';

import { SearchResult } from './search-result';

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
