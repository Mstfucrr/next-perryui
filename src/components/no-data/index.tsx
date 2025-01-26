import { LucideInbox } from 'lucide-react'

type NoDataProps = {
  emptyMessage?: string
  emptyDescription?: string
  emptyChildren?: React.ReactNode
}

const NoData = ({ emptyMessage, emptyDescription, emptyChildren }: NoDataProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
      <LucideInbox size={48} className='mb-4 opacity-50' />
      {emptyMessage && <p className='text-lg font-medium'>{emptyMessage}</p>}
      {emptyDescription && <p className='text-sm'>{emptyDescription}</p>}
      {!emptyMessage && !emptyDescription && <p className='text-sm'>No data found</p>}
      {emptyChildren}
    </div>
  )
}

export default NoData
