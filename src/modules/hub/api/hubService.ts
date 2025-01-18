import { PaginationInput } from '@/common/schema'
import { PaginatedResponse } from '@/types'
import axios from 'axios'
import { Hub } from '../types'

class HubService {
  private readonly baseUrl = '/api/hubs'
  fetchHubs = async (paginationInput: PaginationInput): Promise<PaginatedResponse<Hub>> => {
    const { offset, limit, sort, search } = paginationInput

    let url = `${this.baseUrl}?offset=${offset}&limit=${limit}&sort=${sort}`

    if (search) {
      url += `&key=${search.key}&value=${search.value}`
    }

    const response = await axios.get(url)
    return response.data
  }
}

export const hubService = new HubService()
