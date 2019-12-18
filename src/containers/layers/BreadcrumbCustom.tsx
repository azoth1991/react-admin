import React, { FC } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

type BreadcrumbCustomProps = {
  first?: string
  second?: string
}
const BreadcrumbCustom: FC<BreadcrumbCustomProps> = props => {
  const first = <Breadcrumb.Item>{props.first}</Breadcrumb.Item> || ''
  const second = <Breadcrumb.Item>{props.second}</Breadcrumb.Item> || ''
  return (
    <span>
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>
          <Link to={'/app/dashboard/index'}>首页</Link>
        </Breadcrumb.Item>
        {first}
        {second}
      </Breadcrumb>
    </span>
  )
}

export default BreadcrumbCustom
