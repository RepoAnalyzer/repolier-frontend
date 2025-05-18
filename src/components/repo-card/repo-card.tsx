import React, { ChangeEvent, memo } from 'react';
import { semanticPalette } from 'assets/palette/palette';
import { styled } from 'styled-components';

import { Description } from 'components/description';
import { RepoLink } from 'components/repo-link';
import { Repo } from 'components/repos/repos.types'
import { ComparisonButton } from 'components/search-bar/search-result.style';
import { CreatedAt, UpdatedAt } from 'components/stats/dates';
import { ForksCount } from 'components/stats/forks-count';
import { IssuesCount } from 'components/stats/issues-count';
import { Language } from 'components/stats/language';
import { StarsCount } from 'components/stats/stars-count';
import { Link } from 'components/ui-kit/atomics/link';
import { formatScore } from 'utils/format-score';
import { getRepoFullName } from 'utils/get-repo-full-name';

export type RepoCardProps = {
    repo: Repo;
    score: number;
    /* React-router `to` link. Will render score as wrapped in a react-router link if passed. */
    scoreLink?: string;
    /* Won't show button if no callback is passed. */
    onRemoveFromComparison?: (repo: Repo) => void;
    /* Won't show checkbox if no callback is passed. */
    onRepoDetailedComparisonCheck?: (e: ChangeEvent<HTMLInputElement>) => void;
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
    justify-content: center;
    align-items: center;
`

const ScoreLink = styled(Link)`
    flex-grow: 1;
`

export const Score = styled.span`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    const { repo, onRemoveFromComparison, onRepoDetailedComparisonCheck } = props;

    const repoFullName = getRepoFullName(repo);

    const scoreEl = (
        <Score>
            Score:
            <H2>{formatScore(props.score)}</H2>
        </Score>
    );

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
                {onRepoDetailedComparisonCheck && (
                    <div>
                        <input type="checkbox" id={repoFullName} name={repoFullName} onChange={onRepoDetailedComparisonCheck} />
                        <label htmlFor={repoFullName}>Compare</label>
                    </div>
                )}
                {!props.scoreLink ? scoreEl : (<ScoreLink to={repoFullName}>
                    {scoreEl}
                </ScoreLink>)}
                {onRemoveFromComparison && (
                    <ComparisonButton
                        preset="remove"
                        onClick={() => onRemoveFromComparison(repo)}
                    >
                        Remove
                    </ComparisonButton>
                )}
            </Footer>
        </RepoCardStyled>
    );
})

