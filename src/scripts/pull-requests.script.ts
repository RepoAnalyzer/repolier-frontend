import { makeAutoObservable } from 'mobx';
import { pullRequestsStore } from 'stores/pull-requests.store';

import { Repo } from 'components/repos/repos.types';

import { TransactionScript } from './transaction-script';

export class PullRequestsTS implements TransactionScript {
    constructor() {
        makeAutoObservable(this);
    }

    public async run(repo: Repo) {
        await pullRequestsStore.fetch({ repoName: repo.name, ownerName: repo.owner });
    }
}

export const pullRequestsTS = new PullRequestsTS();
