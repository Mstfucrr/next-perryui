import React from 'react'

interface Props {
  params: {
    id: string
  }
}

export default function HubPage({ params }: Props) {
  return (
    <div>
      HubPage
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  )
}
