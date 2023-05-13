import { axiosInstance } from 'api/axios';

import { sleep } from 'utils/sleep';

import { COUNTER_ROUTES, CounterResponse } from './counter.routes';

export const fetchCount = async (data = 1): Promise<CounterResponse> => {
    try {
        const response = await axiosInstance.get<CounterResponse>(COUNTER_ROUTES.getCount(), { data });
        return response.data;
    } catch (error) {
        // ? we have no backend in example so just return same data on error
        await sleep(1000);
        return { data };
    }
};
