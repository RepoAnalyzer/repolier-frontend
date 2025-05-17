import { makeAutoObservable } from "mobx";

import { GetRepoRelatedInfoRequestConfig } from "./base/base-github.types";

/**
 * For entities that are returned alongside other responses with a simplified interface.
 */
export type ContributorSimplified = {
    id: number;
    name: string;
    avatar: string;
}

/**
 * For entities that are returned alongside other responses with a simplified interface.
 */
export type ContributorSimplifiedResponse = {
    id: number;
    login: string;
    avatar_url: string;
}

export type Contributor = ContributorSimplified & {
    contributions: number;
};
export type ContributorResponse = ContributorSimplifiedResponse & {
    contributions: number;
};

export type GetContributorsResponse = ContributorResponse[] | undefined;

export type GetContributorsRequestConfig = GetRepoRelatedInfoRequestConfig

export class ContributorsMapper {
    GITHUB_TOKEN?: string = undefined;

    constructor() {
        this.GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

        makeAutoObservable(this);
    }

    /**
     * For entities that are returned alongside other responses with a simplified interface.
     */
    public mapSimplifiedResponseItemToEntity(item: ContributorSimplifiedResponse): ContributorSimplified {
        return {
            ...item,
            name: item.login,
            avatar: item.avatar_url,
        }
    }

    public mapResponseItemToEntity(item: ContributorResponse): Contributor {
        return {
            ...item,
            name: item.login,
            avatar: item.avatar_url,
        }
    }

    async read({ ownerName, repoName }: GetContributorsRequestConfig) {

        const response = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/contributors`, {
            headers: this.GITHUB_TOKEN ? { Authorization: `Bearer ${this.GITHUB_TOKEN}` } : undefined
        });

        const data = await response.json() as GetContributorsResponse;

        return !data ? [] : data.map((item) => this.mapResponseItemToEntity(item));
    }
}

export const contributorsMapper = new ContributorsMapper();
