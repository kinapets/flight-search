import {getFlights} from './api.service';

describe('Api service test',() => {
    it('get flights', (done) => {
        getFlights({flyFrom: 'Prague', to: 'Paris', dateFrom: '16/2/2018', dateTo: '16/2/2018'})
            .subscribe((data) => {
                console.log(data.response.statusCode === 200);
                console.log(data.response.body);
                done()
            })

    });
})
