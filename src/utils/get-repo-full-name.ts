import { Repo } from 'components/repos/repos.types'

export const getRepoFullName = (repo: Pick<Repo, 'name' | 'owner'>) => `${repo.owner}/${repo.name}`;
