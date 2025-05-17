import { RepoPullRequest } from 'api/pull-requests.mapper.types';
import { pullRequestsTS } from 'scripts/pull-requests.script';
import { pullRequestsStore } from 'stores/pull-requests.store';
import { Store } from 'stores/store';

import { Repo } from 'components/repos/repos.types';
import { getRepoFullName } from 'utils/get-repo-full-name';

import { RepoService } from './repo-service';

export class PullRequestsRepoService extends Store<RepoPullRequest[]> implements RepoService {
    public add(repo: Repo) {
        pullRequestsTS
            .run(repo)
            .then(() => {
                this.setItem(getRepoFullName(repo), pullRequestsStore.items);
            })
            .catch(console.error);
    }

    public remove(repoFullName: string) {
        this.deleteItem(repoFullName);
    }
}

export const pullRequestsRepoService = new PullRequestsRepoService();
