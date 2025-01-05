'use client'

import React, { useMemo, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortableHeader
} from '@/components/ui/table'
import { ChevronDown, ChevronUp, Loader2Icon, RefreshCcwIcon, SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

type Hub = {
  id: string
  name: string
  location: string
}

type PaginatedResponse<T> = {
  rows: T[]
  count: number
}

type PaginationInput = {
  limit: number
  offset: number
  sort: 'asc' | 'desc'
  search?: { key: string; value: string }
}

const fetchHubs = async (paginationInput: PaginationInput): Promise<PaginatedResponse<Hub>> => {
  let url = `/api/hubs?offset=${paginationInput.offset}&limit=${paginationInput.limit}&sort=${paginationInput.sort}`

  if (paginationInput.search) {
    url += `&key=${paginationInput.search?.key}&value=${paginationInput.search?.value}`
  }

  const response = await axios.get(url)
  return response.data
}

const pageSizeOptions = [10, 20, 30, 40, 50]

const HubListPage = () => {
  const [paginationInput, setPaginationInput] = useState<PaginationInput>({
    limit: 10,
    offset: 0,
    sort: 'asc',
    search: undefined
  })

  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<Hub>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('location', {
        header: 'Location',
        cell: info => info.getValue()
      })
    ],
    [columnHelper]
  )

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } = useInfiniteQuery({
    queryKey: ['hubs', paginationInput],
    queryFn: ({ pageParam = 0 }) =>
      fetchHubs({ ...paginationInput, offset: pageParam, search: paginationInput.search }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * paginationInput.limit
      return nextOffset < lastPage.count ? nextOffset : undefined
    },
    initialPageParam: 0
  })

  const flatData = useMemo(() => data?.pages.flatMap(page => page.rows) ?? [], [data])

  const totalCount = data?.pages[0]?.count ?? 0

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalCount / paginationInput.limit)
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaginationInput(prev => ({ ...prev, search: { key: 'name', value: e.target.value } }))
  }

  return (
    <div className='container mx-auto'>
      <h1 className='mb-4 text-2xl font-bold'>Hub List</h1>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Select
            value={paginationInput.limit.toString()}
            onValueChange={value => setPaginationInput(prev => ({ ...prev, limit: Number(value), offset: 0 }))}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select page size' />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map(option => (
                <SelectItem key={option} value={option.toString()}>
                  {option} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder='Search'
            value={paginationInput.search?.value}
            Icon={SearchIcon}
            iconPosition='right'
            onChange={handleSearch}
          />
        </div>

        <Button onClick={() => refetch()} disabled={isRefetching} size='icon'>
          {isRefetching ? <Loader2Icon className='h-4 w-4 animate-spin' /> : <RefreshCcwIcon className='h-4 w-4' />}
        </Button>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <TableSortableHeader
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none flex items-center' : '',
                          onClick: header.column.getToggleSortingHandler()
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUp className='ml-2 h-4 w-4' />,
                          desc: <ChevronDown className='ml-2 h-4 w-4' />
                        }[header.column.getIsSorted() as string] ?? null}
                      </TableSortableHeader>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='mt-4 flex justify-center'>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          variant={!hasNextPage ? 'outline' : 'default'}
        >
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
        </Button>
      </div>
    </div>
  )
}

export default HubListPage
