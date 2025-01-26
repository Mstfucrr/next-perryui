import Loading from '@/components/Loading'

type Props = {
  message: string
}

const LoadingData = ({ message }: Props) => {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center gap-4'>
      <Loading size='large' />
      <p className='text-lg font-medium text-muted-foreground'>{message}</p>
    </div>
  )
}

export default LoadingData
