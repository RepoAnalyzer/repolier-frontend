import React from 'react';

import { Repo } from 'components/repos/repos.store'

export type RepoCardProps = {
    repo: Repo;
}

export const RepoCard = (props: RepoCardProps) => {
    return (
        <div>{JSON.stringify(props.repo)}</div>
    );
}

