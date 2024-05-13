import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { PATH } from '../constants/common'
import { Home } from '../pages/Home'
import { withPrivateRoute } from './PrivateRoute'

const LoginPage = React.lazy(() => import('../pages/Login'))
const RegisterPage = React.lazy(() => import('../pages/Register'))

const withSuspense: any = (Component: React.ComponentType) => {
  return (props: any) => (
    <Suspense
      fallback={
        <Spin style={{ position: 'absolute', top: '30%', left: '49%' }} />
      }
    >
      <Component {...props} />
    </Suspense>
  )
}

export const routes_layout: RouteObject[] = [
  {
    path: PATH.HOME,
    element: withPrivateRoute(Home)()
  },
  {
    path: PATH.LOGIN,
    element: withSuspense(LoginPage)()
  },
  {
    path: PATH.REGISTER,
    element: withSuspense(RegisterPage)()
  }
]
