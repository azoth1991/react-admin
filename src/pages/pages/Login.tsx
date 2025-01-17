/**
 * Created by hao.cheng on 2017/4/16.
 */
import React, { FC, useEffect } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { useSelector, useDispatch, useMount } from 'lib/hooks'
import { selectAppState } from 'containers/models/state'
import { createSelector } from 'reselect'
import { PwaInstaller } from '../widget'
import { RouteComponentProps } from 'react-router'
import { FormProps } from 'antd/lib/form'
const FormItem = Form.Item
type LoginProps = {
  setAlitaState: (param: any) => void
  auth: any
} & RouteComponentProps &
  FormProps

const selectState = createSelector(selectAppState, ({ auth, responsive }) => ({ auth, responsive }))

const Login: FC<LoginProps> = props => {
  const { form } = props
  const { auth = { data: {} }, responsive = { data: {} } } = useSelector(selectState)
  const dispatch = useDispatch()

  useMount(() => {
    dispatch.app.modifyState({
      auth: {
        data: null
      }
    })
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form!.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        if (values.userName === 'admin' && values.password === 'admin')
          dispatch.app.modifyState({
            auth: {
              funcName: 'admin'
            }
          })
        if (values.userName === 'guest' && values.password === 'guest')
          dispatch.app.modifyState({
            auth: {
              funcName: 'guest'
            }
          })
      }
    })
  }
  const gitHub = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin'
  }

  const { getFieldDecorator } = form!
  return (
    <div className="login">
      <div className="login-form">
        <div className="login-logo">
          <span>React Admin</span>
          <PwaInstaller />
        </div>
        <Form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>记住我</Checkbox>)}
            <span className="login-form-forgot" style={{ float: 'right' }}>
              忘记密码
            </span>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
              登录
            </Button>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>或 现在就去注册!</span>
              <span onClick={gitHub}>
                <Icon type="github" />
                (第三方登录)
              </span>
            </p>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default Login
