import './App.css'

type CatchItemProps = {
  fish: string;
  length: number;
}

function App() {

  return (
      <section id="center">
        <h1>Catch Log</h1>
          <CatchItem fish="Horse Mackerel" length={18} />
      </section>
  )
}

function CatchItem(props: CatchItemProps) {
  return (
    <p>{props.fish} - {props.length}cm</p>
  )
}

export default App
