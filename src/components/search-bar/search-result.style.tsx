import styled from "styled-components";
import { semanticPalette } from "assets/palette/palette";

const ANIMATION = '0.2s ease-in-out';

export const SearchResultStyled = styled.li`
    padding: 8px;
    max-width: 800px;
    border-radius: 8px;
    transition: background-color ${ANIMATION};

    &:hover {
        background-color: ${semanticPalette.hover};
    }
`

export const AddToComparisonButton = styled.button`
    border-radius: 6px;
    border: 1px solid ${semanticPalette.contrastingHover};
    padding: 8px;
    background-color: ${semanticPalette.contrasting};
    color: ${semanticPalette.primary};
    font-weight: 600;

    transition: opacity ${ANIMATION};
    opacity: 0;

    &:hover {
        border: 1px solid ${semanticPalette.contrasting};
        background-color: ${semanticPalette.contrastingHover};
    }

    ${SearchResultStyled}:hover & {
        opacity: 1;
    }
`

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
`

export const Footer = styled.footer`
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
`

export const Dates = styled.section`
    width: 340px;
    display: flex;
    justify-content: space-between;
`

export const Stats = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
