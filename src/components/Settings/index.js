import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import {
  SET_SOUND,
  SET_ANIMATIONS,
  SET_SHADOWS,
  SET_FOG,
} from '../../redux/types';

import './style.css';

const Sound = (props) => {
  const dispatch = useDispatch();
  const { sound, animations, shadows, fog } = useSelector(
    (state) => state.settings,
  );

  const onChangeSound = () => {
    dispatch({
      type: SET_SOUND,
      sound: !sound,
    });
  };
  const onChangeAnimation = () => {
    dispatch({
      type: SET_ANIMATIONS,
      animations: !animations,
    });
  };
  const onChangeShadows = () => {
    dispatch({
      type: SET_SHADOWS,
      shadows: !shadows,
    });
  };
  const onChangeFog = () => {
    dispatch({
      type: SET_FOG,
      fog: !fog,
    });
  };
  const MyIcon = ({ icon }) => (
    <Icon icon={icon} iconSize={30} className='icon' color='#CECECE' />
  );

  return (
    <div className='settings'>
      <div onClick={onChangeFog} className='option'>
        {fog ? (
          <MyIcon icon={IconNames.CLOUD} />
        ) : (
          <MyIcon icon={IconNames.CLOUD_DOWNLOAD} />
        )}
      </div>
      <div onClick={onChangeShadows} className='option'>
        {shadows ? (
          <MyIcon icon={IconNames.INNER_JOIN} />
        ) : (
          <MyIcon icon={IconNames.INTERSECTION} />
        )}
      </div>
      <div onClick={onChangeAnimation} className='option'>
        {animations ? (
          <MyIcon icon={IconNames.PAUSE} />
        ) : (
          <MyIcon icon={IconNames.PLAY} />
        )}
      </div>
      <div onClick={onChangeSound} className='option'>
        {sound ? (
          <MyIcon icon={IconNames.VOLUME_UP} />
        ) : (
          <MyIcon icon={IconNames.VOLUME_OFF} />
        )}
      </div>
    </div>
  );
};

export default Sound;
