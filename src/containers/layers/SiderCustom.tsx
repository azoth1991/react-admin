import React, { FC, useState } from 'react'
import { Layout } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import routes from '../../routes/config'
import SiderMenu from './SiderMenu'
import { useMount } from 'lib/hooks'

const { Sider } = Layout

type SiderCustomProps = RouteComponentProps<any> & {
  popoverHide?: () => void
  collapsed?: boolean
}
type SiderCustomState = {
  collapsed?: boolean | undefined
  openKey: string
  firstHide: boolean | undefined
  selectedKey: string
  mode: string
}

const SiderCustom: FC<SiderCustomProps> = ({ collapsed, location, popoverHide }) => {
  const [state, setState] = useState<SiderCustomState>({
    mode: 'inline',
    openKey: '',
    selectedKey: '',
    firstHide: true // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
  })

  useMount(() => {
    if (collapsed !== state.collapsed) {
      const { pathname } = location
      setState({
        openKey: pathname.substr(0, pathname.lastIndexOf('/')),
        selectedKey: pathname,
        collapsed,
        mode: collapsed ? 'vertical' : 'inline',
        firstHide: collapsed
      })
    }
  })

  const menuClick = (e: any) => {
    setState({
      ...state,
      selectedKey: e.key
    })
    popoverHide && popoverHide()
  }
  const openMenu = (v: string[]) => {
    setState({
      ...state,
      openKey: v[v.length - 1],
      firstHide: false
    })
  }

  return (
    <Sider trigger={null} breakpoint="lg" collapsed={state.collapsed} style={{ overflowY: 'auto' }}>
      <div className="logo" />
      <SiderMenu
        menus={routes.menus}
        onClick={menuClick}
        mode="inline"
        selectedKeys={[state.selectedKey]}
        openKeys={state.firstHide ? [] : [state.openKey]}
        onOpenChange={openMenu}
      />
      <style>
        {`
                    #nprogress .spinner{
                        left: ${collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
      </style>
    </Sider>
  )
}

export default withRouter(SiderCustom)
