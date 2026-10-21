import { useState, useEffect } from 'react'
import './App.css'
import CatchList from './components/CatchList'
import CatchForm from './components/CatchForm'
import CatchControls from './components/CatchControls'
import type { Catch } from './types/Catch'

function App() {

  const [catches, setCatches] = useState<Catch[]>(() => {
    const storedCatches = localStorage.getItem("catches")

    if (storedCatches === null) {
      return [
        {
          fish: "Horse Mackerel",
          length: 16,
          id: 1
        },
        {
          fish: "Painted Comber",
          length: 12,
          id: 2
        },
        {
          fish: "Guilthead Seabream",
          length: 12,
          id: 3
        }
      ]
    }

    return JSON.parse(storedCatches)
  })
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

  useEffect(() => {
    localStorage.setItem("catches", JSON.stringify(catches))
  }, [catches])

  return (
      <section id="center">
        <h1>Catch Log</h1>

        <CatchControls 
          search={search}
          sortOrder={sortOrder}
          onSearchChange={setSearch}
          onSortOrderChange={setSortOrder}
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
            : <CatchList
                catches={sortedCatches}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
          }
        <CatchForm 
          fish={fish}
          length={Number(length)}
          editingId={editingId}
          onFishChange={setFish}
          onLengthChange={setLength}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit}
        />
      </section>
  )
}

export default App
