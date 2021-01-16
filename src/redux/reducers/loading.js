import { SET_LOADING_PROCESS, LOADED, SET_ERROR } from '../types';

export const initialState = {
  process: 0,
  loaded: false,
  error: false,
};

export const loading = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_PROCESS:
      return {
        ...state,
        process: action.process,
      };
    case LOADED:
      return {
        ...state,
        loaded: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
