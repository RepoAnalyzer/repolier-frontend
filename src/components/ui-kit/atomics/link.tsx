import { Link as RouterLink } from 'react-router';
import { semanticPalette } from 'assets/palette/palette';
import { styled } from 'styled-components';

import { resetLinkStyles } from 'components/ui-kit/mixins';

export const Link = styled(RouterLink)`
    ${resetLinkStyles}
    color: ${semanticPalette.contrasting2};
`
