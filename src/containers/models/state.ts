export declare type appState = {
  auth?: any
  responsive?: any
}

export const defaultState: appState = {
  auth: {
    data: {
      permissions: false
    }
  },
  responsive: {
    data: {
      isMobile: false
    }
  }
}

export const selectAppState = (state: any) => state.app as appState
