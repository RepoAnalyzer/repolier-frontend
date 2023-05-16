export type Contributor = {
    id: number;
    name: string;
    contributions: number;
    avatar: string;
}

export type ContributorResponse = {
    id: number;
    login: string;
    contributions: number;
    avatar_url: string;
}

export type GetContributorsResponse = ContributorResponse[];


export const getContributors = async (ownerName: string, repoName: string): Promise<Contributor[]> => {
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

    const response = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/contributors`, {
        headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : undefined
    });

    const data = await response.json() as GetContributorsResponse;

    return data.map((item: ContributorResponse) => ({
        ...item,
        name: item.login,
        avatar: item.avatar_url,
    }));
}

