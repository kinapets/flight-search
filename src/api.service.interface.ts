
export interface AbstractResponse {
    statusCode: number;
    errPayload?: Object;
}

export interface HttpResponse<T> extends AbstractResponse {
    data: T;
}

export interface GetFlights {
    date: Date;
    from: string;
    to: string;
    page?: number;
}

export interface GetFlightsQueryParameters {
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

export interface GetFlightsResponse {
    [key: string]: Object;
    data: Flight[];
}

export interface Flight {
    mapIdfrom: string;
    duration: Object;
    flyTo: string;
    conversion: Object;
    mapIdto: string;
    airlines: Object[];
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
    found_on: Object[];
    booking_token: string;
    routes: Object[];
    cityFrom: string;
    aTime: number;
    route: Object[];
    distance: number;
}

export interface GetLocationsResponse {
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
            subdivision: Object;
            country: Object;
            region: Object;
            continent: Object;
        };
        location: {lat: number; lon: number};
        alternative_departure_points: Object[];
        type: string;
    }[];
    meta: Object;
}