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
      <div className="relative w-40 h-40 mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#353535" />
              <stop offset="100%" stopColor="#2D2D2D" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="#353535" strokeWidth="2" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#2D2D2D" strokeWidth="1" />
          <g className="origin-center" style={{ transformOrigin: '50px 50px' }}>
            <circle cx="50" cy="50" r="8" fill="url(#gearGrad)" />
            {[...Array(12)].map((_, i) => (
              <rect key={i} x="48" y="14" width="4" height="10" fill="#82AAFF" rx="1" 
                    style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '50px 50px' }} />
            ))}
            <circle cx="50" cy="50" r="4" fill="#C3E88D" />
          </g>
          <g className="origin-center" style={{ transformOrigin: '50px 50px', animation: 'spin 2s linear infinite reverse' }}>
            <rect x="8" y="48" width="16" height="4" fill="#82AAFF" rx="1" />
            <rect x="8" y="48" width="16" height="4" fill="#82AAFF" rx="1" 
                  style={{ transform: 'rotate(90deg)', transformOrigin: '16px 50px' }} />
            {[...Array(8)].map((_, i) => (
              <circle key={i} cx={50 + Math.cos(i * Math.PI / 4) * 25} cy={50 + Math.sin(i * Math.PI / 4) * 25} 
                      r="3" fill="#353535" />
            ))}
          </g>
          <rect x="49" y="30" width="2" height="20" fill="#C3E88D" rx="1" 
                style={{ transform: 'rotate(45deg)', transformOrigin: '50px 50px', animation: 'tick 2s steps(12) infinite' }} />
          <rect x="49" y="38" width="2" height="14" fill="#82AAFF" rx="1" 
                style={{ transform: 'rotate(180deg)', transformOrigin: '50px 50px', animation: 'tick 2s steps(12) infinite' }} />
          <circle cx="50" cy="50" r="3" fill="#C3E88D" />
        </svg>
      </div>
      <p className="text-text-secondary font-mono">Loading{dots}</p>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes tick { 
          0% { transform: rotate(45deg); } 
          8.33% { transform: rotate(50deg); } 
          100% { transform: rotate(45deg); } 
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