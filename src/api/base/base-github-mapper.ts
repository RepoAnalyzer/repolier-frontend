import { Octokit } from '@octokit/rest';

export class BaseGitHubMapper {
    private GITHUB_TOKEN?: string = undefined;
    protected octokit: Octokit;

    constructor() {
        this.GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

        // Octokit.js
        // https://github.com/octokit/core.js#readme
        this.octokit = new Octokit({
            auth: this.GITHUB_TOKEN,
        })
    }
}
