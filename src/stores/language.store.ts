import { GetLanguagesRequestConfig, Languages, languagesMapper } from 'api/languages.mapper';
import { StoreWithFetch } from 'stores/store-with-fetch';

export class LanguagesStore extends StoreWithFetch<number, GetLanguagesRequestConfig> {
    async getItemsFromApi(config: GetLanguagesRequestConfig) {
        return languagesMapper.read(config);
    }

    processPayload(payload: Languages) {
        this.itemMap = new Map(Object.entries(payload));
    }
}

export const languagesStore = new LanguagesStore();
