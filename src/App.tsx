import { useState, useRef, useReducer } from 'react'
import './App.css'
import CatchList from './components/CatchList'
import CatchForm from './components/CatchForm'
import CatchControls from './components/CatchControls'
import type { Catch } from './types/Catch'
import { useLocalStorage } from './hooks/useLocalStorage'

type CatchFormState = {
  fish: string
  length: string
  editingId: number | null
}

type CatchFormAction = 
  | { type: "fishChanged"; value: string }
  | { type: "lengthChanged"; value: string }
  | { type: "startEditing"; id: number; fish: string; length: number }
  | { type: "cancelEditing" }
  | { type: "reset" }

const initialFormState: CatchFormState = {
  fish: "",
  length: "",
  editingId: null
}

function catchFormReducer(
  state: CatchFormState,
  action: CatchFormAction
): CatchFormState {
  switch (action.type) {
    case  "fishChanged":
      return {
        ...state,
        fish: action.value
      }
    
    case "lengthChanged":
      return {
        ...state,
        length: action.value
    }
  
    case "startEditing":
      return{
        fish: action.fish,
        length: String(action.length),
        editingId: action.id
    }

    case "cancelEditing":
    case "reset":
      return initialFormState

    default:
      return state
  }
}

function App() {
  const [catches, setCatches] = useLocalStorage<Catch[]>(
    "catches",
    [
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
  )

  const [formState, dispatch] = useReducer(
    catchFormReducer,
    initialFormState
  )
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState("default")
  const fishInputRef = useRef<HTMLInputElement>(null)
 
  const catchLengths = catches.map((catchItem) => {
    return catchItem.length
  })
  const longestCatch = Math.max(...catchLengths)

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (formState.fish === "" || Number(formState.length) <= 0) {
      return;
    }

    if (formState.editingId !== null) {
      setCatches((currentCatches) => {
        return currentCatches.map((catchItem) => {
          if (catchItem.id === formState.editingId) {
            return {
              id: catchItem.id,
              fish: formState.fish,
              length: Number(formState.length)
            }
          }
          return catchItem
        })
      })
      dispatch({ type: "reset" })
      return
    }

    setCatches((currentCatches) => {
      return [
        ...currentCatches,
        {
          id: Date.now(),
          fish: formState.fish,
          length: Number(formState.length)
        }
      ]
    })

    dispatch({ type: "reset" })
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

    dispatch({
      type: "startEditing",
      id: catchToEdit.id,
      fish: catchToEdit.fish,
      length: catchToEdit.length
    })
    fishInputRef.current?.focus()
  }

  function handleCancelEdit() {
    dispatch({ type: "cancelEditing" })
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
          fish={formState.fish}
          length={formState.length}
          editingId={formState.editingId}
          onFishChange={(value) => {
            dispatch({
              type: "fishChanged",
              value
            }  
          )}}
          onLengthChange={(value) =>
            dispatch({
              type: "lengthChanged",
              value
            })}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit}
          fishInputRef={fishInputRef}
        />
      </section>
  )
}

export default App
