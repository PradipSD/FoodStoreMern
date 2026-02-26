import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const recipeApi = {
  getAll: (params) => api.get('/recipes', { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (payload) => api.post('/recipes', payload),
  update: (id, payload) => api.put(`/recipes/${id}`, payload),
  remove: (id) => api.delete(`/recipes/${id}`),
}

export default api
