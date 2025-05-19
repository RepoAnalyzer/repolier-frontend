import React from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';

import { RepoLink } from 'components/repo-link';
import { reposMediator } from 'components/repos/repos.mediator';

import { LanguagesPie } from './languages-pie';
import { useTranslation } from 'react-i18next';

export const LanguagesPies = styled.div`
    margin-top: 36px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const LanguagesBlock = observer(() => {
    const { t } = useTranslation()

    if (reposMediator.comparingItems.length < 1) {
        return null;
    }
    const languagesMap = reposMediator.services.analytics.languages.itemMap;

    const headingEl = <h2>{t('Programming languages') }</h2>

    if (languagesMap.size < 1) {
        return headingEl;
    }

    return (
        <div>
            {headingEl}
            <LanguagesPies>
                {Array.from(languagesMap.entries()).map(([repoFullName, repoLanguages]) => {
                    const repo = reposMediator.itemsMap.get(repoFullName);

                    return (
                        <div key={repoFullName}>
                            {repo && <RepoLink repo={repo} />}
                            {repoLanguages.size < 1 ? (
                                <p>No stats</p>
                            ) : (
                                <LanguagesPie repoLanguages={repoLanguages} />
                            )}
                        </div>
                    );
                })}
            </LanguagesPies>
        </div>
    );
});
