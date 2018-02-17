import * as React from 'react';
import Item from './SearchResultItem';
import {Flight} from './api.service.interface';
import {Col, Row, Button, Card} from 'antd';
import {getBookUrl, getCityPromoPhoto} from 'api.service';
import {formatTitle} from 'utils';
const Meta = Card.Meta;

interface JourneyToBannerProps {
    flight: Flight;
}

interface SearchResultsProps {
    flights: Flight[];
    loading: boolean;
    loadingMore: boolean;
    loadMoreButtonClicked: () => void;
}

export default (props: SearchResultsProps) => {
    return (
        <Row type="flex" justify="center">
            <Col span={12} xs={24} md={12} >
                {props.flights.length > 0 && <JourneyToBanner flight={props.flights[0]} />}
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

const JourneyToBanner = (props: JourneyToBannerProps) => {
    const {flight} = props,
        {mapIdto, countryTo, cityTo, price} = flight,
        {code} = countryTo;
    return (
        <Card
            cover={<img src={getCityPromoPhoto(mapIdto, code)} />}
        >
            <Meta
                title={`Journey to ${cityTo}, ${code}`}
                description={formatTitle(flight)}
            />
            <Button
                style={{marginTop: 16}}
                type="primary"
                href={getBookUrl(props.flight.booking_token)}
            >
                Book now for {price} €
            </Button>
        </Card>
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
