import * as React from 'react';
import {Card, Col, Timeline, Row} from 'antd';
import {Flight, Route} from 'api.service.interface';
import * as moment from 'moment';

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
    console.log(props.flight);

    return (

        <Card
            loading={props.loading}
            hoverable={true}
            style={{marginTop: 16}}
            title={!props.loading && formatTitle(props.flight)}
        >
            {props.flight.route.map((route, index) => <RouteTimeLine key={route.id + index} route={route} />)}
        </Card>
    );
}



const RouteTimeLine = (props: RouteTimelineProps) => {
    const {route} = props,
        {cityFrom, cityTo, aTime, dTime, airline, flyFrom, flyTo} = route;

    return (
        <Row>
            <Col span={6}>
                <AirlineLogo airlineCode={airline} />
            </Col>
            <Col span={18}>
                <Timeline>
                    <Timeline.Item>{formatTimestamp(aTime, 'h:mm')} - {cityFrom} [{flyFrom}]</Timeline.Item>
                    <Timeline.Item>{formatTimestamp(dTime, 'h:mm')} - {cityTo} [{flyTo}]</Timeline.Item>
                </Timeline>
            </Col>
        </Row>


    );
}

function formatTitle(flight: Flight) {
    const {price, fly_duration, aTime} = flight;
    return `${formatTimestamp(aTime, 'h:mm')}, ${fly_duration}, ${price} €`
}

function formatTimestamp(timestamp: number, format: string) {
    return moment(new Date(timestamp * 1000)).format(format);
}

const AirlineLogo = (props: AirlineLogoProps) => {
    const url = `https://images.kiwi.com/airlines/64/${props.airlineCode}.png`;
    return <img style={{width: 50}} src={url} />
}