import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'

class FurnitureService {
    async getAll() {
        const response = await api.get(`/furniture`, {
            headers: new AuthHeader().getHeader()
        })
        return response
    }

    async create(data) {
        const response = await api.post(`/furniture`, data, {
            headers: new AuthHeader().getHeader()
        })
        return response
    }

    async update(id, data) {
        const response = await api.put(`/furniture/${id}`, data, {
            headers: new AuthHeader().getHeader()
        })
        return response
    }

}

export default new FurnitureService()