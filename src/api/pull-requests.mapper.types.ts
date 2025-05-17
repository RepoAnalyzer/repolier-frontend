import { Endpoints } from "@octokit/types";

import { GetRepoRelatedInfoRequestConfig } from './base/base-github.types';

export type GetRepoPullRequestsResponse = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']
export type GetRepoPullRequestsConfig = GetRepoRelatedInfoRequestConfig;

