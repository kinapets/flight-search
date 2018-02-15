import {getFlights, getLocations} from './api.service';
import * as should from 'should';

describe('Api service test', () => {
    describe('Flights', () => {
        it('should call api with success status code', (done) => {
            getFlights({from: 'Paris', to: 'London', date: new Date('2018-02-13'), page: 1})
                .subscribe((res) => {
                    should(res.statusCode).be.eql(200);
                    should(res).have.property('statusCode');
                    should(res).have.property('data');
                    should(res.data).have.property('data');
                    done();
                });
        });

        it('should call api with 500 status code', (done) => {
            getFlights({from: 'Paris', to: 'London', date: new Date('xxx'), page: 1})
                .subscribe((res) => {return undefined;}, (err) => {
                    should(err.statusCode).be.eql(500);
                    should(err).have.property('statusCode');
                    should(err).have.property('errPayload');
                    done();
                });
        });
    });

    describe('Locations', () => {

        it('should call api with 500 status code', (done) => {
            getLocations('Prague')
                .subscribe((res) => {
                    res.should.have.property('statusCode');
                    res.should.have.property('data');
                    res.data.should.have.property('locations');
                    done();
                });
        });
    });
});
