import { Plugin } from '@rematch/core';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { combineReducers, ReducersMapObject } from 'redux';

function combineReducersWithRouter(history: any) {
  return (reducers: ReducersMapObject) => {
    const r = { router: connectRouter(history), ...reducers };
    return combineReducers(r);
  };
}

/**
 * Wrapper Connected-React-Router as a Plugin
 * @param history Browser History
 */
const routerPlugin = (history: any): Plugin => ({
  config: {
    redux: {
      combineReducers: combineReducersWithRouter(history),
    },
  },
  middleware: routerMiddleware(history),
});

export default routerPlugin;
