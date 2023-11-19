import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';

import { reposStore } from 'components/repos/repos.store';
import { searchTS } from 'components/repos/search-ts';
import { RequestSortBy } from 'components/repos/repo.mapper';

import { Input, Overlay, SearchBarStyled, Select } from './search-bar.style';
import { SEARCH_DEBOUNCE_TIMEOUT, requestSortOptions, sortOptions } from './search-bar.constants';
import { SearchResults } from './search-results';

export const SearchBar = observer(() => {
    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        reposStore.searchTerm = e.target.value;
    }, []);

    const handleSort = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        reposStore.sortBy = event.target.value;
    }, []);

    const handleRequestSort = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        reposStore.requestSortBy = event.target.value as RequestSortBy;
    }, []);

    const search = useMemo(() => debounce(() =>
        searchTS.run(reposStore.searchTerm, reposStore.requestSortBy),
        SEARCH_DEBOUNCE_TIMEOUT
    ), []);

    useEffect(() => {
        void search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, reposStore.searchTerm, reposStore.requestSortBy])

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
