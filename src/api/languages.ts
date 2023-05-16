export type Languages = Record<string, number>;

export const getLanguages = async (ownerName: string, repoName: string): Promise<Languages> => {
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

    const response = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/languages`, {
        headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : undefined
    });

    const data = await response.json() as Languages;

    return data;
}

