import React from 'react';
import styled from 'styled-components';
import { BiGitRepoForked } from 'react-icons/bi'


export const ForksCountStyled = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-top: 2px;
        margin-right: 4px;
    }
`

export type ForksCountProps = {
    forksCount: number;
}

export const ForksCount = (props: ForksCountProps) =>
    <ForksCountStyled><BiGitRepoForked />{props.forksCount}</ForksCountStyled>

