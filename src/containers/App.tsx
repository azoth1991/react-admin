import React, { Component, FC, useEffect, useState } from 'react'
import Routes from 'routes'
import DocumentTitle from 'react-document-title'
import SiderCustom from 'containers/layers/SiderCustom'
import HeaderCustom from 'containers/layers/HeaderCustom'
import { useSelector, useDispatch, useMount } from 'lib/hooks'
import { selectAppState } from './models/state'
import { createSelector } from 'reselect'

import { Layout, notification, Icon } from 'antd'
import { ThemePicker } from 'pages/widget'

import { checkLogin } from 'lib/utils'

const { Content, Footer } = Layout

type AppProps = {
  auth: any
  responsive: any
}

const selectState = createSelector(selectAppState, ({ auth, responsive }) => ({ auth, responsive }))

export const App: FC<AppProps> = props => {
  const [title, setTitle] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const { auth = { data: {} }, responsive = { data: {} } } = useSelector(selectState)
  const dispatch = useDispatch()

  const getClientWidth = () => {
    // 获取当前浏览器宽度并设置responsive管理响应式
    const clientWidth = window.innerWidth
    dispatch.app.modifyState({ responsive: { stateName: 'responsive', data: { isMobile: clientWidth <= 992 } } })
  }

  useMount(() => {
    let user,
      storageUser = localStorage.getItem('user')
    user = (storageUser && JSON.parse(storageUser)) || {}
    dispatch.app.modifyState({
      auth: {
        data: user
      }
    })

    getClientWidth()
    window.onresize = () => {
      console.log('屏幕变化了')
      getClientWidth()
    }
  })

  return (
    <DocumentTitle title={title}>
      <Layout>
        {!responsive.data.isMobile && checkLogin(auth.data.permissions) && <SiderCustom collapsed={collapsed} />}
        <ThemePicker />
        <Layout style={{ flexDirection: 'column' }}>
          <HeaderCustom
            toggle={() => {
              setCollapsed(!collapsed)
            }}
            collapsed={collapsed}
            user={auth.data || {}}
          />
          <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
            <Routes auth={auth} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>React-Admin ©{new Date().getFullYear()} Created by 865470087@qq.com</Footer>
        </Layout>
      </Layout>
    </DocumentTitle>
  )
}

export default App
