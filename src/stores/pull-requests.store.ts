
import { StoreWithFetch } from 'stores/store-with-fetch';

import { GetRepoPullRequestsConfig } from 'components/pull-requests/pull-requests.mapper.types';
import { RepoPullRequest } from 'components/pull-requests/pull-requests.types';

export class PullRequestsStore extends StoreWithFetch<RepoPullRequest, GetRepoPullRequestsConfig> {
    async getItemsFromApi(config: GetRepoPullRequestsConfig) {
        return repoPullRequestsMapper.read(config);
    }

    processPayload(payload: RepoPullRequest[]) {
        this.setItems(payload);
    }
}

export const contributorsStore = new PullRequestsStore();

