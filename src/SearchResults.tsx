import * as React from 'react';
// import {GetFlightsResponse} from './api.service.interface'

// interface SearchResultsProps {
//     flights: GetFlightsResponse;
// }

export default (props: any) => {
    console.log(props);

    return (
        <ul>
           {props.flights.map((value:any, key:any) => {return (<li key={key}>tesagdas</li>)})}
            {/* {props.flights.map((flight) => {
                return flight.cityFrom
            })} */}
        </ul>
    );
}