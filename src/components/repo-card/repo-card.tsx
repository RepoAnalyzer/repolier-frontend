import React, { ChangeEvent, memo } from 'react';
import { semanticPalette } from 'assets/palette/palette';
import styled from 'styled-components';

import { Description } from 'components/description';
import { RepoLink } from 'components/repo-link';
import { Repo } from 'components/repos/repos.types'
import { ComparisonButton } from 'components/search-bar/search-result.style';
import { CreatedAt, UpdatedAt } from 'components/stats/dates';
import { ForksCount } from 'components/stats/forks-count';
import { IssuesCount } from 'components/stats/issues-count';
import { Language } from 'components/stats/language';
import { StarsCount } from 'components/stats/stars-count';
import { getRepoFullName } from 'utils/get-repo-full-name';

export type RepoCardProps = {
    repo: Repo;
    score: number;
    onRemoveFromComparison: (repo: Repo) => void;
    onRepoDetailedComparisonCheck: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BLOCK_PADDING = `padding: 8px 16px;`;
const BLOCK_BORDER = `border-bottom: 2px solid ${semanticPalette.emphasizing};`;

export const RepoCardStyled = styled.section`
    border-radius: 16px;
    border: 2px solid ${semanticPalette.emphasizing};
    width: 400px;
    background-color: ${semanticPalette.primary};
    transition: border-color 1s ease-in-out;

    &:hover {
        border-color: ${semanticPalette.contrasting2};
    }

    &:hover ${ComparisonButton} {
        opacity: 1;
    }
`

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${BLOCK_PADDING}
`

export const Img = styled.img`
    border-radius: 16px;
    border: 1px solid ${semanticPalette.emphasizing};
    display: block;
    width: 128px;
    height: 128px;
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
    margin: 0 0 0 12px;
`

export const DescriptionStyled = styled(Description)`
    ${BLOCK_BORDER}
    ${BLOCK_PADDING}
    margin-top: 24px;
    display: block;
    height: 150px;
`

export const RepoCard = memo((props: RepoCardProps) => {
    const { repo } = props;

    return (
        <RepoCardStyled>
            <Header>
                <Img src={repo.avatar} />
                <RepoLink mt="8px" repo={repo} />
            </Header>
            <DescriptionStyled description={repo.description || ''} />

            <Stats>
                <div>
                    <StarsCount starsCount={repo.stars} />
                    {repo.language && <Language language={repo.language} />}
                    <ForksCount forksCount={repo.forks} />
                    <IssuesCount issuesCount={repo.open_issues} />
                </div>
                <Dates>
                    <CreatedAt created_at={repo.created_at} />
                    <UpdatedAt updated_at={repo.updated_at} />
                </Dates>
            </Stats>
            <Footer>
                <div>
                    <input type="checkbox" id={getRepoFullName(repo)} name={getRepoFullName(repo)} onChange={props.onRepoDetailedComparisonCheck} />
                    <label htmlFor={getRepoFullName(repo)}>Compare</label>
                </div>
                <Score>
                    Score:
                    <H2>{(props.score * 100).toFixed(2)}</H2>
                </Score>
                <ComparisonButton
                    preset="remove"
                    onClick={() => props.onRemoveFromComparison(repo)}
                >
                    Remove
                </ComparisonButton>
            </Footer>
        </RepoCardStyled>
    );
})

