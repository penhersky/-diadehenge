import * as three from 'three';

import store from '../redux/store';
import { SET_LOADING_PROCESS, SET_ERROR, LOADED } from '../redux/types';

const manager = new three.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  store.dispatch({
    type: SET_LOADING_PROCESS,
    process: Math.floor((itemsLoaded / itemsTotal) * 100),
  });
};

manager.onLoad = function () {
  store.dispatch({
    type: LOADED,
  });
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  store.dispatch({
    type: SET_LOADING_PROCESS,
    process: Math.floor((itemsLoaded / itemsTotal) * 100),
  });
};

manager.onError = function (url) {
  store.dispatch({
    type: SET_ERROR,
  });
  console.log('There was an error loading ' + url);
};

export default manager;
