'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'

const defaultConfig = {
  orders_packager_params: {
    channel_time_threshold: 3,
    customerSatisfactionOriented: false,
    distanceMultiplierForSameRoute: {
      distanceMultiplierForFarthestPointLine: 0.2,
      distanceMultiplierForOriginPointLine: 0.2
    },
    kurye_average_speed: 15,
    max_package_size: 3,
    package_order_merge_threshold: 15,
    package_time_threshold: 55,
    price_threshold: 1200,
    radiusMultiplier: 0.75,
    RestaurantDistanceThreshold: 100
  }
}

const newVariableSchema = z.object({
  name: z.string(),
  type: z.enum(['number', 'boolean', 'string', 'array', 'object']),
  value: z.any(),
  path: z.string()
})

export default function ConfigPage() {
  const [config, setConfig] = useState(defaultConfig)

  const handleAddVariable = () => {
    const newVariable = newVariableSchema.parse({
      name: 'newVariable',
      type: 'number',
      value: 10,
      path: 'orders_packager_params.newVariable'
    })

    setConfig(prev => ({ ...prev, [newVariable.path]: newVariable.value }))
  }

  useEffect(() => {
    console.log(config)
  }, [config])

  return (
    <div className='container mx-auto flex w-full flex-col'>
      <div className='flex w-full flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Algo Config</h1>
      </div>

      <div className='flex flex-col gap-4'>
        <Button onClick={handleAddVariable}>Add Variable</Button>
      </div>
    </div>
  )
}
