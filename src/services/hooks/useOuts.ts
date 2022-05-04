import { formatDate } from '@/utils/formatDate'
import {
  QueryOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'
import { api } from '../api'

export type OutsProps = {
  id: string
  oldQuantity: number
  newQuantity: number
  quantity: number
  updatedAt: Date | string
  product: {
    name: string
  }
  createdBy: {
    name: string
  }
}

type ApiResponse = {
  outs: OutsProps[]
  totalOuts: number
}

async function getOuts(page: number): Promise<ApiResponse> {
  const { data } = await api.get<ApiResponse>('api/outs', {
    params: page,
  })

  const formatedOuts = data.outs.map((out) => ({
    ...out,
    updatedAt: formatDate(out.updatedAt),
  }))

  const formatedData = {
    totalOuts: data.totalOuts,
    outs: formatedOuts,
  }

  return formatedData
}

export function useOuts(
  page: number,
  options?: UseQueryOptions<ApiResponse>
): UseQueryResult<ApiResponse> {
  return useQuery(['outs', page], () => getOuts(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...(options as QueryOptions),
  })
}
