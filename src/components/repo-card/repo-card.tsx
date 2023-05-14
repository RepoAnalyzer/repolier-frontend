import React from 'react';
import { semanticPalette } from 'assets/palette/palette';
import styled from 'styled-components';

import { RepoLink } from 'components/repo-link';
import { Repo } from 'components/repos/repos.store'
import { CreatedAt, UpdatedAt } from 'components/stats/dates';
import { ForksCount } from 'components/stats/forks-count';
import { Language } from 'components/stats/language';
import { StarsCount } from 'components/stats/stars-count';
import { IssuesCount } from 'components/stats/issues-count';

export type RepoCardProps = {
    repo: Repo;
}

const BLOCK_PADDING = `padding: 8px 16px;`

export const RepoCardStyled = styled.section`
    border-radius: 16px;
    border: 2px solid ${semanticPalette.emphasizing};
    width: 400px;
    height: 600px;
    background-color: ${semanticPalette.primary};
`

export const Img = styled.img`
    border-radius: 16px;
    border: 1px solid ${semanticPalette.emphasizing};
    display: block;
    width: 128px;
    height: 128px;
`

export const Description = styled.article`
    ${BLOCK_PADDING}
    margin-top: 24px;
    display: block;
    height: 25%;
`

export const Dates = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
`

export const Stats = styled.section`
    display: flex;
    justify-content: space-between;
`

export const RepoCard = (props: RepoCardProps) => {
    const { repo } = props;

    return (
        <RepoCardStyled>
            <Img src={repo.avatar} />
            <RepoLink mt="8px" repo={repo} />
            <Description>{repo.description}</Description>

            <Stats>
                <div>
                    <StarsCount starsCount={repo.stars} />
                    <Language language={repo.language} />
                    <ForksCount forksCount={repo.forks} />
                    <IssuesCount issuesCount={repo.open_issues} />
                </div>
                <Dates>
                    <CreatedAt created_at={repo.created_at} />
                    <UpdatedAt updated_at={repo.updated_at} />
                </Dates>
            </Stats>
        </RepoCardStyled>
    );
}

