import { SET_SOUND, SET_SHADOWS, SET_ANIMATIONS } from '../types';

export const initialState = {
  sound: true,
  shadows: true,
  animations: true,
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
