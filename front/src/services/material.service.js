import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'

class MaterialService {
  async getAll() {
    const response = await api.get(`/material`, {
      headers: new AuthHeader().getHeader()
    })
    return response
  } 
}

export default new MaterialService()