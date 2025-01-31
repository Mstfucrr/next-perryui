'use client'

import { withAuthorization } from '@/context/withAuthorization'
import { NextPage } from 'next'

const ConfigPage: NextPage = () => {
  return <div className='container mx-auto flex w-full flex-col'>ConfigPage</div>
}

export default withAuthorization(ConfigPage)
