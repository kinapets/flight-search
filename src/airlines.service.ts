import * as airlinesDataSource from './airlines.json'
import * as _ from 'lodash';

interface AirlineModel {
    id: string;
    lcc: string;
    name: string;
}

class AirlineService {
    private data: {[id: string]: AirlineModel};

    constructor(data: AirlineModel[]) {
        this.data = {};
        data.map(airline => this.data[airline.id] = airline);
    }

    getNameByCode(code: string) {
        const airline = this.getByCode(code);
        return airline ? airline.name : null;
    }

    getByCode(code: string) {
        const airline = this.data[code];
        return airline || null;
    }

    getSourceData() {
        return _.map(this.data);
    }
}


export default new AirlineService(<any>airlinesDataSource);