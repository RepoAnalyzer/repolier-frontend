import { useCallback, useMemo } from "react"
import { RepoPullRequest, TRepoPullRequestScore } from "api/pull-requests.mapper.types"

import { randomInRange } from "utils/random"

import { prepareScoreFunction } from "./get-pull-request-score.util"

export const useGetPullRequestScore = (pullRequests: RepoPullRequest[]) => {
    const getGeneralScore = useMemo(() => prepareScoreFunction(pullRequests), [pullRequests])

    return useCallback((pullRequest: RepoPullRequest, index: number): TRepoPullRequestScore => {
        return {
            general: getGeneralScore(pullRequest, index),
            author: randomInRange(0.5, 1),
            toxicity: randomInRange(0, 0.5),
            abandonRate: randomInRange(0, 0.25),
        }
    }, [getGeneralScore])
}
