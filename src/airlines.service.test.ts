import * as should from 'should';
import airlines from './airlines.service';

describe('Airlines service test', () => {
    it('should get all airlines', (done) => {
        const data = airlines.getSourceData();
        should(data.length).be.eql(972);
        done();
    });

    it('should get airline by code of airline', () => {
        let airline =  airlines.getByCode('7I');
        should(Boolean(airline)).be.eql(true);
        airline =  airlines.getByCode('dummy');
        should(airline).be.eql(null);
    })




});
