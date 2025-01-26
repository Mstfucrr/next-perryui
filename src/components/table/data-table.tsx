'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { Skeleton } from '../ui/skeleton'

const DataTableLoading = <TData, TValue>({ columns }: { columns: ColumnDef<TData, TValue>[] }) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={index}>
      {columns.map((_, index) => (
        <TableCell key={index}>
          <Skeleton className='h-6 w-full' />
        </TableCell>
      ))}
    </TableRow>
  ))
}

const DataTableEmpty = <TData, TValue>({ columns }: { columns: ColumnDef<TData, TValue>[] }) => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className='h-24 text-center'>
        No results.
      </TableCell>
    </TableRow>
  )
}

const DataTableContent = <TData, TValue>({
  columns,
  data,
  children,
  isLoading
}: {
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | undefined
  children: React.ReactNode
  isLoading: boolean
}) => {
  if (isLoading) return <DataTableLoading columns={columns} />
  if (data?.length === 0) return <DataTableEmpty columns={columns} />
  return <>{children}</>
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | undefined
  isLoading: boolean
}

export function DataTable<TData, TValue>({ columns, data, isLoading }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true
  })

  return (
    <div className='rounded-md border'>
      <Table size='sm'>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} style={{ width: header.getSize() }}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <DataTableContent columns={columns} data={data} isLoading={isLoading}>
            {table.getRowModel().rows?.length > 0 &&
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
          </DataTableContent>
        </TableBody>
      </Table>
    </div>
  )
}
