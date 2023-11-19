import React from "react";

import { RepoLink } from "components/repo-link";
import { Repo } from 'components/repos/repos.types';
import { CreatedAt, UpdatedAt } from "components/stats/dates";
import { ForksCount } from "components/stats/forks-count";
import { IssuesCount } from "components/stats/issues-count";
import { Language } from "components/stats/language";
import { StarsCount } from "components/stats/stars-count";
import { Description } from "components/description";

import { ComparisonButton, Dates, Footer, Header, SearchResultStyled, Stats } from "./search-result.style";

export type SearchResultProps = {
    onAddToComparisonClick: (repo: Repo) => void;
    repo: Repo;
}

export const SearchResult = (props: SearchResultProps) => {
    const { repo } = props;

    return (
        <SearchResultStyled>
            <Header>
                <RepoLink repo={repo} />
                <ComparisonButton
                    preset="add"
                    onClick={() => { props.onAddToComparisonClick(repo) }}
                >
                    Add to comparison
                </ComparisonButton>
            </Header>
            {repo.description && (
                <main>
                    <Description description={repo.description} />
                </main>
            )}
            <Footer>
                <Stats>
                    <StarsCount starsCount={repo.stars} />
                    {repo.language && <Language language={repo.language} />}
                    <ForksCount forksCount={repo.forks} />
                    <IssuesCount issuesCount={repo.open_issues} />
                </Stats>
                <Dates>
                    <CreatedAt created_at={repo.created_at} />
                    <UpdatedAt updated_at={repo.updated_at} />
                </Dates>
            </Footer>
        </SearchResultStyled >
    );
}

