import { Repo } from 'components/repos/repos.store'

export const getRepoFullName = (repo: Pick<Repo, 'name' | 'owner'>) => `${repo.owner}/${repo.name}`;
