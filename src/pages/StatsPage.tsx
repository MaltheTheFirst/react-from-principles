import { useSpecies } from '../hooks/useSpecies'

function StatsPage() {
    const { species, loading, error } = useSpecies()

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