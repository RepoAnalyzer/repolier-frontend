import { Languages } from "api/languages";
import { keys, values } from 'lodash';

export const prepareLanguagesData = (repoLanguages: Languages, languagePercentMinValue: number) => {
    const totalValue = values(repoLanguages).reduce((acc, count) => acc + count, 0);

    const languageNames = keys(repoLanguages);

    const repoLanguagesFiltered = languageNames.reduce((acc, language) => {
        const value = repoLanguages[language];

        const languagePercent = value / totalValue * 100;

        if (languagePercent < languagePercentMinValue) {
            return acc;
        }

        return [...acc, {
            id: language,
            label: language,
            value,
        }];
    }, [] as { id: string, label: string, value: number }[]);

    const totalValueOfFiltered = values(repoLanguagesFiltered).reduce((acc, { value }) => acc + value, 0);

    return repoLanguagesFiltered.map((data) => {
        const languagePercent = (data.value / totalValueOfFiltered) * 100;

        return ({
            ...data,
            value: languagePercent.toFixed(2),
        })
    })
}
