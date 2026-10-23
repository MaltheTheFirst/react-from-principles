import { Link } from 'react-router'
import type { Catch } from '../types/Catch'
import { useContext } from 'react'
import { UnitContext } from '../context/UnitContext'
import styles from './CatchItem.module.css'

type CatchItemProps = Catch & {
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

function CatchItem({ fish, length, id, onDelete, onEdit }: CatchItemProps) {
  const unit = useContext(UnitContext)

  const displayLength = 
    unit === "cm"
    ? length
    : Number((length / 2.54).toFixed(1))
  
  return (
    <li className={styles.item}>
      <p className={styles.details}>
        <Link to={`/catches/${id}`}>
          {fish}
        </Link> - {displayLength}{unit}</p>

      <div className={styles.actions}>
        <button onClick={() => onDelete(id)}>Delete</button>
        <button onClick={() => onEdit(id)}>Edit</button>
      </div>
    </li>
  )
}

export default CatchItem