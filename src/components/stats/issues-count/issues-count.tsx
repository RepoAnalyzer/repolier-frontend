import React from 'react';
import { VscIssues } from 'react-icons/vsc'
import { styled } from 'styled-components';


export const IssuesCountStyled = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-top: 2px;
        margin-right: 4px;
    }
`

export type IssuesCountProps = {
    issuesCount: number;
}

export const IssuesCount = (props: IssuesCountProps) =>
    <IssuesCountStyled><VscIssues />{props.issuesCount}</IssuesCountStyled>

