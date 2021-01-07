import React from 'react';
import projection from './projection';

import { Sound } from './components';

import './App.css';

function App() {
  const [play, setPlay] = React.useState(true);
  React.useEffect(() => {
    projection();
  }, []);
  return (
    <div id='app'>
      <Sound play={play} setPlay={setPlay} />
    </div>
  );
}

export default App;
