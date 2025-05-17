import React from 'react'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

export type GHMarkdownProps = {
    children?: string | null;
}

const MarkdownStyled = styled.div`
    overflow: hidden;
`

export const GHMarkdown = (props: GHMarkdownProps) => (
    <MarkdownStyled>
        <Markdown remarkPlugins={[remarkGfm]}>{props.children}</Markdown>
    </MarkdownStyled>
)
