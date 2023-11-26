import { makeAutoObservable } from "mobx";

export type Language = string;
export type Languages = Record<Language, number>;

export interface GetLanguagesRequestConfig {
    ownerName: string;
    repoName: string;
}

export class LanguagesMapper {
    GITHUB_TOKEN?: string = undefined;

    constructor() {
        this.GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

        makeAutoObservable(this);
    }

    public async read({ ownerName, repoName }: GetLanguagesRequestConfig): Promise<Languages> {

        const response = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/languages`, {
            headers: this.GITHUB_TOKEN ? { Authorization: `Bearer ${this.GITHUB_TOKEN}` } : undefined
        });

        const data = await response.json() as Languages;

        return data;
    }
}

export const languagesMapper = new LanguagesMapper();
