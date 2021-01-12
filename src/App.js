import React from 'react';
import projection from './projection';

import { Settings } from './components';

import './App.css';

function App() {
  const [play, setPlay] = React.useState(true);
  React.useEffect(() => {
    projection();
  }, []);
  return (
    <div id='app'>
      <Settings play={play} setPlay={setPlay} />
    </div>
  );
}

export default App;
