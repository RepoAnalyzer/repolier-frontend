import React from 'react';
import { observer } from 'mobx-react-lite';
import { reposStore } from 'components/repos/repos.store';
import styled from 'styled-components';
import { RepoLink } from 'components/repo-link';

import { LanguagesPie } from './languages-pie';

export const LanguagesPies = styled.div`
    margin-top: 36px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const LanguagesBlock = observer(() => {
    if (reposStore.comparingItems.length < 1) {
        return null;
    }
    const languagesMap = reposStore.languagesMap;

    if (languagesMap.size < 1) {
        return <h2>Languages</h2>;
    }

    return (
        <div>
            <h2>Languages</h2>
            <LanguagesPies>
                {
                    Array.from(reposStore.languagesMap.entries()).map(([repoFullName, repoLanguages]) => {
                        const repo = reposStore.itemsMap.get(repoFullName);

                        return (
                            <div key={repoFullName}>
                                {repo && <RepoLink repo={repo} />}
                                <LanguagesPie repoLanguages={repoLanguages} />
                            </div>
                        );
                    })
                }
            </LanguagesPies>
        </div >
    );
});
