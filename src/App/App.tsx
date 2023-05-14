import React from 'react';
import { palette, semanticPalette } from 'assets/palette/palette';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components'

import { RepoCard } from 'components/repo-card/repo-card';
import { reposStore } from 'components/repos/repos.store';
import { SearchBar } from 'components/search-bar/search-bar';

export const Button = styled.button`
    color: ${semanticPalette.contrasting};
`

export const AppStyled = styled.div`
    background-color: ${semanticPalette.primary};
`

export const Header = styled.header`
    min-height: 59px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${palette.black};
    padding: 16px 24px;
`

export const Main = styled.main`

`

export const App = observer(() => {
    return (
        <AppStyled>
            <Header>
                <SearchBar />
            </Header>
            <Main>
                <hr />
                <div>
                    {reposStore.items.length < 1 ? 'Choose a repository' :
                        reposStore.items.map(repo => <RepoCard key={repo.name} repo={repo} />)}
                </div>
            </Main>
        </AppStyled>
    );
});
