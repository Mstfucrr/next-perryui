import { PaginationInput } from '@/common/schema'

const appendParams = (queryParams: URLSearchParams, params: PaginationInput) => {
  Object.entries(params).forEach(([key, value]) => {
    const paramValue = typeof value === 'object' && value !== null ? value.value : value
    queryParams.append(key, paramValue.toString())
  })
}

export const urlWithParamsGenerator = (url: string, params?: PaginationInput) => {
  const queryParams = new URLSearchParams()
  if (params) appendParams(queryParams, params)
  const urlWithParams = `${url}?${queryParams.toString()}`
  console.log('urlWithParams', urlWithParams)
  return urlWithParams
}
