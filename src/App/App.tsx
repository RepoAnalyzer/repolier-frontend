import React from 'react';
import { semanticPalette } from 'assets/palette/palette';
import cnBind from 'classnames/bind';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components'

import { SearchBar } from 'components/search-bar/search-bar';

import styles from './App.module.scss';

const cx = cnBind.bind(styles);

export const Button = styled.button`
    color: ${semanticPalette.contrasting};
`

export const App = observer(() => {
    return (
        <div className={cx('App')}>
            <header>
            </header>
            <aside>
                <header></header>
                <div>
                    Info about keymappings.
                </div>
                <Button>Add to comparison</Button>
                <p>
                    {}
                </p>
                <footer />
            </aside>
            <main>
                <SearchBar />
            </main>
        </div>
    );
});
