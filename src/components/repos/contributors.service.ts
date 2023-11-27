import { Contributor } from 'api/contributors.mapper';
import { contributorsTS } from 'scripts/contributors.script';
import { contributorsStore } from 'stores/contributors.store';
import { Store } from 'stores/store';

import { Repo } from 'components/repos/repos.types';
import { getRepoFullName } from 'utils/get-repo-full-name';

import { RepoService } from './repo-service';

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
