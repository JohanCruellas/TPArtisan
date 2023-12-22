import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'


class CategoryService {
  async getAll() {
    const response = await api.get(`/category`,
      { headers: new AuthHeader().getHeader() }
    )
    return response
  }
}

export default new CategoryService()