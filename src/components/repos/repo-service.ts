import { Repo } from 'components/repos/repos.types';

export interface RepoService {
    add: (repo: Repo) => void;
    remove: (repoFullName: string) => void;
}

