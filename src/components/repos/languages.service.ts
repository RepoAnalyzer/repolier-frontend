import { languagesTS } from 'scripts/languages.script';
import { languagesStore } from 'stores/language.store';
import { Store } from 'stores/store';

import { LanguagesMap } from 'components/repos/repos.mediator';
import { Repo } from 'components/repos/repos.types';
import { getRepoFullName } from 'utils/get-repo-full-name';

import { RepoService } from './repo-service';

export class LanguagesRepoService extends Store<LanguagesMap> implements RepoService {
    public add(repo: Repo) {
        languagesTS
            .run(repo)
            .then(() => {
                this.setItem(getRepoFullName(repo), new Map(languagesStore.itemMap));
            })
            .catch(console.error);
    }

    public remove(repoFullName: string) {
        this.deleteItem(repoFullName);
    }
}

export const languagesRepoService = new LanguagesRepoService();
