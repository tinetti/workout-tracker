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

function findPlans(query, cb) {
  return fetch(`api/food?q=${query}`, {
    accept: "application/json"
  })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb);
}


export default App;
