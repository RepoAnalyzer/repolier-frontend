export type FetchStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type AsyncState = {
    status: FetchStatus;
    error?: unknown;
};
