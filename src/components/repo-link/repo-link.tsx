import React from 'react';
import { MarginProps } from 'styled-system';

import { Repo } from 'components/repos/repos.types';

import { Link } from './repo-link.styles';

export type RepoLinkProps = MarginProps & { repo: Pick<Repo, 'url' | 'owner' | 'name'> };

export const RepoLink = (props: RepoLinkProps) => {
    const { repo, ...styleProps } = props;

    return <Link {...styleProps} href={repo.url}>{`${repo.owner}/${repo.name}`}</Link>
}
