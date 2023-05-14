import React from 'react';
import { Repo } from 'components/repos/repos.store';
import { Link } from './repo-link.styles';
import { MarginProps } from 'styled-system';

export type RepoLinkProps = MarginProps & { repo: Pick<Repo, 'url' | 'owner' | 'name'> };

export const RepoLink = (props: RepoLinkProps) => {
    const { repo, ...styleProps } = props;

    return <Link {...styleProps} href={repo.url}>{`${repo.owner}/${repo.name}`}</Link>
}
