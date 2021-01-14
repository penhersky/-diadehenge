import { SET_SOUND, SET_SHADOWS, SET_ANIMATIONS } from '../types';

const isProd = process.env.NODE_ENV === 'production';

export const initialState = {
  sound: isProd,
  shadows: isProd,
  animations: isProd,
};

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOUND:
      return {
        ...state,
        sound: action.sound,
      };
    case SET_SHADOWS:
      return {
        ...state,
        shadows: action.shadows,
      };
    case SET_ANIMATIONS:
      return {
        ...state,
        animations: action.animations,
      };
    default:
      return state;
  }
};
