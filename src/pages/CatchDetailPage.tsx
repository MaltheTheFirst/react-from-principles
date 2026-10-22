import { useParams } from 'react-router'
import { useCatches } from '../context/CatchContext'

function CatchDetailPage() {
    const { id } = useParams()
    const catchId = Number(id)

    const { catches } = useCatches()

    const catchItem = catches.find((item) => item.id === catchId)

    return (
        <section id="center">
            <h1>Catch Details</h1>
            <p>Catch ID: {id}</p>
            <p>{catchItem?.fish}</p>
        </section>
    )
}

export default CatchDetailPage