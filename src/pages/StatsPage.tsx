import { useState, useEffect } from 'react'

type Species = {
    name: string
    scientificName: string
}

function StatsPage() {
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

    if (loading) {
        return (
            <section id="center">
                <p>Loading Species...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section id="center">
                <p>{error}</p>
            </section>
        )
    }

    return (
        <section id="center">
            <h1>Catch Statistics</h1>
            <p>Stats page</p>

            <ul>
                {species.map((item) => (
                    <li key={item.scientificName}>
                        {item.name} - {item.scientificName}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default StatsPage