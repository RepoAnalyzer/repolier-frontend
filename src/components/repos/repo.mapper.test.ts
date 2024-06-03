import { REPOS, REPOS_RESPONSE } from './__mocks__';
import { RepoMapper } from './repo.mapper';

const unmockedFetch = global.fetch;

beforeAll(() => {
    global.fetch = () =>
        // @ts-expect-error Don't argue about missing fields: we need only json property for this mock.
        Promise.resolve({
            json: () => Promise.resolve(REPOS_RESPONSE),
        });
});

afterAll(() => {
    global.fetch = unmockedFetch;
});

it('maps API response to list of repositoier correctly / проецирует ответ API в список репозиториев правильно', async () => {
    const repoMapper = new RepoMapper();
    const items = await repoMapper.read('Neovim/NeoVim', 'stars');

    expect(items).toEqual(REPOS);
});
