import { makeAutoObservable, runInAction } from 'mobx';
import { TransactionScript } from 'scripts/transaction-script';

import { repoMapper } from 'components/repos/repo.mapper';
import { RequestSortBy } from 'components/repos/repo.mapper.types';
import { Repo } from 'components/repos/repos.types';

export class SearchTS implements TransactionScript {
    _searchItems: Repo[] = [];
    _isFetching = false;
    _isInitialized = false;
    _error?: Error = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public async run(searchTerm: string, requestSortBy: RequestSortBy) {
        if (!searchTerm) {
            runInAction(() => {
                this._searchItems = [];
            });

            return;
        }

        try {
            runInAction(() => {
                this._isFetching = true;
            });

            const result = await repoMapper.read(searchTerm, requestSortBy);

            runInAction(() => {
                this._isFetching = false;
                this._isInitialized = true;
                this._searchItems = result;
            });

            return result;
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this._error = error as Error;
                });
            }
        }
    }
}

export const searchTS = new SearchTS();
