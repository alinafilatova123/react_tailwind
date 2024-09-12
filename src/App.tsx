import { Route, Routes } from 'react-router-dom';
import SaveNote from './pages/SaveNote';

import AllNotes from './pages/AllNotes';

function App() {

  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<AllNotes />} />
        <Route path="/notes" element={<AllNotes />} />
        <Route path="/notes/:id" element={<SaveNote />} />
      </Routes>
  </div>
  )
}

export default App;