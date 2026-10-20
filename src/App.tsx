import { useState } from 'react'
import './App.css'
import CatchItem from './components/CatchItem'

function App() {

  const [catches, setCatches] = useState([
    {
      fish: "Horse Mackerel",
      length: 16,
      id: 1
    },
    {
      fish: "Painted Comber",
      length: 18,
      id: 2
    },
    {
      fish: "Gilthead Seabream",
      length: 32,
      id: 3
    }
  ]);

  const [fish, setFish] = useState("")
  const [length, setLength] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState("default")
 
  const catchLengths = catches.map((catchItem) => {
    return catchItem.length
  })
  const longestCatch = Math.max(...catchLengths)

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (fish === "" || Number(length) <= 0) {
      return;
    }

    if (editingId !== null) {
      setCatches((currentCatches) => {
        return currentCatches.map((catchItem) => {
          if (catchItem.id === editingId) {
            return {
              id: catchItem.id,
              fish: fish,
              length: Number(length)
            }
          }
          return catchItem
        })
      })
      setEditingId(null)
      setFish("")
      setLength("")
      return
    }

    setCatches((currentCatches) => {
      return [
        ...currentCatches,
        {
          id: Date.now(),
          fish: fish,
          length: Number(length)
        }
      ]
    })

    setFish("")
    setLength("")
  }

  function handleDelete(id: number) {
    setCatches((currentCatches) => {
      return currentCatches.filter((catchItem) => {
        return catchItem.id !== id
      })
    })
  }

  function handleEdit(id: number) {
    const catchToEdit = catches.find((catchItem) => {
      return catchItem.id === id
    })

    if (catchToEdit === undefined) {
      return
    }

    setEditingId(id)
    setFish(catchToEdit.fish)
    setLength(String(catchToEdit.length))
  }

  function handleCancelEdit() {
    setEditingId(null)
    setFish("")
    setLength("")
  }

  const filteredCatches = catches.filter((catchItem) => {
    return catchItem.fish
      .toLowerCase()
      .includes(search.toLowerCase())
  })

  const sortedCatches = [...filteredCatches]

  if (sortOrder === "shortest") {
    sortedCatches.sort((a, b) => a.length - b.length)
  }

  if (sortOrder === "longest") {
    sortedCatches.sort((a, b) => b.length - a.length)
  }

  return (
      <section id="center">
        <h1>Catch Log</h1>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="shortest">Shortest first</option>
          <option value="longest">Longest first</option>
        </select>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search catches"
        />

          { 
            catches.length === 0 
              ? <h3>No catches logged yet</h3> 
              : <h3>{catches.length} catches logged</h3> 
          }

          {
            catches.length === 0
              ? null
              : <h3>Longest catch: {longestCatch}</h3>
          }

          {
          search !== "" && filteredCatches.length === 0
            ? <p>No catches match your search</p>
            : sortedCatches.map((catchItem) => {
              return (
                <CatchItem 
                  id={catchItem.id}
                  fish={catchItem.fish}
                  length={catchItem.length}
                  key={catchItem.id}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )
            })
          }

          <form onSubmit={handleSubmit}>
            <input 
              value={fish}
              onChange={(event) => setFish(event.target.value)}
              placeholder="Name of fish"
            />
            <input
              value={length}
              onChange={(event) => setLength(event.target.value)}
              placeholder="Length"
              type="number"
            />
            <button type="submit">
              {editingId !== null ? "Save Edit" : "Add Catch"}
            </button>
            {
              editingId !== null && 
              <button type="button" onClick={handleCancelEdit}>Cancel</button>
            }
          </form>
      </section>
  )
}

export default App
