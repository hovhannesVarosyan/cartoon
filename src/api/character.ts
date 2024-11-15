import type { ISendData } from '@/models'
import client from './client'

export default {
  async list(sendData: ISendData) {
    const { url, params } = sendData
    return client.get(url, { params })
  }
}
