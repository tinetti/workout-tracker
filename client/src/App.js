import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="App-header">
            <h2>Workout Tracker</h2>
          </div>
          <PlanList/>
        </div>
    );
  }
}

class PlanList extends Component {
  render() {
    return (
        <div>Plans</div>
    )
  }
}

class Plan extends Component {
  render() {
    return (
        <div>Plan:</div>
    )
  }
}
function search(query, cb) {
  return fetch(`api/food?q=${query}`, {
    accept: "application/json"
  })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}



export default App;
