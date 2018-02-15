import * as React from 'react';
import Form from './Form';
import './App.css';
import 'antd/dist/antd.css';

class App extends React.Component {
  handleSubmit(data: any) {
    console.log(data)
  }

  render() {
    return (
      <div className="App">
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
