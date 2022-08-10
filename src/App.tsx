import React from 'react';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'remixicon/fonts/remixicon.css'
import Countries from './components/Countries';

const App = () => {

  return (
    <div className="App">
     <h1 className='d-flex justify-content-center aling-items-center mt-5 mb-5'>Fintech Rest Countries</h1>
      <Countries></Countries>
    </div>
  );
}

export default App;
