import React from "react";
import './App.css';
import Header from './Header.js';
import Tabs from './Tabs.js';


function App() {
  return (

    <div className="app">
      <div className='container'>
        <Header/>
        <div className="container-view">
        <Tabs/>
        </div>

      </div>
    </div>
    
  );
}



export default App;
