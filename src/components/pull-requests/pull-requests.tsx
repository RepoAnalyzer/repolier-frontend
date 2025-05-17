import React from 'react';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { RepoPullRequest, TAuthorAssociation } from 'api/pull-requests.mapper.types';
import { semanticPalette } from 'assets/palette/palette';
import { styled } from 'styled-components';

import { ContributorCard } from 'components/comparing-info/contributors-block/contributors-card';
import { Description } from 'components/description';
import { ComparisonButton } from 'components/search-bar/search-result.style';
import { GHMarkdown } from 'components/ui-kit/markdown';

import { RepoPullRequestScore } from './pull-request-score';
import { useGetPullRequestScore } from './use-get-pull-request-score.hook';

export type PullRequestsProps = {
    pullRequests: RepoPullRequest[]
}

const BLOCK_PADDING = `padding: 8px 16px;`;
const BLOCK_BORDER = `border-bottom: 2px solid ${semanticPalette.emphasizing};`;
const TRANSITION_TIMEOUT = 400

export const PullRequestStyled = styled(AccordionItem)`
    border-radius: 16px;
    border: 2px solid ${semanticPalette.emphasizing};
    background-color: ${semanticPalette.primary};
    transition: border-color 0.25s ease-in-out;

    &:hover {
        border-color: ${semanticPalette.contrasting2};
    }

    &:hover ${ComparisonButton} {
        opacity: 1;
    }

    .szh-accordion__item {
        width: 100%;

        &-btn {
            border-radius: 16px;
            width: 100%;
            background-color: transparent;
            border: none;

            &:hover {
              background-color: ${semanticPalette.hover};
            }

            transition: border-radius ${TRANSITION_TIMEOUT}ms ease-in-out;
        }

        &-content {
            transition: height ${TRANSITION_TIMEOUT}ms cubic-bezier(0, 0, 0, 1);
        }
    }

    &.szh-accordion__item--expanded {
        .szh-accordion__item-btn {
            border-radius: 16px 16px 0 0;
            background-color: ${semanticPalette.activated};
            transition: border-radius 50ms ease-in-out;
        }
`

export const PullRequestsStyled = styled(Accordion)`
    margin-top: 24px;

    ${PullRequestStyled} {
        margin-bottom: 8px;
    }
`

export const PullRequestHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${BLOCK_PADDING}
`

export const PullRequestBody = styled.body`
    border-top: 2px solid ${semanticPalette.emphasizing};
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

export const H2 = styled.h2`
    flex-grow: 1;
    font-size: 1.5rem;
    text-align: left;
    margin: 0 0 0 16px;
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

    const getPullRequestScore = useGetPullRequestScore(pullRequests);

    return (
        <PullRequestsStyled allowMultiple transition transitionTimeout={TRANSITION_TIMEOUT}>{pullRequests.map((pullRequest, index) => (
            <PullRequestStyled key={pullRequest.id} header={
                <PullRequestHeader>
                    <div>
                        <span>{authorAssociationMap[pullRequest.authorAssociation]}</span>
                        {pullRequest.author && (<ContributorCard contributor={pullRequest.author} />)}
                    </div>
                    <H2>{pullRequest.title}</H2>
                    <RepoPullRequestScore score={getPullRequestScore(pullRequest, index)} />
                </PullRequestHeader>
            }>
                <PullRequestBody>
                    <GHMarkdown>{pullRequest.body}</GHMarkdown>
                </PullRequestBody>
            </PullRequestStyled>
        ))}
        </PullRequestsStyled>
    );
}

