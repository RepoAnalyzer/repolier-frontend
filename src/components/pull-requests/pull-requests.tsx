import React, { memo } from 'react';
import { GiRadioactive } from 'react-icons/gi';
import { LiaScrollSolid } from "react-icons/lia";
import { PiGraphFill } from "react-icons/pi";
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { RepoPullRequest, TAuthorAssociation, TRepoPullRequestScore } from 'api/pull-requests.mapper.types';
import { semanticPalette } from 'assets/palette/palette';
import { styled } from 'styled-components';
import { Graph } from 'types/graph';

import { ContributorCard } from 'components/comparing-info/contributors-block/contributors-card';
import { Description } from 'components/description';
import { GHMarkdown } from 'components/ui-kit/markdown';

import { pullRequestsGraphs } from './__mocks__/pull-requests-graphs';
import { RepoPullRequestScore } from './pull-request-score';
import { PullRequestsNetworkGraph } from './pull-requests-network-graph';
import { useGetPullRequestScore } from './use-get-pull-request-score.hook';
import { Toxicity } from 'types/toxicity';
import { toxicity } from './__mocks__/toxicity';

export type PullRequestsProps = {
    pullRequests: RepoPullRequest[]
}

const BLOCK_PADDING = `padding: 8px 16px;`;
const BLOCK_BORDER = `border-bottom: 2px solid ${semanticPalette.emphasizing};`;
const TRANSITION_TIMEOUT = 400

export const AccordionItemStyled = styled(AccordionItem)`
    transition: border-color 0.25s ease-in-out;
    background-color: ${semanticPalette.primary};

    .szh-accordion__item {
        width: 100%;

        &-btn {
            border-radius: 0;
            width: 100%;
            background-color: transparent;
            border: none;

            &:hover {
              background-color: ${semanticPalette.hover};
            }
        }

        &-content {
            transition: height ${TRANSITION_TIMEOUT}ms cubic-bezier(0, 0, 0, 1);
        }
    }

    &.szh-accordion__item--expanded {
        .szh-accordion__item-btn {
            border-radius: 0;
            background-color: ${semanticPalette.activated};

        }
`

export const PullRequestBodyAccordionItem = styled(AccordionItemStyled)`
    .szh-accordion__item {
        &-btn {
            border-bottom: 2px solid ${semanticPalette.contrasting2};
        }
    }
`

export const AccordionHeader = styled.header`
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 1.2rem;
    gap: 4px;
`

export const PullRequestHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${BLOCK_PADDING}
`


export const PullRequestStyled = styled(AccordionItemStyled)`
    border-radius: 16px;
    border: 2px solid ${semanticPalette.emphasizing};

    &:hover {
        border-color: ${semanticPalette.contrasting2};
    }

    .szh-accordion__item {
        &-btn {
            border-radius: 16px;
            transition: border-radius ${TRANSITION_TIMEOUT}ms ease-in-out;
        }
    }

    &.szh-accordion__item--expanded >.szh-accordion__item-heading > .szh-accordion__item-btn {
        border-radius: 16px 16px 0 0;
        transition: border-radius 50ms ease-in-out;
    }
`

export const PullRequestsStyled = styled(Accordion)`
    margin-top: 24px;

    ${PullRequestStyled} {
        margin-bottom: 8px;
    }
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


export type PullRequestProps = {
    pullRequest: RepoPullRequest;
    score: TRepoPullRequestScore;
    graph?: Graph;
    toxicity?: Toxicity;
}

const PullRequest = memo((props: PullRequestProps) => {
    const { pullRequest, score, graph, toxicity } = props;

    return (
        <PullRequestStyled header={
            <PullRequestHeader>
                <div>
                    <span>{authorAssociationMap[pullRequest.authorAssociation]}</span>
                    {pullRequest.author && (<ContributorCard contributor={pullRequest.author} />)}
                </div>
                <H2>{pullRequest.title}</H2>
                <RepoPullRequestScore score={score} />
            </PullRequestHeader>
        }>
            <PullRequestBody>
                <Accordion allowMultiple transition transitionTimeout={TRANSITION_TIMEOUT}>
                    <PullRequestBodyAccordionItem header={<AccordionHeader> <LiaScrollSolid /> Содержание</AccordionHeader>} initialEntered>
                        <GHMarkdown>{pullRequest.body}</GHMarkdown>
                    </PullRequestBodyAccordionItem>
                    {graph && (
                        <PullRequestBodyAccordionItem header={<AccordionHeader><PiGraphFill /> Граф</AccordionHeader>}>
                            <PullRequestsNetworkGraph width={1100} height={340} graph={graph} />
                        </PullRequestBodyAccordionItem>
                    )}
                    <PullRequestBodyAccordionItem header={<AccordionHeader><GiRadioactive /> Анализ токсичности</AccordionHeader>}>
                        <GHMarkdown>{toxicity?.explanation}</GHMarkdown>
                    </PullRequestBodyAccordionItem>
                </Accordion>
            </PullRequestBody>
        </PullRequestStyled >
    );
})

export const PullRequests = (props: PullRequestsProps) => {
    const { pullRequests } = props;

    const getPullRequestScore = useGetPullRequestScore(pullRequests);

    return (
        <PullRequestsStyled allowMultiple transition transitionTimeout={TRANSITION_TIMEOUT}>
            {pullRequests.map((pullRequest, index) => (
                <PullRequest
                    key={pullRequest.id}
                    pullRequest={pullRequest}
                    score={getPullRequestScore(pullRequest, index)}
                    graph={pullRequestsGraphs[pullRequest.id]}
                    toxicity={toxicity[pullRequest.id]}
                />
            ))}
        </PullRequestsStyled>
    );
}

