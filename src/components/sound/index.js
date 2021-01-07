import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { SET_SOUND } from '../../redux/types';

import './style.css';

const Sound = (props) => {
  const dispatch = useDispatch();
  const { sound } = useSelector((state) => state.settings);

  const onChangeSound = () => {
    dispatch({
      type: SET_SOUND,
      sound: !sound,
    });
  };

  return (
    <div onClick={onChangeSound} className='sound'>
      {sound ? (
        <Icon
          icon={IconNames.VOLUME_UP}
          iconSize={30}
          className='icon'
          color='#CECECE'
        />
      ) : (
        <Icon
          icon={IconNames.VOLUME_OFF}
          iconSize={30}
          className='icon'
          color='#CECECE'
        />
      )}
    </div>
  );
};

export default Sound;
