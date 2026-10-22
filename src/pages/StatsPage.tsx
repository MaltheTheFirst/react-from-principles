import { useState, useEffect } from 'react'

type Species = {
    name: string
    scientificName: string
}

function StatsPage() {
    const [species, setSpecies] = useState<Species[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadSpecies() {
            const response = await fetch('/species.json')
            const data = await response.json()

            setSpecies(data)
            setLoading(false)
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