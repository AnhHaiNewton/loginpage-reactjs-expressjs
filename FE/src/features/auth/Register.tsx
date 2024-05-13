// External dependencies
import { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import './style/style.css'
import { LOCAL_STORAGE_ITEM, PATH } from '../../constants/common'
import { useMutation } from '@tanstack/react-query'
import { useRegister } from '../../api/reactQuery/auth'
import { useNavigate } from 'react-router-dom'
import { checkTokenAndRedirect } from '../../utils/handleCookie'

const Register = () => {
  const navigate = useNavigate()
  const { mutate: mutateRegister, isPending } = useMutation({
    mutationFn: useRegister
  })

  const onFinish = (values: any) => {
    mutateRegister(values, {
      onSuccess: (data) => {
        localStorage.setItem(LOCAL_STORAGE_ITEM.TOKEN, data.token)
        message.success('Register successfully!')
        navigate(PATH.HOME)
      },
      onError: (error: any) => {
        let msg = error?.response?.data?.message
        message.error(msg || 'Error login!')
      }
    })
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
          layout='vertical'
          name='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish} // Gọi hàm onFinish khi form được hoàn thành
          onFinishFailed={onFinishFailed} // Gọi hàm onFinishFailed khi form gặp lỗi
        >
          <p className='form-title'>Register</p>
          <p>Create new account to use our Website</p>
          <Form.Item
            label='Username' // Thêm label cho field
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='Username' />
          </Form.Item>

          <Form.Item
            label='Password' // Thêm label cho field
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item
            label='Confirm Password' // Thêm label cho field
            name='confirmPassword'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Confirm Password' />
          </Form.Item>

          <p>
            Do you already have an account? <a href={PATH.LOGIN}>Login</a>
          </p>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              loading={isPending}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export { Register }
