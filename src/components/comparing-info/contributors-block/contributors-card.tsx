import React from 'react';
import { Contributor } from 'api/contributors.mapper';
import { styled } from 'styled-components';

export const ContributorCardStyled = styled.div`
    text-align: center;
`;

export const Avatar = styled.img`
    width: 64px;
    height: 64px;
`;

export type ContributorCardProps = {
    contributor: PartialBy<Contributor, 'contributions'>;
};

export const ContributorCard = (props: ContributorCardProps) => {
    const { contributor } = props;

    const nameEl = <div>{contributor.name}</div>

    const contributionsEl = <div>{contributor.contributions}</div>

    if (!contributor.contributions) {
        return (
            <ContributorCardStyled>
                <Avatar src={contributor.avatar} />
                {nameEl}
            </ContributorCardStyled>
        );

    }

    return (
        <ContributorCardStyled>
            {nameEl}
            <Avatar src={contributor.avatar} />
            {contributionsEl}
        </ContributorCardStyled>
    );
};
