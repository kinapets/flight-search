import * as React from 'react';
import Form from './Form';
import {SearchFormData} from './Form';
import SearchResults from './SearchResults';
import './App.css';
import 'antd/dist/antd.css';
import * as api from './api.service';
// import {GetFlightsResponse} from './api.service.interface';

class App extends React.Component {
    state = {flights: [], loading: false};

    handleSubmit = (data: SearchFormData) => {
        const {from, date, to} = data;
        this.setState({loading: true});
        api.getFlights({from, date, to}).subscribe(res => {
            this.setState({flights: res.data.data, loading: false});
        })
    }

    render() {
        return (
            <div className="App">
                <Form handleSubmit={this.handleSubmit} />
                <SearchResults loading={this.state.loading} flights={this.state.flights}/>
            </div>
        );
    }
}

export default App;
