import {RxHR} from '@akanass/rx-http-request';
import * as moment from 'moment';

const FLIGHTS_URL = 'https://api.skypicker.com/flights';
const RESULTS_ON_PAGE = 5;

interface GetFlights {
    date: Date;
    from: string;
    to: string;
    page: number;
}

interface GetFlightsQueryParameters {
    flyFrom?: string;
    to?: string;
    dateFrom?: string;
    dateTo?: string;
    sort?: string;
    asc?: 1 | 0;
    radiusFrom?: number;
    curr?: string;
    locale?: string;
    offset?: number;
    limit?: number;
}

export function getFlights(flightParameters: GetFlights) {
    const {page, date, from, to} = flightParameters;
    const queryParams: GetFlightsQueryParameters = {
        sort: 'price',
        asc: 1,
        curr: 'EUR',
        locale: 'en',
        offset: (page - 1) * RESULTS_ON_PAGE,
        limit: RESULTS_ON_PAGE,
        flyFrom: from,
        to: to,
        dateFrom: moment(date).format('DD/MM/YYYY'),
        dateTo: moment(date).format('DD/MM/YYYY')
    }
    console.log(queryParams)
    return RxHR.get(FLIGHTS_URL, {json: true, qs: queryParams});
}

