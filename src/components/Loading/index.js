import React from 'react';
import { useSelector } from 'react-redux';

import './style.css';

const Loading = () => {
  const { process } = useSelector((state) => state.loading);
  const progress = React.useRef(null);
  React.useEffect(() => {
    progress.current.style.width = `${process * 3}px`;
  }, [process]);
  return (
    <div id='loading-area'>
      <h3 className='count'>{process}%</h3>
      <div class='progress-bar' ref={progress}></div>
    </div>
  );
};

export default Loading;
