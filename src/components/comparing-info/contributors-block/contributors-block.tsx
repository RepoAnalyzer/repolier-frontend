import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { RepoLink } from 'components/repo-link';

import { reposStore } from "components/repos/repos.store";
import { ContributorsBar, ContributorsBarStyled } from "./contributors-bar";

export const ComparingInfoStyled = styled.div`
    & ${ContributorsBarStyled} {
        margin-top: 24px;
    }
`

export const Contributors = styled.div`
    margin-top: 36px;
`

// TODO: Add shimmer.
export const ContributorsBlock = observer(() => {
    const contributors = reposStore.contributorsMap;

    return (
        <ComparingInfoStyled>
            {reposStore.comparingItems.length > 0 && (<h1>Contributions</h1>)}
            {contributors.size > 0 && Array.from(contributors.entries()).map(([repoFullName, contributorsForRepo]) => {
                const repo = reposStore.itemsMap.get(repoFullName);

                return (
                    <Contributors key={repoFullName}>
                        {repo && <span>Contributions for <RepoLink repo={repo} /></span>}
                        <ContributorsBar contributorsForRepo={contributorsForRepo} />
                    </Contributors>
                );
            })}
        </ComparingInfoStyled>
    );
});
