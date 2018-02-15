import {getFlights} from './api.service';

describe('Api service test',() => {
    it('should call api with success status code', (done) => {
        getFlights({from: 'Paris', to: 'London', date: new Date(), page: 1})
            .subscribe((data) => {
                console.log(data.response.statusCode);
                console.log(data.response.body);
                done()
            })

    });
})
