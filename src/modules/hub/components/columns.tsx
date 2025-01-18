import { ColumnDef } from '@tanstack/react-table'
import { Hub } from '../types'

export const columns: ColumnDef<Hub>[] = [
  { header: 'ID', accessorKey: 'id' },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Location', accessorKey: 'location' }
]
