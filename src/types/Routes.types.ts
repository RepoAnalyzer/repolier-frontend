export interface Route {
    (...pathSegments: (string | number)[]): string;
}

export type APIRoutes<T> = {
    [K in keyof T]: Route;
};
