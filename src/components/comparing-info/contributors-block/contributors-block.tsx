import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';

import { RepoLink } from 'components/repo-link';
import { reposMediator } from 'components/repos/repos.mediator';

import { ContributorsBar, ContributorsBarStyled } from './contributors-bar';

export const ComparingInfoStyled = styled.div`
    & ${ContributorsBarStyled} {
        margin-top: 24px;
    }
`;

export const Contributors = styled.div`
    margin-top: 36px;
`;

// TODO: Add shimmer.
export const ContributorsBlock = observer(() => {
    const { t } = useTranslation()

    const contributors = reposMediator.services.analytics.contributors.itemMap;

    return (
        <ComparingInfoStyled>
            {reposMediator.comparingItems.length > 0 && <h2>{t('Contributions')}</h2>}
            {contributors.size > 0 &&
                Array.from(contributors.entries()).map(([repoFullName, contributorsForRepo]) => {
                    const repo = reposMediator.itemsMap.get(repoFullName);

                    return (
                        <Contributors key={repoFullName}>
                            {repo && (
                                <span>
                                    {t('Contributions for')} <RepoLink repo={repo} />
                                </span>
                            )}
                            {contributorsForRepo.length < 1 ? (
                                <p>No stats</p>
                            ) : (
                                <ContributorsBar contributorsForRepo={contributorsForRepo} />
                            )}
                        </Contributors>
                    );
                })}
        </ComparingInfoStyled>
    );
});
