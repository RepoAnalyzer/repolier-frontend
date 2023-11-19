import { SortBy } from 'components/repos/repos.types';

import { RequestSortBy } from 'components/repos/repo.mapper';

export const sortOptions: { value: SortBy, label: string }[] = [
    { value: 'stars', label: 'Stars' },
    { value: 'watchers', label: 'Watchers Count' },
    { value: 'score', label: 'Score' },
    { value: 'forks', label: 'Forks Count' },
    { value: 'open_issues', label: 'Open Issues Count' },
    { value: 'name', label: 'Name' },
    { value: 'created_at', label: 'Created At' },
    { value: 'updated_at', label: 'Updated At' }
];

export const requestSortOptions: { value: RequestSortBy, label: string }[] = [
    { value: 'stars', label: 'Stars' },
    { value: 'forks', label: 'Forks Count' },
    { value: 'updated', label: 'Updated At' }
];

export const SEARCH_DEBOUNCE_TIMEOUT = 500;
