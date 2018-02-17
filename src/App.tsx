import * as React from 'react';
import Form from './Form';
import {SearchFormData} from './Form';
import SearchResults from './SearchResults';
import './App.css';
import 'antd/dist/antd.css';
import * as api from './api.service';
import {Flight} from 'api.service.interface';

interface AppState {
    flights: Flight[];
    loading: boolean;
    loadingMore: boolean;
    currentSearch?: {
        from: string;
        to: string;
        date: Date;
        page: number;
    }
}

class App extends React.Component {
    state: AppState = {flights: [], loading: false, loadingMore: false};

    handleSubmit = (data: SearchFormData) => {
        const {from, date, to} = data;
        this.setState({loading: true, currentSearch: {from, date, to, page: 1}});
        api.getFlights({from, date, to}).subscribe(res => {
            this.setState({flights: res.data.data, loading: false});
        })
    }

    onNextClick = () => {
        if (!this.state.currentSearch) {return};
        const {from, date, to} = this.state.currentSearch,
            nextPage = ++this.state.currentSearch.page;
        this.setState({loadingMore: true, currentSearch: {...this.state.currentSearch, page: nextPage}});
        api.getFlights({from, date, to, page: nextPage}).subscribe(res => {
            this.setState({flights: this.state.flights.concat(res.data.data), loadingMore: false});
        })
    }

    render() {
        const {loading, loadingMore, flights} = this.state;
        return (
            <div className="App">
                <Form loading={loading} handleSubmit={this.handleSubmit} />
                <SearchResults
                    loadingMore={loadingMore}
                    loading={loading}
                    flights={flights}
                    loadMoreButtonClicked={this.onNextClick}
                />
            </div>
        );
    }
}

export default App;
