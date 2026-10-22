import { Route, Routes } from 'react-router'
import CatchLogPage from './pages/CatchLogPage'
import StatsPage from './pages/StatsPage'
import CatchDetailPage from './pages/CatchDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CatchLogPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/catches/:id" element={<CatchDetailPage />} />
    </Routes>
  )
}

export default App