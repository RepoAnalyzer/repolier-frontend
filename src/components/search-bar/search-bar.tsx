import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { searchTS } from 'scripts/search.script';

import { RequestSortBy } from 'components/repos/repo.mapper';
import { reposMediator } from 'components/repos/repos.mediator';

import { requestSortOptions, SEARCH_DEBOUNCE_TIMEOUT, sortOptions } from './search-bar.constants';
import { Input, Overlay, SearchBarStyled, Select } from './search-bar.style';
import { SearchResults } from './search-results';

export const SearchBar = observer(() => {
    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        reposMediator.searchTerm = e.target.value;
    }, []);

    const handleSort = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        reposMediator.sortBy = event.target.value;
    }, []);

    const handleRequestSort = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        reposMediator.requestSortBy = event.target.value as RequestSortBy;
    }, []);

    const search = useMemo(
        () => debounce(() => searchTS.run(reposMediator.searchTerm, reposMediator.requestSortBy), SEARCH_DEBOUNCE_TIMEOUT),
        [],
    );

    useEffect(() => {
        void search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, reposMediator.searchTerm, reposMediator.requestSortBy]);

    return (
        <>
            <OutsideClickHandler
                onOutsideClick={() => {
                    reposMediator.userIsSearching = false;
                }}
            >
                <SearchBarStyled isSearching={reposMediator.userIsSearching}>
                    <Input
                        onFocus={() => {
                            reposMediator.userIsSearching = true;
                        }}
                        type="text"
                        placeholder="Search..."
                        isSearching={reposMediator.userIsSearching}
                        value={reposMediator.searchTerm}
                        onChange={onInputChange}
                    />
                    {reposMediator.userIsSearching && (
                        <>
                            <Select>
                                <span>
                                    <b>Sort by </b>
                                </span>
                                <select value={reposMediator.requestSortBy as string} onChange={handleRequestSort}>
                                    {requestSortOptions.map((option) => (
                                        <option key={option.value as string} value={option.value as string}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </Select>
                            <SearchResults />
                            {reposMediator.searchTerm && reposMediator.searchItems.length > 1 && (
                                <div>
                                    <span>
                                        <b>Sort results by </b>
                                    </span>
                                    <select value={reposMediator.sortBy as string} onChange={handleSort}>
                                        {sortOptions.map((option) => (
                                            <option key={option.value as string} value={option.value as string}>
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
            {reposMediator.userIsSearching && <Overlay />}
        </>
    );
});
