import { pullRequestsMapper } from 'api/pull-requests.mapper';
import { RepoPullRequest } from 'api/pull-requests.mapper.types';
import { GetRepoPullRequestsConfig } from 'api/pull-requests.types';
import { StoreWithFetch } from 'stores/store-with-fetch';

export class PullRequestsStore extends StoreWithFetch<RepoPullRequest, GetRepoPullRequestsConfig> {
    async getItemsFromApi(config: GetRepoPullRequestsConfig) {
        return pullRequestsMapper.read(config);
    }

    processPayload(payload: RepoPullRequest[]) {
        this.setItems(payload);
    }
}

export const pullRequestsStore = new PullRequestsStore();

