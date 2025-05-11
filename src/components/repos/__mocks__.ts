import { getRepoFullName } from 'utils/get-repo-full-name';

import { RepoResponse } from './repo.mapper.types';
import { Repo } from './repos.types';

export const REPOS_RESPONSE: { items: RepoResponse[] } = {
    items: [
        {
            name: 'tesseract',
            description: 'Tesseract Open Source OCR Engine (main repository)',
            language: 'C++',
            stargazers_count: 50926,
            watchers_count: 50926,
            score: 1,
            owner: { avatar_url: 'https://avatars.githubusercontent.com/u/8401422?v=4', login: 'tesseract-ocr' },
            created_at: '2014-08-12T18:04:59Z',
            updated_at: '2023-05-14T13:25:30Z',
            html_url: 'https://github.com/tesseract-ocr/tesseract',
            forks_count: 4342,
            open_issues_count: 321,
        },
        {
            name: 'storybook',
            description:
                'Storybook is a frontend workshop for building UI components and pages in isolation. Made for UI development, testing, and documentation. ',
            language: 'TypeScript',
            stargazers_count: 78530,
            watchers_count: 78530,
            score: 1,
            owner: { avatar_url: 'https://avatars.githubusercontent.com/u/22632046?v=4', login: 'storybookjs' },
            created_at: '2016-03-18T04:23:44Z',
            updated_at: '2023-05-14T13:08:35Z',
            html_url: 'https://github.com/storybookjs/storybook',
            forks_count: 311,
            open_issues_count: 333,
        },
        {
            name: 'Next-js-Boilerplate',
            description:
                '🚀🎉📚 Boilerplate and Starter for Next.js 13+, Tailwing asdf fdf sdf  asdjfk asdjfk fdf sdf a sdf asdf   asdf asdf  df sdf asdf  sdf df df  asdf  asdfTailwind CSS 3.3 and TypeScript ⚡️ Made with developer experience first: Next.js + TypeScript + ESLint + Prettier + Husky + Lint-Staged + Jest + Testing Library + Cypress + Storybook + Commitlint + VSCode + Netlify + PostCSS + Tailwind CSS',
            language: 'TypeScript',
            stargazers_count: 3890,
            watchers_count: 3890,
            score: 1,
            owner: { avatar_url: 'https://avatars.githubusercontent.com/u/5209935?v=4', login: 'ixartz' },
            created_at: '2020-07-22T19:47:35Z',
            updated_at: '2023-05-14T11:53:10Z',
            html_url: 'https://github.com/ixartz/Next-js-Boilerplate',
            forks_count: 123,
            open_issues_count: 12,
        },
    ],
};

export const REPOS: Repo[] = [
    {
        name: 'tesseract',
        description: 'Tesseract Open Source OCR Engine (main repository)',
        language: 'C++',
        stars: 50926,
        watchers: 50926,
        score: 1,
        avatar: 'https://avatars.githubusercontent.com/u/8401422?v=4',
        owner: 'tesseract-ocr',
        created_at: '2014-08-12T18:04:59Z',
        updated_at: '2023-05-14T13:25:30Z',
        url: 'https://github.com/tesseract-ocr/tesseract',
        forks: 4342,
        open_issues: 321,
    },
    {
        name: 'storybook',
        description:
            'Storybook is a frontend workshop for building UI components and pages in isolation. Made for UI development, testing, and documentation. ',
        language: 'TypeScript',
        stars: 78530,
        watchers: 78530,
        score: 1,
        avatar: 'https://avatars.githubusercontent.com/u/22632046?v=4',
        owner: 'storybookjs',
        created_at: '2016-03-18T04:23:44Z',
        updated_at: '2023-05-14T13:08:35Z',
        url: 'https://github.com/storybookjs/storybook',
        forks: 311,
        open_issues: 333,
    },
    {
        name: 'Next-js-Boilerplate',
        description:
            '🚀🎉📚 Boilerplate and Starter for Next.js 13+, Tailwing asdf fdf sdf  asdjfk asdjfk fdf sdf a sdf asdf   asdf asdf  df sdf asdf  sdf df df  asdf  asdfTailwind CSS 3.3 and TypeScript ⚡️ Made with developer experience first: Next.js + TypeScript + ESLint + Prettier + Husky + Lint-Staged + Jest + Testing Library + Cypress + Storybook + Commitlint + VSCode + Netlify + PostCSS + Tailwind CSS',
        language: 'TypeScript',
        stars: 3890,
        watchers: 3890,
        score: 1,
        avatar: 'https://avatars.githubusercontent.com/u/5209935?v=4',
        owner: 'ixartz',
        created_at: '2020-07-22T19:47:35Z',
        updated_at: '2023-05-14T11:53:10Z',
        url: 'https://github.com/ixartz/Next-js-Boilerplate',
        forks: 123,
        open_issues: 12,
    },
];

export const REPOS_MAP: Map<string, Repo> = new Map(REPOS.map((repo => [getRepoFullName(repo), repo])))
