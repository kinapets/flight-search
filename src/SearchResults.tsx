import * as React from 'react';
import Item from './SearchResultItem';
import {Flight} from './api.service.interface';
import {Col, Row, Button} from 'antd';

interface SearchResultsProps {
    flights: Flight[];
    loading: boolean;
    loadingMore: boolean;
    loadMoreButtonClicked: () => void;
}

export default (props: SearchResultsProps) => {
    return (
        <Row>
            <Col span={12} offset={6}>
                <List {...props} />
                {props.flights.length > 0 &&
                    <Button
                        style={{marginTop: 16, marginBottom: 16}}
                        loading={props.loadingMore}
                        onClick={props.loadMoreButtonClicked}
                    >
                        Load more...
                    </Button>
                }
            </Col>
        </Row>
    );
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
