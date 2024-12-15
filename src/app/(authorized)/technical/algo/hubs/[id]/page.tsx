import HubPage from '@/modules/hub/views/hub'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}


export default function Page({ params }: Props) {
  return <HubPage id={params.id} />
}
