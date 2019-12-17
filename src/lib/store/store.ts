import { init, RematchRootState, ModelConfig } from '@rematch/core';
import { RouterState } from 'connected-react-router';
import { createHashHistory } from 'history';
import createLoadingPlugin from '@rematch/loading';
import routerPlugin from './routerPlugin';
import models from 'models';

const loadingPlugin = createLoadingPlugin({});
export const history = createHashHistory();

/**
 * 初始化Store，定义Dispatch类型方便dispatch链式调用
 */
const store = init({
    models,
    plugins: [routerPlugin(history), loadingPlugin],
    redux: {
        middlewares: [],
    },
});

declare type Models = typeof models;
interface LoadingPlugin<M extends { [key: string]: ModelConfig }> {
    loading: {
        models: Record<keyof M, boolean>;
        effects: { [key in keyof M]: Record<keyof M[key]['effects'], boolean> };
    };
}

export default store;
export type Dispatch = typeof store.dispatch;
export type RootState = RematchRootState<typeof models> & LoadingPlugin<Models>;
export const selectLoadingState = (state: any) => state.loading as LoadingPlugin<Models>['loading'];
export const selectRouterState = (state: any) => state.router as RouterState;
