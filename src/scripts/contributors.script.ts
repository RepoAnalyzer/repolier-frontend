import { Contributor, contributorsMapper, GetContributorsRequestConfig } from 'api/contributors.mapper';
import { makeAutoObservable } from 'mobx';
import { Store } from 'stores/store';
import { StoreWithFetch } from 'stores/store-with-fetch';

import { Repo } from 'components/repos/repos.types';
import { getRepoFullName } from 'utils/get-repo-full-name';

import { RepoService } from './repo-service';
import { TransactionScript } from './transaction-script';

export class ContributorsStore extends StoreWithFetch<Contributor, GetContributorsRequestConfig> {
    async getItemsFromApi(config: GetContributorsRequestConfig) {
        return contributorsMapper.read(config);
    }

    processPayload(payload: Contributor[]) {
        this.setItems(payload);
    }
}

export const contributorsStore = new ContributorsStore();

export class ContributorsTS implements TransactionScript {
    constructor() {
        makeAutoObservable(this);
    }

    public async run(repo: Repo) {
        await contributorsStore.fetch({ repoName: repo.name, ownerName: repo.owner });
    }
}

export const contributorsTS = new ContributorsTS();

export class ContributorsRepoService extends Store<Contributor[]> implements RepoService {
    public add(repo: Repo) {
        contributorsTS
            .run(repo)
            .then(() => {
                this.setItem(getRepoFullName(repo), contributorsStore.items);
            })
            .catch(console.error);
    }

    public remove(repoFullName: string) {
        this.deleteItem(repoFullName);
    }
}

export const contributorsRepoService = new ContributorsRepoService();
