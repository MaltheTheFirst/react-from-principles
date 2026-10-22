import { useState, useEffect } from 'react'

type Species = {
    name: string
    scientificName: string
}

export function useSpecies() {
    const [species, setSpecies] = useState<Species[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadSpecies() {
            try {
                const response = await fetch('/species.json')

                if (!response.ok) {
                    throw new Error('Failed to load species')
                }

                const data = await response.json()

                setSpecies(data)
            } catch {
                setError('Could not load species')
            } finally {
                setLoading(false)
            }
        }

        loadSpecies()
    }, [])

    return { species, loading, error }
}