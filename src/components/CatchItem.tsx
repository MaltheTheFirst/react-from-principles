import type { Catch } from '../types/Catch'

type CatchItemProps = Catch & {
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

function CatchItem({ fish, length, id, onDelete, onEdit }: CatchItemProps) {
  return (
    <div>
      <p>{fish} - {length}cm</p>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onEdit(id)}>Edit</button>
    </div>
  )
}

export default CatchItem