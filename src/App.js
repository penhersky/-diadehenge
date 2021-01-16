import React from 'react';
import projection from './projection';

import { Settings, Loading } from './components';

import './App.css';

function App() {
  const [play, setPlay] = React.useState(true);
  React.useEffect(() => {
    projection();
  }, []);
  return (
    <div id='app'>
      <Settings play={play} setPlay={setPlay} />
      <Loading />
    </div>
  );
}

export default App;
