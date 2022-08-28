import httpClient from '@/services/httpClient.service'
import CONST from '@/services/constant'

export default {
  // get list rank
  async getList(query = {}) {
    return await httpClient
      .get(CONST.API.RANK_LIST, { params: query })
      .then((response) => {
        return response?.payload
      })
  },

  // add rank
  async add(rank) {
    return await httpClient.post(CONST.API.RANK_ADD, rank).then((response) => {
      return response?.payload
    })
  },

  // update rank
  async update(id, rank) {
    return await httpClient
      .put(CONST.API.RANK_UPDATE(id), rank)
      .then((response) => {
        return response?.payload
      })
  },
}
