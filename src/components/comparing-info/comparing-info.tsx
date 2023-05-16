import React from "react";
import styled from "styled-components";

import { ContributorsBlock } from "./contributors-block/contributors-block";

export const ComparingInfoStyled = styled.article`
    text-align: center;
`

export const ComparingInfo = () => {
    return <ComparingInfoStyled><ContributorsBlock /></ComparingInfoStyled>
}

