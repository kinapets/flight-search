import * as React from 'react';
import Item from './SearchResultItem';
import {Flight} from './api.service.interface';
import {Col, Row} from 'antd';

interface SearchResultsProps {
    flights: Flight[];
    loading: boolean;
}

export default (props: SearchResultsProps) => {
    return (
        <Row>
            <Col span={12} offset={6}>{resultsFactory(props)}</Col>
        </Row>
    );
}

function resultsFactory(props: SearchResultsProps) {
    if (props.flights.length === 0) {
        return <NoResults {...props}/>;
    } else {
        return <List {...props} />;
    }
}

const List = (props: SearchResultsProps) => {
    return (
        <div>
            {props.flights.map((flight: Flight, key: any) =>
                <Item loading={props.loading} key={flight.id} flight={flight} />
            )}
        </div>
    );
}

const NoResults = (props: SearchResultsProps) => {
    return (
        <div>{props.loading ? 'Loading' : 'No results'}</div>
    );
}