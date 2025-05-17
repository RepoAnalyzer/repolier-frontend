
import { pullRequestsMapper } from 'api/pull-requests.mapper';
import { GetRepoPullRequestsConfig } from 'api/pull-requests.mapper.types';
import { RepoPullRequest } from 'api/pull-requests.types';
import { StoreWithFetch } from 'stores/store-with-fetch';

export class PullRequestsStore extends StoreWithFetch<RepoPullRequest, GetRepoPullRequestsConfig> {
    async getItemsFromApi(config: GetRepoPullRequestsConfig) {
        return pullRequestsMapper.read(config);
    }

    processPayload(payload: RepoPullRequest[]) {
        this.setItems(payload);
    }
}

export const contributorsStore = new PullRequestsStore();

