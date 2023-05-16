import React, { useState } from 'react';
import { palette, semanticPalette } from 'assets/palette/palette';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components'

import { RepoCard } from 'components/repo-card/repo-card';
import { reposStore } from 'components/repos/repos.store';
import { SearchBar } from 'components/search-bar/search-bar';
import { BiUpArrow } from 'react-icons/bi';
import { GiPlantRoots } from 'react-icons/gi';
import { GoPin } from 'react-icons/go'
import { ComparingInfo } from 'components/comparing-info/comparing-info';

export const Button = styled.button`
    color: ${semanticPalette.contrasting};
`

export const AppStyled = styled.div`
    position: relative;
    background-color: ${semanticPalette.primary};
`

const HEADER_HEIGHT = '98px';
const THIN_HEADER_HEIGHT = '20px';

export type HeaderStyledProps = {
    isVisible: boolean;
}

//   padding-top should be no lower then THIN_HEADER_HEIGHT otherwise it overlaps with
// input content no matter the z-index.
export const HeaderStyled = styled.header<HeaderStyledProps>`
    position: ${(props) => props.isVisible ? 'fixed' : 'absolute'};
    width: 100%;
    height: ${HEADER_HEIGHT};
    background-color: ${palette.black};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${THIN_HEADER_HEIGHT} 24px 0;
`

export const HeaderThin = styled.div`
    top: 0;
    position: sticky;
    width: 100%;
    display: flex;
    justify-content: end;
    height: ${THIN_HEADER_HEIGHT};
    cursor: pointer;
    background-color: ${palette.black};
`

export type HeaderProps = {
    children: JSX.Element;
}

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
`

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
`

export const Header = (props: HeaderProps) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <HeaderStyled isVisible={isVisible}>
                {props.children}
            </HeaderStyled>
            <HeaderThin
                onClick={() => setIsVisible((isVisible) => !isVisible)}
            >
                {isVisible ? <BiUpArrowStyled /> : <GoPinStyled />}
            </HeaderThin>
        </>
    );
}

export const Main = styled.main`
    padding: 16px 32px;
    margin-top: ${HEADER_HEIGHT};
`

export const RepoCards = styled.ul`
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 24px;
    flex-wrap: wrap;
`

export const SearchBarStyled = styled(SearchBar)`
    z-index: 1;
`

export const GiPlantRootsStyled = styled(GiPlantRoots)`
    width: 400px;
    height: 400px;
`

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
`

const Greeting = () => {
    return (
        <div>
            <GreetingMessage>Choose repositories</GreetingMessage>
            <GiPlantRootsStyled />
        </div>
    );
}

export const App = observer(() => {
    return (
        <AppStyled>
            <Header>
                <SearchBarStyled />
            </Header>
            <Main>
                <RepoCards>
                    {reposStore.items.length < 1 ? <Greeting /> :
                        reposStore.items.map(repo => (
                            <RepoCard
                                key={repo.name}
                                repo={repo}
                                onRemoveFromComparison={(repo) => reposStore.removeFromComparison(repo)}
                                onRepoDetailedComparisonCheck={(e) => reposStore.setDetailedComparison(e.target?.id, e.target.checked)}
                            />
                        ))}
                </RepoCards>
                <ComparingInfo />
            </Main>
        </AppStyled >
    );
});
