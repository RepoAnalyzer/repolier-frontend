import { Contributor, contributorsMapper, GetContributorsRequestConfig } from 'api/contributors.mapper';
import { StoreWithFetch } from 'stores/store-with-fetch';

export class ContributorsStore extends StoreWithFetch<Contributor, GetContributorsRequestConfig> {
    async getItemsFromApi(config: GetContributorsRequestConfig) {
        return contributorsMapper.read(config);
    }

    processPayload(payload: Contributor[]) {
        this.setItems(payload);
    }
}

export const contributorsStore = new ContributorsStore();

