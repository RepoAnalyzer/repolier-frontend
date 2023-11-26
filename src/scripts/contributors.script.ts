import { makeAutoObservable } from 'mobx';
import { contributorsStore } from 'stores/contributors.store';

import { Repo } from 'components/repos/repos.types';

import { TransactionScript } from './transaction-script';

export class ContributorsTS implements TransactionScript {
    constructor() {
        makeAutoObservable(this);
    }

    public async run(repo: Repo) {
        await contributorsStore.fetch({ repoName: repo.name, ownerName: repo.owner });
    }
}

export const contributorsTS = new ContributorsTS();
