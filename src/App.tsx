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
          <button onClick={() => {
            setCatches([
              ...catches,
              {
                id: Date.now(),
                fish: "Painted Comber",
                length: 18
              }
            ])
          }}>Add Catch</button>
      </section>
  )
}

function CatchItem({ fish, length }: CatchItemProps) {
  return (
    <p>{fish} - {length}cm</p>
  )
}

export default App
