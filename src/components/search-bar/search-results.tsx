import React from 'react';
import { observer } from 'mobx-react-lite';

import { ITEMS_PER_PAGE } from 'components/repos/repo.mapper';
import { reposMediator } from 'components/repos/repos.mediator';
import { Repo, SortBy } from 'components/repos/repos.types';

import { SearchResultsStyled, Shimmer } from './search-bar.style';
import { SearchResult } from './search-result';

const sortFunction =
    (sortBy: SortBy) =>
        (a: Repo, b: Repo): number => {
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
        };

const getDateDifference = (b: string, a: string) => Number(new Date(b)) - Number(new Date(a));

export const SearchResults = observer(() => {
    if (reposMediator.error) {
        return <span>Whoops! {reposMediator.error.message}</span>;
    }

    if (reposMediator.isFetching) {
        return (
            <SearchResultsStyled>
                {Array(ITEMS_PER_PAGE)
                    .fill(undefined)
                    .map((_item, key) => (
                        <Shimmer key={`shimmer - ${key} `} />
                    ))}
            </SearchResultsStyled>
        );
    }

    if (reposMediator.nothingFound) {
        return <span>Nothing found... Try another request</span>;
    }

    return (
        <SearchResultsStyled>
            {reposMediator.searchItems
                .slice()
                .sort(sortFunction(reposMediator.sortBy))
                .map((repo) => (
                    <SearchResult
                        key={`${repo.owner}/${repo.name}`}
                        repo={repo}
                        onAddToComparisonClick={(repo) => {
                            reposMediator.addToComparison(repo);
                        }}
                    />
                ))}
        </SearchResultsStyled>
    );
});
