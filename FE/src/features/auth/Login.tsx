// External dependencies

import { Button, Form, Input, message } from 'antd'

import './style/style.css'
import { LOCAL_STORAGE_ITEM, PATH } from '../../constants/common'
import { useLogin } from '../../api/reactQuery/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { checkTokenAndRedirect } from '../../utils/handleCookie'

const Login = () => {
  const navigate = useNavigate()
  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: useLogin
  })
  const onFinish = (values: any) => {
    mutateLogin(values, {
      onSuccess: (data) => {
        localStorage.setItem(LOCAL_STORAGE_ITEM.TOKEN, data.token)
        message.success('Login successfully!')
        navigate(PATH.HOME)
      },
      onError: (error: any) => {
        let msg = error?.response?.data?.message
        message.error(msg || 'Error login!')
      }
    }) // Gọi hàm mutateRegister khi form được hoàn thành
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    if (checkTokenAndRedirect()) {
      navigate(PATH.HOME)
    }
  }, [])
  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='illustration-wrapper'>
          <img
            src='https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700'
            alt='Login'
          />
        </div>
        <Form
          name='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className='form-title'>Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <p>
            You don't have an account yet? <a href={PATH.REGISTER}>Register</a>
          </p>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              loading={isPending}
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export { Login }
