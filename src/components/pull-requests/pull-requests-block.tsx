import React from 'react'
import { RepoPullRequest } from 'api/pull-requests.mapper.types'

import { PullRequests } from './pull-requests'
import { PullRequestsNetworkGraph } from './pull-requests-network-graph';
import { miserables } from './__mocks__';

export type PullRequestsBlockProps = {
    pullRequests?: RepoPullRequest[];
}

export const PullRequestsBlock = (props: PullRequestsBlockProps) => {
    const { pullRequests } = props;

    if (!pullRequests?.length) {
        return <span>No open pull requests found for this repo</span>
    }

    return (
        <>
            <PullRequestsNetworkGraph width={720} height={540} graph={miserables}  />
            <PullRequests pullRequests={pullRequests} />
        </>
    )
}
