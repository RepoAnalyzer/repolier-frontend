import React from "react";
import styled from "styled-components";

import { ContributorsBlock } from "./contributors-block";
import { LanguagesBlock } from "./languages-block";

export const ComparingInfoStyled = styled.article`
    text-align: center;
`

export const ComparingInfo = () => (
    <ComparingInfoStyled>
        <LanguagesBlock />
        <ContributorsBlock />
    </ComparingInfoStyled>
);

