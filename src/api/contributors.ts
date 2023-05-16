export type Contributor = {
    name: string;
    contributions: number;
    avatar: string;
}

export type ContributorResponse = {
    login: string;
    contributions: number;
    avatar_url: string;
}

export type GetContributorsResponse = ContributorResponse[];


export const ITEMS_PER_PAGE = 5;

export const getContributors = async (ownerName: string, repoName: string): Promise<Contributor[]> => {
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

    const response = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/contributors`, {
        headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : undefined
    });

    const data = await response.json() as GetContributorsResponse;

    return data.map((item: ContributorResponse) => ({
        name: item.login,
        contributions: item.contributions,
        avatar: item.avatar_url,
    }));
}

