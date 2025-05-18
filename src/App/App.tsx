import React, { useMemo, useState } from 'react';
import { BiUpArrow } from 'react-icons/bi';
import { GiPlantRoots } from 'react-icons/gi';
import { GoPin } from 'react-icons/go';
import { BrowserRouter, Route, Routes, useParams } from 'react-router';
import { palette, semanticPalette } from 'assets/palette/palette';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';

import { ComparingInfo } from 'components/comparing-info/comparing-info';
import { PullRequestsBlock } from 'components/pull-requests/pull-requests-block';
import { RepoCard } from 'components/repo-card/repo-card';
import { reposMediator } from 'components/repos/repos.mediator';
import { SearchBar } from 'components/search-bar/search-bar';
import { getRepoFullName } from 'utils/get-repo-full-name';

export const Button = styled.button`
    color: ${semanticPalette.contrasting};
`;

export const AppStyled = styled.div`
    position: relative;
    background-color: ${semanticPalette.primary};
`;

const HEADER_HEIGHT = '98px';
const THIN_HEADER_HEIGHT = '20px';

export type HeaderStyledProps = {
    $isVisible: boolean;
};

//   padding-top should be no lower then THIN_HEADER_HEIGHT otherwise it overlaps with
// input content no matter the z-index.
export const HeaderStyled = styled.header<HeaderStyledProps>`
    z-index: 2;
    position: ${(props) => (props.$isVisible ? 'fixed' : 'absolute')};
    width: 100%;
    height: ${HEADER_HEIGHT};
    background-color: ${palette.black};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${THIN_HEADER_HEIGHT} 24px 0;
`;

export const HeaderThin = styled.div`
    z-index: 2;
    top: 0;
    position: sticky;
    width: 100%;
    display: flex;
    justify-content: end;
    height: ${THIN_HEADER_HEIGHT};
    cursor: pointer;
    background-color: ${palette.black};
`;

export type HeaderProps = {
    children: JSX.Element;
};

const HEADER_ICON_SIZE = '12px';
const HEADER_ICON_COLOR = semanticPalette.emphasizing;
const HEADER_ICON_COLOR_HOVER = semanticPalette.primary;

export const GoPinStyled = styled(GoPin)`
    margin-top: 4px;
    margin-right: 16px;
    width: ${HEADER_ICON_SIZE};
    height: ${HEADER_ICON_SIZE};
    fill: ${HEADER_ICON_COLOR};

    ${HeaderThin}:hover & {
        fill: ${HEADER_ICON_COLOR_HOVER};
    }
`;

export const BiUpArrowStyled = styled(BiUpArrow)`
    margin-top: 4px;
    margin-right: 16px;
    width: ${HEADER_ICON_SIZE};
    height: ${HEADER_ICON_SIZE};
    stroke-width: 8px;
    stroke: ${HEADER_ICON_COLOR};
    fill: ${HEADER_ICON_COLOR};

    ${HeaderThin}:hover & {
        stroke: ${HEADER_ICON_COLOR_HOVER};
        fill: ${HEADER_ICON_COLOR_HOVER};
    }
`;

export const Header = (props: HeaderProps) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <HeaderStyled $isVisible={isVisible}>{props.children}</HeaderStyled>
            <HeaderThin onClick={() => setIsVisible((isVisible) => !isVisible)}>
                {isVisible ? <BiUpArrowStyled /> : <GoPinStyled />}
            </HeaderThin>
        </>
    );
};

export const Main = styled.main`
    padding: 16px 32px;
    margin-top: ${HEADER_HEIGHT};
`;

export const RepoCards = styled.ul`
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 24px;
    flex-wrap: wrap;
`;

export const SearchBarStyled = styled(SearchBar)`
    z-index: 1;
`;

export const GiPlantRootsStyled = styled(GiPlantRoots)`
    width: 400px;
    height: 400px;
`;

export const GreetingMessage = styled.h1`
    text-align: center;
    margin: 0 111px -16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    height: 100px;
    width: 100px;
    font-weight: 600;
    font-size: 20px;
`;

const Greeting = () => {
    return (
        <div>
            <GreetingMessage>Choose repositories</GreetingMessage>
            <GiPlantRootsStyled />
        </div>
    );
};

const ReposPage = observer(() => (
    <Main>
        <RepoCards>
            {reposMediator.items.length < 1 ? (
                <Greeting />
            ) : (
                reposMediator.items.map((repo) => {
                    const repoFullName = getRepoFullName(repo);

                    return (
                        <RepoCard
                            key={repo.name}
                            repo={repo}
                            score={reposMediator.getRepoScore(repoFullName)}
                            scoreLink={repoFullName}
                            onRemoveFromComparison={(repo) => reposMediator.removeFromComparison(repo)}
                            onRepoDetailedComparisonCheck={(e) => reposMediator.setDetailedComparison(e.target?.id, e.target.checked)} />
                    );
                })
            )}
        </RepoCards>
        <ComparingInfo />
    </Main>
))

const RepoPageStyled = styled(Main)`
    display: flex;
    flex-wrap: wrap;
`

const RepoPage = observer(() => {
    const params = useParams()

    const { ownerName, repoName } = params

    if (!ownerName || !repoName) {
        return null
    }

    const repoFullName = getRepoFullName({ owner: ownerName, name: repoName })
    const repo = reposMediator.itemsMap.get(repoFullName);

    if (!repo) {
        return null
    }

    const pullRequests = reposMediator.services.score.pullRequests.itemMap.get(repoFullName)

    // REFACTOR: Should be a getter in reposMediator and cached in repo.
    const score = useMemo(() =>
        reposMediator.getRepoScore(repoFullName),
        [repoFullName]
    )

    return (
        <RepoPageStyled>
            <RepoCard
                key={repo.name}
                repo={repo}
                score={score}
            />
            <PullRequestsBlock pullRequests={pullRequests} />
        </RepoPageStyled>
    )
})

export const App = () => {
    return (
        <AppStyled>
            <Header>
                <SearchBarStyled />
            </Header>
            <BrowserRouter>
                <Routes>
                    <Route index element={<ReposPage />} />
                    <Route path=":ownerName" element={<RepoPage />}>
                        <Route path=":repoName" element={<RepoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppStyled>
    );
};
