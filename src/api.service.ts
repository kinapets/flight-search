import {RxHR} from '@akanass/rx-http-request';
import * as moment from 'moment';
import {Observable} from 'rx';

const BASE_URL = 'https://api.skypicker.com';
const RESULTS_ON_PAGE = 5;

interface AbstractResponse {
    statusCode: number;
    errPayload?: any;
}

interface HttpResponse<T> extends AbstractResponse {
    data: T;
}

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

interface GetFlightsResponse {
    [key: string]: any,
    data: {
        mapIdfrom: string;
        duration: Object;
        flyTo: string;
        conversion: Object;
        mapIdto: string;
        airlines: any[];
        id: string;
        facilitated_booking_available: boolean;
        pnr_count: number;
        fly_duration: string;
        countryTo: Object;
        baglimit: Object;
        aTimeUTC: number;
        p3: number;
        price: number;
        bags_price: Object;
        cityTo: string;
        flyFrom: string;
        dTimeUTC: number;
        p2: number;
        countryFrom: Object;
        p1: number;
        dTime: number;
        found_on: any[];
        booking_token: string;
        routes: any[];
        cityFrom: string;
        aTime: number;
        route: any[];
        distance: number;
    }
}

interface GetLocationsResponse {
    locations: {
        id: string;
        int_id: number;
        active: boolean;
        code: string;
        name: string;
        slug: string;
        alternative_names: string[];
        rank: number;
        timezone: string;
        city: {
            id: string;
            name: string;
            code: string;
            slug: string;
            subdivision: any;
            country: Object;
            region: Object;
            continent: Object;
        };
        location: {lat: number; lon: number};
        alternative_departure_points: Object[];
        type: string;
    }[];
    meta: any
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
    return httpGet<GetFlightsResponse>('/flights', queryParams);
}

export function getLocations(term: string) {
    const queryParams = {term, v: 2, locale: 'en-US'};
    return httpGet<GetLocationsResponse>('/locations', queryParams);
}

function httpGet<T>(url: string, query: Object): Observable<HttpResponse<T>> {
    return Observable.fromPromise(new Promise((resolve, reject) => {
        RxHR
            .get(BASE_URL + url, {json: true, qs: query})
            .subscribe((data) => {
                if (data.response.statusCode < 400) {
                    resolve({statusCode: data.response.statusCode, data: data.response.body})
                } else {
                    reject({statusCode: data.response.statusCode, errPayload: data})
                }
            })
    }));
}

