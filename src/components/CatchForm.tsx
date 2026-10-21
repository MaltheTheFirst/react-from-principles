type CatchFormProps = {
    fish: string
    length: number
    editingId: number | null
    onFishChange: (value: string) => void
    onLengthChange: (value: string) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onCancelEdit: () => void
}

function CatchForm({
    fish,
    length,
    editingId,
    onFishChange,
    onLengthChange,
    onSubmit,
    onCancelEdit
}: CatchFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <input 
                value={fish}
                onChange={(event) => onFishChange(event.target.value)}
                placeholder="Name of fish"
            />
            <input
                value={length}
                onChange={(event) => onLengthChange(event.target.value)}
                placeholder="Length"
                type="number"
            />
            <button type="submit">
                {editingId !== null ? "Save Edit" : "Add Catch"}
            </button>
            {
                editingId !== null && 
                <button type="button" onClick={onCancelEdit}>Cancel</button>
            }
        </form>
    )
}

export default CatchForm