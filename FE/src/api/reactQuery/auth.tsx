import { BASE_URL } from '../../constants/endpoints'
import { api } from '../../configs/AxiosConfigs'

const useLogin = async (data: any | null) => {
  try {
    const response = await api.post(`${BASE_URL}/auth/signin`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

const useRegister = async (data: any | null) => {
  try {
    const response = await api.post(`${BASE_URL}/auth/signup`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export { useLogin, useRegister }
