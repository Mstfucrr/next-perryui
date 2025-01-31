'use client'
import { withAuthorization } from '@/context/withAuthorization'
import { NextPage } from 'next'

const OrdersPage: NextPage = () => {
  return <div className='container mx-auto flex w-full flex-col'>Orders Page</div>
}

export default withAuthorization(OrdersPage)
