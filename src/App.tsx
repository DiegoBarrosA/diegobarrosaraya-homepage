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
      <div className="relative w-32 h-32 mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#353535" strokeWidth="3" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#2D2D2D" strokeWidth="1" />
          <g style={{ transformOrigin: '30px 50px', animation: 'gearSpin 4s linear infinite' }}>
            <circle cx="30" cy="50" r="8" fill="#353535" />
            {[...Array(8)].map((_, i) => (
              <rect key={i} x="28" y="38" width="4" height="8" fill="#82AAFF" 
                    style={{ transform: `rotate(${i * 45}deg)`, transformOrigin: '30px 50px' }} />
            ))}
          </g>
          <g style={{ transformOrigin: '70px 50px', animation: 'gearSpin 4s linear infinite reverse' }}>
            <circle cx="70" cy="50" r="6" fill="#353535" />
            {[...Array(6)].map((_, i) => (
              <rect key={i} x="68" y="40" width="3" height="6" fill="#C3E88D" 
                    style={{ transform: `rotate(${i * 60}deg)`, transformOrigin: '70px 50px' }} />
            ))}
          </g>
          <line x1="50" y1="25" x2="50" y2="40" stroke="#EEFFFF" strokeWidth="2" strokeLinecap="round" style={{ animation: 'tick 1s steps(12) infinite', transformOrigin: '50px 50px' }} />
          <line x1="50" y1="50" x2="65" y2="50" stroke="#82AAFF" strokeWidth="2" strokeLinecap="round" style={{ animation: 'hourHand 12s steps(12) infinite', transformOrigin: '50px 50px' }} />
          <circle cx="50" cy="50" r="3" fill="#C3E88D" />
        </svg>
      </div>
      <p className="text-text-secondary font-mono">Loading{dots}</p>
      <style>{`
        @keyframes gearSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes tick { 
          0% { transform: rotate(0deg); } 
          8.33% { transform: rotate(6deg); } 
          100% { transform: rotate(0deg); } 
        }
        @keyframes hourHand { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
      `}</style>
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