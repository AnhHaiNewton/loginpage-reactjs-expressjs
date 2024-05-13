import { useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_ITEM, PATH } from '../constants/common'
import { Button } from 'antd'

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Home page</h1>
      <Button
        onClick={() => {
          localStorage.removeItem(LOCAL_STORAGE_ITEM.TOKEN)
          navigate(PATH.LOGIN)
        }}
      >
        Logout
      </Button>
    </div>
  )
}
