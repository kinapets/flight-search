import {RxHR} from '@akanass/rx-http-request';
import * as moment from 'moment';
import {Observable} from 'rx';
import {HttpResponse, GetFlightsQueryParameters} from './api.service.interface';
import {GetFlights, GetFlightsResponse, GetLocationsResponse} from './api.service.interface';

const BASE_URL = 'https://api.skypicker.com';
const RESULTS_ON_PAGE = 5;

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
    };
    return httpGet<GetFlightsResponse>('/flights', queryParams);
}

export function getLocations(term: string) {
    const queryParams = {term, v: 2, locale: 'en-US'};
    return httpGet<GetLocationsResponse>('/locations/', queryParams);
}

function httpGet<T>(url: string, query: Object): Observable<HttpResponse<T>> {
    return Observable.fromPromise(new Promise((resolve, reject) => {
        RxHR
            .get(BASE_URL + url, {json: true, qs: query, headers: {'User-Agent': 'Rx-Http-Request'}})
            .subscribe((data) => {
                if (data.response.statusCode < 400) {
                    resolve({statusCode: data.response.statusCode, data: data.response.body});
                } else {
                    reject({statusCode: data.response.statusCode, errPayload: data});
                }
            });
    }));
}
