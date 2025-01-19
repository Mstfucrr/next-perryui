import { DeleteButton } from '@/components/buttons/DeleteButton'
import { EditButton } from '@/components/buttons/EditButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Hub } from '../types'

export const columns: ColumnDef<Hub>[] = [
  { header: 'ID', accessorKey: 'id', size: 5 },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Location', accessorKey: 'location' },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    size: 100,
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt)
      return <span>{Intl.DateTimeFormat('tr-TR', { dateStyle: 'long', timeStyle: 'short' }).format(createdAt)}</span>
    }
  },
  {
    header: 'Actions',
    size: 5,
    cell: ({ row }) => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='flex w-auto flex-col gap-3 p-2'>
            <EditButton onEdit={() => {}} />
            <DeleteButton onDelete={() => {}} />
          </PopoverContent>
        </Popover>
      )
    }
  }
]
