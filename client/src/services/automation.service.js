import api from '../utils/axios'

export const getAllAutomations = async () => {
  const res = await api.get('/api/auto')
  return res.data
}

export const getAutomation = async (id) => {
  const res = await api.get(`/api/auto/${id}`)
  return res.data
}

export const createAutomation = async (formData) => {
  await api.post('/api/auto', formData)
}

export const updateAutomation = async (id, formData) => {
  await api.patch(`/api/auto/${id}`, formData)
}

export const deleteAutomation = async (id) => {
  await api.delete(`/api/auto/${id}`)
}