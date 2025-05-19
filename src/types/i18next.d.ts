// import the original type declarations
import { resources } from "i18n/resources";

import "i18next";

declare module "i18next" {
    // Extend CustomTypeOptions.
    interface CustomTypeOptions {
        // Custom resources type.
        // Main language should be chosen here. We currently have 'ru' but
        // I set en as it will dominate in the future anyway.
        resources: typeof resources['en'];
    }
}
