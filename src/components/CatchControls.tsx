type CatchControlsProps = {
    search: string
    sortOrder: string
    onSearchChange: (value: string) => void
    onSortOrderChange: (value: string) => void
}

function CatchControls({
    search,
    sortOrder,
    onSearchChange,
    onSortOrderChange
}: CatchControlsProps) {
    return (
        <>
        <select
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="shortest">Shortest first</option>
          <option value="longest">Longest first</option>
        </select>

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search catches"
        />
        </>
    )
}

export default CatchControls