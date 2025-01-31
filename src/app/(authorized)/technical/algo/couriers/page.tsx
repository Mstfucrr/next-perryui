'use client'
import { withAuthorization } from '@/context/withAuthorization'
import { NextPage } from 'next'
import Head from 'next/head'

const CourierPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kuryeler</title>
      </Head>
      <div className='container mx-auto flex w-full flex-col'>Kuryelerasd</div>
    </>
  )
}

export default withAuthorization(CourierPage)
