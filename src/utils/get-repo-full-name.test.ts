import { getRepoFullName } from "./get-repo-full-name";

describe.each([
    { repo: { owner: 'DeadlySquad13', name: 'RepoAnalyzer' }, repoFullName: 'DeadlySquad13/RepoAnalyzer' },
    { repo: { owner: 'NeoVim', name: 'NeoVim' }, repoFullName: 'NeoVim/NeoVim' },
    { repo: { owner: '', name: 'NeoVim' }, repoFullName: '/NeoVim' },
    { repo: { owner: 'Owner', name: '' }, repoFullName: 'Owner/' },
])(`for vehicle type`, (testCase) => {
    const { repo, repoFullName } = testCase;

    test('default  options', () => expect(getRepoFullName(repo)).toBe(repoFullName));
});
