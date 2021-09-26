import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Tabs from './Tabs.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
       <Tabs/>
      </div>

    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
