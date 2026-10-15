import { useState } from 'react'
import './App.css'

type CatchItemProps = {
  fish: string
  length: number
  id: number
  onDelete: (id: number) => void
}

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
      fish: "Guilted Seabream",
      length: 32,
      id: 3
    }
  ]);

  const [fish, setFish] = useState("");
  const [length, setLength] = useState("");
 
  const catchLengths = catches.map((catchItem) => {
    return catchItem.length
  })
  const longestCatch = Math.max(...catchLengths)

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (fish === "" || Number(length) <= 0) {
      return;
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

  return (
      <section id="center">
        <h1>Catch Log</h1>
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
            catches.map((catchItem) => {
              return (
                <CatchItem 
                  id={catchItem.id}
                  fish={catchItem.fish}
                  length={catchItem.length}
                  key={catchItem.id}
                  onDelete={handleDelete}
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
            <button type="submit">Add Catch</button>
          </form>
      </section>
  )
}

function CatchItem({ fish, length, id, onDelete }: CatchItemProps) {
  return (
    <div>
      <p>{fish} - {length}cm</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

export default App
