module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "plugins": ["@typescript-eslint", "react", "standard", "react-hooks", "import", "simple-import-sort"],
    "extends": [
        "prettier",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:eslint-comments/recommended",
        "plugin:react-hooks/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname,
    },
    "rules": {
        "eslint-comments/no-unused-disable": "error",
        "eslint-comments/no-use": "warn",
        "no-debugger": "error",
        "prefer-const": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "no-console": ["warn", { "allow": ["error"] }],
        "no-unused-expressions": "error",
        "react/prop-types": "off",
        "react/display-name": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "import/no-relative-parent-imports": "error",
        "import/no-duplicates": "error",
        "import/no-unresolved": "off",
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": [
            "warn",
            {
                "groups": [
                    // Node.js builtins. You could also generate this regex if you use a `.js` config.
                    // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
                    [
                        "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)"
                    ],
                    // Packages. `react` related packages come first.
                    ["^react", "^@?\\w"],
                    // Internal packages.
                    ["^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)"],
                    // Side effect imports.
                    ["^\\u0000"],
                    // Parent imports. Put `..` last.
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    // Style imports.
                    ["^.+\\.s?css$"]
                ]
            }
        ]
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
