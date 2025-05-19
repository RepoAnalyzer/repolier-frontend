// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
    en: {
        translation: {
            "Score": "Score",
            "Remove": "Remove",
            "Compare": "Compare",
            "Created at": "Created at {{date}}",
            "Updated at": "Updated at {{date}}",
            "Search": "Search",
            "Sort by": "Sort by",
            "Sort results by": "Sort results by",
            "Add to comparison": "Add to comparison",
            "Programming languages": "Programming languages",
            "Contributions": "Contributions",
            "Contributions for": "Contributions for",
        },
    },
    ru: {
        translation: {
            "Score": "Оценка",
            "Remove": "Убрать",
            "Compare": "Сравнить",
            "Created at": "Создан {{date}}",
            "Updated at": "Обновлён {{date}}",
            "Search": "Поиск",
            "Sort by": "Сортировать по полю",
            "Sort results by": "Сортировать результаты по полю",
            "Add to comparison": "Добавить к сравнению",
            "Programming languages": "Языки программирования",
            "Contributions": "Вклад участников",
            "Contributions for": "Вклад участников в",
        },
    },
} as const;
