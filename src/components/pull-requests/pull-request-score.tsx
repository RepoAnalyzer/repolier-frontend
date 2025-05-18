import React, { memo, useState } from 'react';
import { IconType } from 'react-icons';
import { CgArrowBottomRight, CgArrowTopRight } from "react-icons/cg";
import { FaQuestionCircle } from "react-icons/fa";
import { GiBodyHeight, GiEmptyHourglass, GiRadioactive } from 'react-icons/gi';
import { useFloating, useHover, useInteractions } from '@floating-ui/react';
import { TRepoPullRequestScore } from 'api/pull-requests.mapper.types';
import { semanticPalette } from 'assets/palette/palette';
import { styled } from 'styled-components';

import { formatScore } from 'utils/format-score';

export type RepoPullRequestScoreProps = {
    score: TRepoPullRequestScore;
}

const RepoPullRequestScoreStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.8em;
    background: ${semanticPalette.secondary};
    border-radius: 8px;
    border: 1px solid ${semanticPalette.contrasting2};
    padding: 16px;
`
export const ScoreStyled = styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: center;
`

export const GeneralScore = styled(ScoreStyled)`
    margin: 0 0 0 16px;
    padding: 8px;

    &:hover {
        color: ${semanticPalette.contrasting2};
    }
`

type AdditionalScoreProps = {
    $preset?: 'bad' | 'normal' | 'good';
}

export const AdditionalScore = styled(ScoreStyled) <AdditionalScoreProps>`
    color: ${(props) => {
        switch (props.$preset) {
            case 'good':
                return semanticPalette.contrasting;
            case 'bad':
                return semanticPalette.error;
            default:
                return;
        }
    }};
`

export const ScoreValue = styled.span`
    flex-grow: 1;
    font-size: 1.3rem;
    text-align: right;
`

export type ScoreMainProps = {
    type: 'negative' | 'positive';
    normalValueRange: [number, number];
    score: number;
}

export type ScoreProps = ScoreMainProps & {
    size?: number;
    icon: IconType;
}

const getScorePreset = (props: ScoreMainProps): AdditionalScoreProps['$preset'] => {
    const { score, type } = props;
    const [min, max] = props.normalValueRange;

    const isReverted = type === 'negative';

    if (score < min) {
        return !isReverted ? 'bad' : 'good'
    } else if (score > max) {
        return !isReverted ? 'good' : 'bad'
    } else {
        return 'normal'
    }
}

const Score = (props: ScoreProps) => {
    const { size = 18, icon: IconEl, ...scoreMainProps } = props;

    return (
        <AdditionalScore $preset={getScorePreset(scoreMainProps)}>
            <IconEl size={size} /> <ScoreValue>{formatScore(props.score)}</ScoreValue>
            {props.type === 'positive' ? <CgArrowTopRight size={size} /> : <CgArrowBottomRight size={size} />}
        </AdditionalScore>
    )
}

export const Span = styled.span`
    font-size: 1.1rem;
    text-align: center;
`


export const RepoPullRequestScore = memo((props: RepoPullRequestScoreProps) => {
    const { score } = props;

    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'top-end',
    });

    const hover = useHover(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
    ]);

    return (
        <>
            <GeneralScore
                ref={refs.setReference} {...getReferenceProps()}
            >
                <ScoreValue>{formatScore(score.general)}</ScoreValue>
                <FaQuestionCircle size={18} color={semanticPalette.contrasting2} />
            </GeneralScore>
            {isOpen && (
                <RepoPullRequestScoreStyled
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    <Span>На основе статистики запроса и автора, оценок <br /> обсуждения и вероятности закрытия:</Span>
                    <div>
                        <Score type="positive" normalValueRange={[0.30, 0.80]} size={18} score={score.author} icon={GiBodyHeight} />
                        <Score type="negative" normalValueRange={[0.10, 0.33]} size={18} score={score.toxicity} icon={GiRadioactive} />
                        <Score type="negative" normalValueRange={[0.15, 0.60]} size={18} score={score.abandonRate} icon={GiEmptyHourglass} />
                    </div>
                </RepoPullRequestScoreStyled>
            )
            }
        </>
    )
})
