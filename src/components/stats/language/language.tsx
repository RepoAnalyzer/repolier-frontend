import React from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { semanticPalette } from 'assets/palette/palette';
import { styled } from 'styled-components';

export const LanguageStyled = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-top: 2px;
        margin-right: 4px;

        stroke: ${semanticPalette.emphasizing};
        stroke-width: 1px;
    }
`

export type LanguageProps = {
    language: string;
}

const hash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;

    return h;
}

// Most languages are short strings so multiplying by 10 to redistribute colors a little bit.
const generateLanguageColor = (language: string) =>
    `#${Math.floor(hash(language) * 10 % 16777215).toString(16)}`;

export const Language = (props: LanguageProps) =>
    <LanguageStyled><BsCircleFill fill={generateLanguageColor(props.language)} />{props.language}</LanguageStyled>

