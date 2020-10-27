import React from 'react'
import './App.css';

import Jobs from './Jobs';

const mockJobs = [
  {title: "SWE1", company: "Google"},
  {title: "SWE1", company: "Facebook"},
  {title: "SWE1", company: "Apple"}, 
  {title: "SWE1", company: "Uber"}
]

function App() {
  return (
    <div className="App">
      <Jobs jobs = {mockJobs} />

    </div>
  );
}

export default App;
