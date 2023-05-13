import { ICounterApi } from './counter.routes';
import { fetchCount } from './fetchCount';

class CounterService implements ICounterApi {
    getCount = (data = 1) => fetchCount(data);
}

export const counterService = new CounterService();
