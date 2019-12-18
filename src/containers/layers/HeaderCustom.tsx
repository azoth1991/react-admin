/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component, FC, useState } from 'react'
import screenfull from 'screenfull'
import avater from 'asset/style/imgs/b1.jpg'
import SiderCustom from './SiderCustom'
import { Menu, Icon, Layout, Badge, Popover } from 'antd'
import { gitOauthToken, gitOauthInfo } from 'lib/request'
import { useSelector, useDispatch } from 'lib/hooks'
import { createSelector } from 'reselect'

import { selectAppState } from 'containers/models/state'
import { PwaInstaller } from '../../pages/widget'
const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

type HeaderCustomProps = {
  toggle: () => void
  collapsed: boolean
  user: any
  responsive?: any
  path?: string
}
type HeaderCustomState = {
  user: any
  visible: boolean
}

const selectState = createSelector(selectAppState, ({ auth, responsive }) => ({ auth, responsive }))
export const HeaderCustom: FC<HeaderCustomProps> = props => {
  const { collapsed, toggle, user } = props
  const { auth = { data: {} }, responsive = { data: {} } } = useSelector(selectState)
  const [visible, setVisible] = useState(false)

  const screenFull = () => {
    if (screenfull.isEnabled) {
      screenfull.request()
    }
  }
  const menuClick = (e: { key: string }) => {
    e.key === 'logout' && logout()
  }
  const logout = () => {
    localStorage.removeItem('user')
    // history.push('/login')
  }

  return (
    <Header className="custom-theme header">
      {responsive.data.isMobile ? (
        <Popover
          content={
            <SiderCustom
              popoverHide={() => {
                setVisible(false)
              }}
            />
          }
          trigger="click"
          placement="bottomLeft"
          visible={visible}
          onVisibleChange={setVisible}
        >
          <Icon type="bars" className="header__trigger custom-trigger" />
        </Popover>
      ) : (
        <Icon className="header__trigger custom-trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
      )}
      <Menu mode="horizontal" style={{ lineHeight: '64px', float: 'right' }} onClick={menuClick}>
        <Menu.Item key="pwa">
          <PwaInstaller />
        </Menu.Item>
        <Menu.Item key="full" onClick={screenFull}>
          <Icon type="arrows-alt" onClick={screenFull} />
        </Menu.Item>
        <Menu.Item key="1">
          <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
            <Icon type="notification" />
          </Badge>
        </Menu.Item>
        <SubMenu
          title={
            <span className="avatar">
              <img src={avater} alt="头像" />
              <i className="on bottom b-white" />
            </span>
          }
        >
          <MenuItemGroup title="用户中心">
            <Menu.Item key="setting:1">你好 - {user.userName}</Menu.Item>
            <Menu.Item key="setting:2">个人信息</Menu.Item>
            <Menu.Item key="logout">
              <span onClick={logout}>退出登录</span>
            </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="设置中心">
            <Menu.Item key="setting:3">个人设置</Menu.Item>
            <Menu.Item key="setting:4">系统设置</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    </Header>
  )
}

export default HeaderCustom
