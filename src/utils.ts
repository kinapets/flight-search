import {Flight} from './api.service.interface';
import * as moment from 'moment';

export function formatTitle(flight: Flight) {
    const {price, fly_duration, aTime} = flight;
    return `${formatTimestamp(aTime, 'DD. MM. YYYY - h:mm')}, ${fly_duration}, ${price} €`
}

export function formatTimestamp(timestamp: number, format: string) {
    return moment(new Date(timestamp * 1000)).format(format);
}