import { values } from 'lodash';

import { LanguagesMap } from 'components/repos/repos.mediator';

export const prepareLanguagesData = (repoLanguages: LanguagesMap, languagePercentMinValue: number) => {
    const totalValue = Array.from(repoLanguages.values()).reduce((acc, count) => acc + count, 0);

    const languageNames = Array.from(repoLanguages.keys());

    const repoLanguagesFiltered = languageNames.reduce((acc, language) => {
        const value = repoLanguages.get(language) || 0;

        const languagePercent = (value / totalValue) * 100;

        if (languagePercent < languagePercentMinValue) {
            return acc;
        }

        return [
            ...acc,
            {
                id: language,
                label: language,
                value,
            },
        ];
    }, [] as { id: string; label: string; value: number }[]);

    const totalValueOfFiltered = values(repoLanguagesFiltered).reduce((acc, { value }) => acc + value, 0);

    return repoLanguagesFiltered.map((data) => {
        const languagePercent = (data.value / totalValueOfFiltered) * 100;

        return {
            ...data,
            value: languagePercent.toFixed(2),
        };
    });
};
