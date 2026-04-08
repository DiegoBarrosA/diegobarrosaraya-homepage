import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const bioText = `Beyond my professional work, I'm an avid explorer of both legacy Unix systems and cutting-edge Linux distributions, driven by a passion for open-source technology and continuous learning.`

const navItems = [
  { path: '/resume', label: 'Resume', delay: 'delay-100' },
  { path: 'https://blog.diegobarrosaraya.com', label: 'Blog', delay: 'delay-200', external: true },
  { path: '/contact', label: 'Contact', delay: 'delay-300' },
]

function TerminalBio({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [text])

  return (
    <div className="relative">
      <pre className="text-left whitespace-pre-wrap leading-relaxed text-text-secondary">
        {displayedText}
        {!isComplete && <span className="terminal-cursor animate-[blink_1s_infinite]" />}
      </pre>
    </div>
  )
}

function ProfilePhoto() {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl animate-pulse" />
      <img src="/me.jpg" alt="Diego Barros Araya" className="relative w-40 h-40 rounded-full object-cover border-2 border-accent/50 glow" loading="eager" />
    </div>
  )
}

function Navigation() {
  return (
    <nav className="flex flex-wrap justify-center gap-4 mt-12">
      {navItems.map((item) => (
        item.external ? (
          <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer" className={`nav-item ${item.delay} opacity-0 animate-fade-in`}>
            {item.label}
          </a>
        ) : (
          <Link key={item.path} to={item.path} className={`nav-item ${item.delay} opacity-0 animate-fade-in`}>
            {item.label}
          </Link>
        )
      ))}
    </nav>
  )
}

export default function Home() {
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowNav(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center fade-in">
        <ProfilePhoto />
        <h1 className="text-4xl font-bold mb-2 text-text-primary tracking-tight">DIEGO BARROS ARAYA</h1>
        <p className="text-xl text-accent mb-8">Senior IT Engineer & Technical Consultant</p>
        <div className="bg-bg-secondary/50 rounded-lg p-6 text-left backdrop-blur-sm">
          <TerminalBio text={bioText} />
        </div>
        {showNav && <Navigation />}
      </div>
    </main>
  )
}