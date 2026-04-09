import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Contact from './pages/Contact'

function LoadingScreen() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-bg-surface" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-success animate-spin" style={{ animationDuration: '1.5s' }} />
        <div className="absolute inset-2 rounded-full border-2 border-bg-surface" />
        <div className="absolute top-1 left-1/2 w-1 h-3 bg-success rounded-full animate-pulse" style={{ transform: 'translateX(-50%)' }} />
      </div>
      <p className="text-text-secondary font-mono">Loading{dots}</p>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return loading ? <LoadingScreen /> : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}