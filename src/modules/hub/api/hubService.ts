import { PaginationInput } from '@/common/schema'
import { PaginatedResponse } from '@/types'
import axios from 'axios'
import { Hub } from '../types'
import { urlWithParamsGenerator } from '@/utils'

class HubService {
  private readonly baseUrl = '/api/hubs'
  fetchHubs = async (paginationInput?: PaginationInput): Promise<PaginatedResponse<Hub>> => {
    const url = urlWithParamsGenerator(this.baseUrl, paginationInput)
    const response = await axios.get(url)
    return response.data
  }
}

export const hubService = new HubService()
