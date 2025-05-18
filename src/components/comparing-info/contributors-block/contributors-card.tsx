import React from 'react';
import { Contributor } from 'api/contributors.mapper';
import { styled } from 'styled-components';

const WIDTH = '64px'

export const ContributorCardStyled = styled.div`
    width: ${WIDTH};
    text-align: center;
`;

export const Avatar = styled.img`
    width: ${WIDTH};
    height: 64px;
`;

const Name = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: break-spaces;
`

export type ContributorCardProps = {
    contributor: PartialBy<Contributor, 'contributions'>;
};

export const ContributorCard = (props: ContributorCardProps) => {
    const { contributor } = props;

    const nameEl = <Name>{contributor.name}</Name>

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
