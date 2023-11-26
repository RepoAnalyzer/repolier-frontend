import { Repo } from './repos.types';

const MOST_STARS = 366721;
// const MOST_FORKS = 242860;
const GOOD_FORKS = 24286;
const YEAR = 360 * 24 * 60 * 60 * 1000;
// const BAD_NUMBER_OF_OPEN_ISSUES = 200;

const getDateScore = (date: string, inPeriod: number) =>
    Math.min(Date.now() - Number(new Date(date)), inPeriod) / inPeriod;

export const getScore = (repo: Repo) => {
    // console.log(repo.name)

    const scores = {
        stars: repo.stars / MOST_STARS,
        forks: Math.min(1, repo.forks / GOOD_FORKS),
        updated: 1 - getDateScore(repo.updated_at, YEAR),
        created: getDateScore(repo.created_at, 5 * YEAR),
        // openIssues: 1 - repo.open_issues / BAD_NUMBER_OF_OPEN_ISSUES,
    };

    // console.log({ scores })

    return Math.min(1, (scores.stars + scores.forks + scores.updated + scores.created * scores.updated) / 4);
};

