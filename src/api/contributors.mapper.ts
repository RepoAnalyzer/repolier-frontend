import { makeAutoObservable } from "mobx";

export type Contributor = {
    id: number;
    name: string;
    contributions: number;
    avatar: string;
}

export type ContributorResponse = {
    id: number;
    login: string;
    contributions: number;
    avatar_url: string;
}

export type GetContributorsResponse = ContributorResponse[] | undefined;

export interface GetContributorsRequestConfig {
    ownerName: string;
    repoName: string;
}


export class ContributorsMapper {
    GITHUB_TOKEN?: string = undefined;

    constructor() {
        this.GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

        makeAutoObservable(this);
    }

    async read({ ownerName, repoName }: GetContributorsRequestConfig): Promise<Contributor[]> {

        const response = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/contributors`, {
            headers: this.GITHUB_TOKEN ? { Authorization: `Bearer ${this.GITHUB_TOKEN}` } : undefined
        });

        const data = await response.json() as GetContributorsResponse;

        return !data ? [] : data.map((item: ContributorResponse) => ({
            ...item,
            name: item.login,
            avatar: item.avatar_url,
        }));
    }
}

export const contributorsMapper = new ContributorsMapper();
