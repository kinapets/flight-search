import * as React from 'react';
import Item from './SearchResultItem';
import {Flight} from './api.service.interface';

interface SearchResultsProps {
    flights: Flight[];
}

export default (props: SearchResultsProps) => {

    return (
        <ul>
           {props.flights.map((flight:Flight, key:any) => {return (<Item key={flight.id} flight={flight}/>)})}
        </ul>
    );
}