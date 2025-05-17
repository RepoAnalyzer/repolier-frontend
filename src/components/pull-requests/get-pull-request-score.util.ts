import { RepoPullRequest } from "api/pull-requests.mapper.types";

import { randomInRange } from "utils/random";

export const prepareScoreFunction = (pullRequests: RepoPullRequest[]) => {
    const MAX = 1.00
    const MIN = 0.00

    const len = pullRequests.length
    const delta = (MAX - MIN) / len

    return (pullRequest: RepoPullRequest, index: number) => (len - index) * delta - randomInRange(0, delta)
}
