import React from 'react';
import styled from 'styled-components';
import { AiOutlineStar } from 'react-icons/ai'


export const StarsCountStyled = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-top: 2px;
        margin-right: 4px;
    }
`

export type StarsCountProps = {
    starsCount: number;
}

export const StarsCount = (props: StarsCountProps) =>
    <StarsCountStyled><AiOutlineStar />{props.starsCount}</StarsCountStyled>

