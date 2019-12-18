import { createModel } from '@rematch/core'
import { defaultState, appState } from './state'

export const app = createModel({
  state: defaultState,

  reducers: {
    modifyState(state: appState, payload: appState) {
      return { ...state, ...payload }
    }
  },
  effects: {
    // 获取行业列表
    async getChannelList(payload, state) {
      this.modifyState({ channelLoading: false })
    }
  }
})
