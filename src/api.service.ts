import {RxHR} from '@akanass/rx-http-request';

const FLIGHTS_URL = 'https://api.skypicker.com/flights'

interface GetFlights {
    flyFrom?: string;
    to?: string;
    dateFrom?: string;
    dateTo?: string;
    sort?: 'price';
    asc?: 1 | 0;
    radiusFrom?: number;
    curr?: 'EUR';
    locale?: 'en';
    offset?: number;
    limit?: 30;
}

export function getFlights(flightParameters: GetFlights) {
    return RxHR.get(FLIGHTS_URL, {json: true, qs: flightParameters});
}

