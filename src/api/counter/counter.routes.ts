import { APIRoutes } from 'types/Routes.types';

export type CounterResponse = { data: number };

export interface ICounterApi {
    getCount: (data?: number) => Promise<CounterResponse>;
}

const COUNTER_PREFIX = 'counter' as const;

export const COUNTER_ROUTES: APIRoutes<ICounterApi> = {
    getCount: () => `${COUNTER_PREFIX}`,
};
