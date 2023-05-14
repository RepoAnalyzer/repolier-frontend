import styled from "styled-components";
import { semanticPalette } from "assets/palette/palette";
import { margin, MarginProps } from 'styled-system';

export const Link = styled.a<MarginProps>`
    display: inline-block;
    ${margin}
    color: ${semanticPalette.contrasting2};
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

