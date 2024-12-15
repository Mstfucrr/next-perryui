"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

type Props = {
    id: string
}

const fetchData = async (id : string) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    return response.data
}

function HubPage({ id }: Props) {

    const { data, isLoading, error } = useQuery({
        queryKey: ['hub', id],
        queryFn: () => fetchData(id),
        retry: 2,
        // 10 saniye sonra cache i siler ve tekrar veri çeker
        refetchInterval: 5000
    })


    return (
        <div>
            
            HubPage : 
            {id}

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                data &&
                <>
                <div>Loaded</div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                </>
            )}

            {error && (
                <div>Error: {error.message}</div>
            )}
        </div>
    )
}

export default HubPage