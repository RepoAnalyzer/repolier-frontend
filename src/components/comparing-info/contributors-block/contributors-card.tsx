import React from 'react';
import styled from "styled-components";
import { Contributor } from "api/contributors";

export const ContributorCardStyled = styled.div`
    text-align: center;
`

export const Avatar = styled.img`
    width: 64px;
    height: 64px;
`

export type ContributorCardProps = {
    contributor: Contributor;
}

export const ContributorCard = (props: ContributorCardProps) => {
    const { contributor } = props;

    return (
        <ContributorCardStyled>
            <div>{contributor.name}</div>
            <Avatar src={contributor.avatar} />
            <div>{contributor.contributions}</div>
        </ContributorCardStyled>
    )
}

