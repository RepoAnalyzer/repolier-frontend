import { semanticPalette } from "assets/palette/palette";
import { styled } from "styled-components";

const ANIMATION = '0.2s ease-in-out';

export type ComparisonButtonProps = {
    preset?: 'add' | 'remove'
}

export const ComparisonButton = styled.button<ComparisonButtonProps>`
    cursor: pointer;
    border-radius: 6px;
    border: 1px solid ${(props) => {
        if (props.preset === 'add') {
            return semanticPalette.contrastingHover;
        }

        return semanticPalette.errorHover;
    }};
    padding: 8px;
    background-color: ${(props) => {
        if (props.preset === 'add') {
            return semanticPalette.contrasting;
        }

        return semanticPalette.primary;
    }};
    color: ${(props) => {
        if (props.preset === 'add') {
            return semanticPalette.primary;
        }

        return semanticPalette.error;
    }};
    font-weight: 600;

    transition: opacity ${ANIMATION};
    opacity: 0;

    &:hover {
        border: 1px solid ${semanticPalette.emphasizing};
        color: ${semanticPalette.primary};
        background-color: ${(props) => {
        if (props.preset === 'add') {
            return semanticPalette.contrastingHover;
        }

        return semanticPalette.errorHover;
    }};
    }
`

export const SearchResultStyled = styled.li`
    padding: 8px;
    max-width: 800px;
    border-radius: 8px;
    transition: background-color ${ANIMATION};

    &:hover {
        background-color: ${semanticPalette.hover};
    }

    &:hover ${ComparisonButton} {
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
