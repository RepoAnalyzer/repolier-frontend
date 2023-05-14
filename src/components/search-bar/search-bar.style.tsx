import { palette, semanticPalette } from 'assets/palette/palette';
import styled from 'styled-components';

export type InputProps = {
    isSearching: boolean;
}

export type SearchBarStyledProps = {
    isSearching: boolean;
};

export const SearchBarStyled = styled.div<SearchBarStyledProps>`
    z-index: 1;
    transform: translateX(-50%);
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    padding: 12px 32px 4px;
    background-color: ${(props) => props.isSearching ? semanticPalette.primary : 'inherit'};
`

export const Input = styled.input<InputProps>`
    width: 800px;
    height: 32px;
    padding: 2px 8px;
    font-size: 24px;
    line-height: 24px;
    border-radius: 8px;
    border: 1px solid ${(props) => !props.isSearching ? semanticPalette.vague : semanticPalette.contrasting2};
    background-color: ${(props) => !props.isSearching ? palette.black : semanticPalette.primary};
    color: ${(props) => !props.isSearching ? semanticPalette.primary : semanticPalette.informational.primary};
    outline: none;

    &:focus {
        border: 2px inset ${semanticPalette.contrasting2};
        width: 798px;
        height: 30px;
    }

    &::placeholder {
        color: ${(props) => !props.isSearching ? semanticPalette.informational.secondary : semanticPalette.informational.primary};
    }
`

export const Overlay = styled.div`
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: hsla(231, 13%, 14%, .4);
`

export const Shimmer = styled.div`
    border-radius: 6px;
    width: 100%;
    margin-bottom: 4px;
    height: 96px;
    @keyframes shimmer {
        100% {-webkit-mask-position:left}
    }
    -webkit-mask: linear-gradient(-60deg,#000 30%,#0005,#000 70%) right/300% 100%;
    background-repeat: no-repeat;
    animation: shimmer 2.5s infinite;
    background-color: #f1f1f1;
`

export const SearchResultsStyled = styled.ol`
    width: 100%;
    padding: 0;
    list-style-type: none;
`
