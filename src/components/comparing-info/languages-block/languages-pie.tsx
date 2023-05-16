import React from 'react';
import styled from 'styled-components';
import { ResponsivePie } from '@nivo/pie'
import { Languages } from 'api/languages';
import { prepareLanguagesData } from './prepare-languages-data.util';

export const LanguagesPieStyled = styled.div`
    margin-top: 36px;
    height: 400px;
    width: 600px;
`
export type LanguagesPieProps = {
    repoLanguages: Languages;
}

const LANGUAGE_PERCENT_MIN_VALUE = 3;

export const LanguagesPie = (props: LanguagesPieProps) => {
    const { repoLanguages } = props;
    return (

        <LanguagesPieStyled>
            <ResponsivePie
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                data={prepareLanguagesData(repoLanguages, LANGUAGE_PERCENT_MIN_VALUE)}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={8}
            />
        </LanguagesPieStyled>
    );
}
