import CatchItem from "./CatchItem"
import type { Catch } from '../types/Catch'

type CatchListProps = {
    catches: Catch[]
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

function CatchList({ catches, onDelete, onEdit }: CatchListProps) {
    return(
        <>
            {
                catches.map((catchItem) => {
                    return (
                        <CatchItem
                            id={catchItem.id}
                            fish={catchItem.fish}
                            length={catchItem.length}
                            key={catchItem.id}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    )
                })
            }
        </>
    )
}

export default CatchList