import React from "react";
import { Repo, reposStore } from 'components/repos/repos.store';
import { semanticPalette } from 'assets/palette/palette';
import format from 'date-fns/format'
import styled from 'styled-components';

export type SearchResultProps = {
    repo: Repo;
}

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

export const Link = styled.a`
    color: ${semanticPalette.contrasting2};
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
`

const Footer = styled.footer`
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
`

const Dates = styled.section`
    width: 340px;
    display: flex;
    justify-content: space-between;
`

export const formatDateAsRuFull = (date: string) =>
    format(new Date(date), 'dd.mm.yyyy')

export const SearchResult = (props: SearchResultProps) => {
    const { repo } = props;

    return (
        <SearchResultStyled>
            <Header>
                <Link href={repo.url}>{`${repo.owner}/${repo.name}`}</Link>
                <AddToComparisonButton onClick={() => {
                    reposStore.addToComparison(repo)
                    reposStore.searchItems = []
                }}>Add to comparison</AddToComparisonButton>
            </Header>
            <main>
                <span>{repo.description}</span>
            </main>
            <Footer>
                {`Stars ${repo.stars}`}
                <Dates>

                    <span>
                        {`created at ${formatDateAsRuFull(repo.created_at)}`}
                    </span>
                    <span>
                        {`updated at ${formatDateAsRuFull(repo.updated_at)}`}
                    </span>

                </Dates>
            </Footer>
        </SearchResultStyled >
    );
}

