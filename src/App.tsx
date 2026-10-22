import { Route, Routes } from 'react-router'
import CatchLogPage from './pages/CatchLogPage'
import StatsPage from './pages/StatsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CatchLogPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  )
}

export default App