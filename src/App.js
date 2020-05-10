import React from 'react';

import Guard from './components/Guard/Guard';

function App() {
  return (

    <div className="App">
          {/* Must verify The connection of the user to show either dahsboard or Guard  */}
          {/* <Dashboard /> */}
          <Guard />

    </div>
  );
}

export default App;
