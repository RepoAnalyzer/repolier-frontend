import { initReactI18next } from "react-i18next";
import i18n from "i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
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
};

// eslint-disable-next-line import/no-named-as-default-member
void i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "ru", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
