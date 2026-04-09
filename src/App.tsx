import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}