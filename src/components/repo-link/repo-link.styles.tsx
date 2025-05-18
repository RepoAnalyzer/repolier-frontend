import { semanticPalette } from "assets/palette/palette";
import { styled } from "styled-components";
import { margin, MarginProps } from 'styled-system';

import { resetLinkStyles } from "components/ui-kit/mixins";

export const Link = styled.a<MarginProps>`
    ${resetLinkStyles}
    ${margin}
    color: ${semanticPalette.contrasting2};
    font-size: 18px;
    font-weight: 600;
`

