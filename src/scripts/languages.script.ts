import { GetLanguagesRequestConfig, Language, Languages, languagesMapper } from 'api/languages.mapper';
import { makeAutoObservable } from 'mobx';
import { Store } from 'stores/store';
import { StoreWithFetch } from 'stores/store-with-fetch';

import { Repo } from 'components/repos/repos.types';

import { RepoService } from './repo-service';
import { TransactionScript } from './transaction-script';
import { LanguagesMap } from 'components/repos/repos.store';
import { getRepoFullName } from 'utils/get-repo-full-name';

export class LanguagesStore extends StoreWithFetch<number, GetLanguagesRequestConfig> {
    async getItemsFromApi(config: GetLanguagesRequestConfig) {
        return languagesMapper.read(config);
    }

    processPayload(payload: Languages) {
        this.itemMap = new Map(Object.entries(payload));
        console.log(this.itemMap)
    }
}

export const languagesStore = new LanguagesStore();

export class LanguagesTS implements TransactionScript {
    constructor() {
        makeAutoObservable(this);
    }

    public async run(repo: Repo) {
        await languagesStore.fetch({ repoName: repo.name, ownerName: repo.owner });
    }
}

export const languagesTS = new LanguagesTS();

export class LanguagesRepoService extends Store<LanguagesMap> implements RepoService {
    public add(repo: Repo) {
        languagesTS.run(repo).then(() => {
            this.setItem(getRepoFullName(repo), languagesStore.itemMap)
        }).catch(console.error)
    }

    public remove(repoFullName: string) {
        this.deleteItem(repoFullName)
    }
}

export const languagesRepoService = new LanguagesRepoService();
