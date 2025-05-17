import { action, makeObservable } from 'mobx';

import { GetRepoRelatedInfoRequestConfig } from './base/base-github.types';
import { BaseGitHubMapper } from './base/base-github-mapper';
import { GetRepoPullRequestsResponse, RepoPullRequestResponse } from './pull-requests.mapper.types';
import { RepoPullRequest } from './pull-requests.types';

export const ITEMS_PER_PAGE = 5;

export type GetRepoPullRequestsConfig = GetRepoRelatedInfoRequestConfig;

export class PullRequestMapper extends BaseGitHubMapper {
    constructor() {
        super()
        makeObservable(this, {
            read: action,
        });
    }

    async read({ ownerName, repoName }: GetRepoPullRequestsConfig): Promise<RepoPullRequest[]> {
        const response = await this.octokit.request('GET /repos/{owner}/{repo}/pulls', {
            owner: ownerName,
            repo: repoName,
            headers: {
                // Last version as of 2025-05-11.
                // https://docs.github.com/en/rest/about-the-rest-api/api-versions
                'X-GitHub-Api-Version': '2022-11-28'
            }
        }) as GetRepoPullRequestsResponse;

        // const data = await response.json() as ;

        console.log({ data })
        return data.data
        // return data.items.map((item: RepoPullRequestResponse) => ({

        // }));
    }
}

export const pullRequestMapper = new PullRequestMapper()
