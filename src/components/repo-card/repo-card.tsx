import React, { ChangeEvent } from 'react';
import { semanticPalette } from 'assets/palette/palette';
import styled from 'styled-components';

import { RepoLink } from 'components/repo-link';
import { Repo } from 'components/repos/repos.store'
import { CreatedAt, UpdatedAt } from 'components/stats/dates';
import { ForksCount } from 'components/stats/forks-count';
import { Language } from 'components/stats/language';
import { StarsCount } from 'components/stats/stars-count';
import { IssuesCount } from 'components/stats/issues-count';
import { ComparisonButton } from 'components/search-bar/search-result.style';

export type RepoCardProps = {
    repo: Repo;
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

export const Description = styled.article`
    ${BLOCK_BORDER}
    ${BLOCK_PADDING}
    margin-top: 24px;
    display: block;
    height: 150px;
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
    margin: 0;
`

const MAX_DESCRIPTION_SIZE = 320;

export const RepoCard = (props: RepoCardProps) => {
    const { repo } = props;

    return (
        <RepoCardStyled>
            <Header>
                <Img src={repo.avatar} />
                <RepoLink mt="8px" repo={repo} />
            </Header>
            <Description>
                {repo.description.length <= MAX_DESCRIPTION_SIZE ? repo.description : `${repo.description.slice(0, MAX_DESCRIPTION_SIZE)}...`}
            </Description>

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
                    <input type="checkbox" id={repo.name} name={repo.name} onChange={props.onRepoDetailedComparisonCheck} />
                    <label htmlFor={repo.name}>Compare</label>
                </div>
                <Score>
                    Score:
                    <H2>{repo.score * 100}</H2>
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
}

