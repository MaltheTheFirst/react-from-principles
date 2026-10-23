import styles from './CatchForm.module.css'

type CatchFormProps = {
    fish: string
    length: string
    editingId: number | null
    onFishChange: (value: string) => void
    onLengthChange: (value: string) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onCancelEdit: () => void
    fishInputRef: React.RefObject<HTMLInputElement | null>
}

function CatchForm({
    fish,
    length,
    editingId,
    onFishChange,
    onLengthChange,
    onSubmit,
    onCancelEdit,
    fishInputRef
}: CatchFormProps) {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <label htmlFor="fish">Fish</label>
            <input
                className={styles.input}
                id="fish"
                value={fish}
                onChange={(event) => onFishChange(event.target.value)}
                placeholder="Name of fish"
                ref={fishInputRef}
            />
            <label htmlFor="length">Length</label>
            <input
                className={styles.input}
                id="length"
                value={length}
                onChange={(event) => onLengthChange(event.target.value)}
                placeholder="Length"
                type="number"
            />
            <div className={styles.actions}>
                <button type="submit">
                    {editingId !== null ? "Save Edit" : "Add Catch"}
                </button>
                {
                    editingId !== null && 
                    <button type="button" onClick={onCancelEdit}>Cancel</button>
                }
            </div>
        </form>
    )
}

export default CatchForm