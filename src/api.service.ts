import {RxHR} from '@akanass/rx-http-request';
import * as moment from 'moment';
import {Observable} from 'rx';
import {HttpResponse, GetFlightsQueryParameters} from './api.service.interface';
import {GetFlights, GetFlightsResponse, GetLocationsResponse} from './api.service.interface';

const BOOK_URL = 'https://www.kiwi.com/en/booking?token=';
const IMAGES_URL = 'https://images.kiwi.com';
const BASE_URL = 'https://api.skypicker.com';
const BACKGROUND_IMAGE = 'https://i0.wp.com/picjumbo.com/wp-content/uploads/HNCK2596.jpg?w=2210&quality=50';
const RESULTS_ON_PAGE = 5;

export function getFlights(flightParameters: GetFlights) {
    const {page, date, from, to} = flightParameters;
    let _page = page ? page : 1;
    const queryParams: GetFlightsQueryParameters = {
        sort: 'price',
        asc: 1,
        curr: 'EUR',
        locale: 'en',
        offset: (_page - 1) * RESULTS_ON_PAGE,
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

export function getBookUrl(token: string) {
    return `${BOOK_URL}${token}`;
}

export function getAirlineLogo(airlineCode: string) {
    return `${IMAGES_URL}/airlines/64/${airlineCode}.png`;
}

export function getCityPromoPhoto(mapIdto: string, code: string) {
    const lowerCaseCode = code.toLocaleLowerCase();
    return `${IMAGES_URL}/photos/600x330/${mapIdto}_${lowerCaseCode}.jpg`
}

export function getBackgroundImage() {
    return BACKGROUND_IMAGE;
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
