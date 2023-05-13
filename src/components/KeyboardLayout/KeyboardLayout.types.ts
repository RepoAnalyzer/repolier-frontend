export enum LayoutType {
    Big,
    Small,
    MacOs,
}

export type Keymapping = {
    [key: string]: Keymapping | string | undefined;

    action?: string;
    description?: string;
}
