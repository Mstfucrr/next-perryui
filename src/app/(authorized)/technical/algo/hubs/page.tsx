'use client'

import { withAuthorization } from '@/context/withAuthorization'
import HubListPage from '@/modules/hub/views/HubListPage'
import { NextPage } from 'next'

const HubsPage: NextPage = () => {
  return <HubListPage />
}

export default withAuthorization(HubsPage)
