import { makeAutoObservable } from 'mobx';
import { languagesStore } from 'stores/language.store';

import { Repo } from 'components/repos/repos.types';

import { TransactionScript } from './transaction-script';

export class LanguagesTS implements TransactionScript {
    constructor() {
        makeAutoObservable(this);
    }

    public async run(repo: Repo) {
        await languagesStore.fetch({ repoName: repo.name, ownerName: repo.owner });
    }
}

export const languagesTS = new LanguagesTS();
