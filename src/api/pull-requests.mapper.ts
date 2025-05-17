import { action, makeObservable } from 'mobx';

import { getRepoPullRequests } from 'components/pull-requests/__mocks__';

import { BaseGitHubMapper } from './base/base-github-mapper';
import { GetRepoPullRequestsConfig } from './pull-requests.mapper.types';
import { RepoPullRequest, TAuthorAssociation, TPullRequestsState } from './pull-requests.types';

export const ITEMS_PER_PAGE = 5;

const IS_MOCK = true;

export class PullRequestsMapper extends BaseGitHubMapper {
    constructor() {
        super()
        makeObservable(this, {
            read: action,
        });
    }

    async read({ ownerName, repoName }: GetRepoPullRequestsConfig): Promise<RepoPullRequest[]> {
        const response = await (IS_MOCK ? getRepoPullRequests() : this.octokit.request('GET /repos/{owner}/{repo}/pulls', {
            owner: ownerName,
            repo: repoName,
            headers: {
                // Last version as of 2025-05-11.
                // https://docs.github.com/en/rest/about-the-rest-api/api-versions
                'X-GitHub-Api-Version': '2022-11-28'
            }
        }))

        return response.data.map((item) => ({
            id: item.id,
            number: item.number,
            state: item.state as TPullRequestsState | null,
            title: item.title,
            body: item.body,
            draft: item.draft ?? false,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            closedAt: item.closed_at,
            mergedAt: item.merged_at,
            _links: item._links,
            authorAssociation: item.author_association as TAuthorAssociation,

        }));
    }
}

export const pullRequestsMapper = new PullRequestsMapper()
