import React from 'react';
import styled from "styled-components";
import { ResponsiveBar } from '@nivo/bar'
import { Contributor } from "api/contributors";

import { ContributorCard } from './contributors-card';

export const ContributorsBarStyled = styled.div`
    height: 500px;
`

export type ContributorsBarProps = {
    contributorsForRepo: Contributor[]
}

export const ContributorsBar = (props: ContributorsBarProps) => (
    <ContributorsBarStyled>
        <ResponsiveBar
            data={props.contributorsForRepo}
            keys={[
                'contributions',
            ]}
            tooltip={(props) =>
                <ContributorCard contributor={props.data} />
            }
            minValue={6}
            labelSkipHeight={16}
        />
    </ContributorsBarStyled>
);
