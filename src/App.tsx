import * as React from 'react';
import Form from './Form';
import {SearchFormData} from './Form';
import SearchResults from './SearchResults';
import './App.css';
import 'antd/dist/antd.css';
import * as api from './api.service';
// import {GetFlightsResponse} from './api.service.interface';

class App extends React.Component {
    state = {flights: []};

    handleSubmit = (data: SearchFormData) => {
        const {from, date, to} = data;
        api.getFlights({from, date, to}).subscribe(res => {
            this.setState({flights: res.data.data});

        })
    }

    render() {
        return (
            <div className="App">
                <Form handleSubmit={this.handleSubmit} />
                <SearchResults flights={this.state.flights}/>
            </div>
        );
    }
}

export default App;
