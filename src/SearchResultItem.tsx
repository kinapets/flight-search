import * as React from 'react';
import {Card, Col, Timeline, Row, Button} from 'antd';
import {Flight, Route} from 'api.service.interface';
import * as moment from 'moment';
import airlinesService from './airlines.service';

const BOOK_URL = 'https://www.kiwi.com/en/booking?token='

interface AirlineLogoProps {
    airlineCode: string;
}

interface RouteTimelineProps {
    route: Route;
}

interface SearchResultsItemProps {
    loading?: boolean;
    flight: Flight;
}

export default (props: SearchResultsItemProps) => {
    return (
        <Card
            loading={props.loading}
            hoverable={true}
            style={{marginTop: 16}}
            title={!props.loading && formatTitle(props.flight)}
        >
            {props.flight.route.map((route, index) => <RouteTimeLine key={route.id + index} route={route} />)}
            <Button type="primary" href={getBookUrl(props.flight.booking_token)}>Book now</Button>
        </Card>
    );
}

const RouteTimeLine = (props: RouteTimelineProps) => {
    const {route} = props,
        {cityFrom, cityTo, aTime, dTime, airline, flyFrom, flyTo} = route;

    return (
        <Row>
            <Col span={8}>
                <AirlineLogo airlineCode={airline} /><br/>
                <b>{airlinesService.getNameByCode(airline)}</b>
            </Col>
            <Col span={14}>
                <Timeline>
                    <Timeline.Item>
                        {formatTimestamp(aTime, 'DD. MM. YYYY - h:mm')} - {cityFrom} [{flyFrom}]
                    </Timeline.Item>
                    <Timeline.Item>
                        {formatTimestamp(dTime, 'DD. MM. YYYY - h:mm')} - {cityTo} [{flyTo}]
                    </Timeline.Item>
                </Timeline>
            </Col>
        </Row>
    );
}

const AirlineLogo = (props: AirlineLogoProps) => {
    const url = `https://images.kiwi.com/airlines/64/${props.airlineCode}.png`;
    return <img style={{width: 50}} src={url} />
}
function formatTitle(flight: Flight) {
    const {price, fly_duration, aTime} = flight;
    return `${formatTimestamp(aTime, 'DD. MM. YYYY - h:mm')}, ${fly_duration}, ${price} €`
}

function formatTimestamp(timestamp: number, format: string) {
    return moment(new Date(timestamp * 1000)).format(format);
}

function getBookUrl(token: string) {
    return `${BOOK_URL}${token}`;
}

