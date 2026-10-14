import { useState } from 'react'
import './App.css'

type CatchItemProps = {
  fish: string;
  length: number;
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

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (fish === "" || Number(length) <= 0) {
      return;
    }
    setCatches([
      ...catches,
        {
          id: Date.now(),
          fish: fish,
          length: Number(length)
        }
    ])

    setFish("")
    setLength("")
  }

  return (
      <section id="center">
        <h1>Catch Log</h1>
          {
            catches.map((catchItem) => {
              return (
                <CatchItem 
                  fish={catchItem.fish}
                  length={catchItem.length}
                  key={catchItem.id}
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

function CatchItem({ fish, length }: CatchItemProps) {
  return (
    <p>{fish} - {length}cm</p>
  )
}

export default App
