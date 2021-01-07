import { SET_SOUND } from '../types';

export const initialState = {
  sound: true,
};

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOUND:
      return {
        ...state,
        sound: action.sound,
      };
    default:
      return state;
  }
};
