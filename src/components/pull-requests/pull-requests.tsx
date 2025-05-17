import React, { ChangeEvent, memo } from 'react';
import { Link } from 'react-router';
import { RepoPullRequest, TAuthorAssociation } from 'api/pull-requests.mapper.types';
import { semanticPalette } from 'assets/palette/palette';
import styled from 'styled-components';

import { ContributorCard } from 'components/comparing-info/contributors-block/contributors-card';
import { Description } from 'components/description';
import { RepoLink } from 'components/repo-link';
import { ComparisonButton } from 'components/search-bar/search-result.style';
import { CreatedAt, UpdatedAt } from 'components/stats/dates';
import { Ol } from 'components/ui-kit/atomics';
import { GHMarkdown } from 'components/ui-kit/markdown';

export type PullRequestsProps = {
    pullRequests: RepoPullRequest[]
}

const BLOCK_PADDING = `padding: 8px 16px;`;
const BLOCK_BORDER = `border-bottom: 2px solid ${semanticPalette.emphasizing};`;

export const PullRequestStyled = styled.li`
    border-radius: 16px;
    border: 2px solid ${semanticPalette.emphasizing};
    background-color: ${semanticPalette.primary};
    transition: border-color 1s ease-in-out;

    &:hover {
        border-color: ${semanticPalette.contrasting2};
    }

    &:hover ${ComparisonButton} {
        opacity: 1;
    }
`

export const PullRequestsStyled = styled(Ol)`
    ${PullRequestStyled} {
        margin-bottom: 16px;
    }
`

export const PullRequestHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${BLOCK_PADDING}
`

export const PullRequestBody = styled.body`
    ${BLOCK_PADDING}
`


export const Dates = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
`

export const Stats = styled.section`
    box-sizing: border-box;
    height: 106px;
    ${BLOCK_BORDER}
    ${BLOCK_PADDING}
    display: flex;
    justify-content: space-between;
`

export const Footer = styled.footer`
    height: 32px;
    ${BLOCK_PADDING}
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Score = styled.span`
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const H2 = styled.h2`
    flex-grow: 1;
    margin: 0 0 0 12px;
`

export const DescriptionStyled = styled(Description)`
    ${BLOCK_BORDER}
    ${BLOCK_PADDING}
    margin-top: 24px;
    display: block;
    height: 150px;
`

const authorAssociationMap: Record<TAuthorAssociation, string | undefined> = {
    'OWNER': 'Owner',
    'CONTRIBUTOR': 'Contributor',
    'NONE': undefined,
}

export const PullRequests = (props: PullRequestsProps) => {
    const { pullRequests } = props;

    return (
        <PullRequestsStyled>{pullRequests.map((pullRequest) => (
            <PullRequestStyled key={pullRequest.id}>
                <PullRequestHeader>
                    <div>
                        <span>{authorAssociationMap[pullRequest.authorAssociation]}</span>
                        {pullRequest.author && (<ContributorCard contributor={pullRequest.author} />)}
                    </div>
                    <H2>{pullRequest.title}</H2>
                </PullRequestHeader>
                <PullRequestBody>
                    <GHMarkdown>{pullRequest.body}</GHMarkdown>
                </PullRequestBody>
            </PullRequestStyled>
        ))}
        </PullRequestsStyled>
    );
}

