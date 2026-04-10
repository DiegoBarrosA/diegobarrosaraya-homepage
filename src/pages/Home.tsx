import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDock } from '../App'

const bioText = `Beyond my professional work, I'm an avid explorer of both legacy Unix systems and cutting-edge Linux distributions, driven by a passion for open-source technology and continuous learning.`

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
    }, 5)
    return () => clearInterval(interval)
  }, [text])

  return (
    <pre className="whitespace-pre-wrap leading-relaxed text-text-secondary">
      {displayedText}
      {!isComplete && <span className="terminal-cursor animate-[blink_1s_infinite]" />}
    </pre>
  )
}

function ProfilePhoto() {
  return (
    <div className="relative mb-8 flex items-center justify-center">
      <div className="absolute rounded-full bg-accent/20 blur-2xl animate-pulse" 
           style={{ width: '160px', height: '160px' }} />
      <img src="/me.jpg" alt="Diego Barros Araya" 
           className="relative w-40 h-40 rounded-full object-cover border-2 border-accent/50 glow" 
           loading="eager" />
    </div>
  )
}

function TerminalWindow({
  title,
  state,
  onMinimize,
  onClose,
  onMaximize,
  children,
  animation
}: {
  title: string
  state: { minimized: boolean; maximized: boolean }
  onMinimize?: () => void
  onClose?: () => void
  onMaximize?: () => void
  children: React.ReactNode
  animation?: 'open' | 'pop' | 'none'
}) {
  if (state.minimized) return null

  const animClass = animation === 'open' ? 'opening' : animation === 'pop' ? 'maximizing' : ''

  return (
    <div className={`terminal-window mb-6 fade-in ${animClass} ${state.maximized ? 'max-w-4xl mx-auto' : ''}`}>
      <div className="terminal-titlebar">
        <button type="button" onClick={onMinimize} className="terminal-btn terminal-btn-red hover:opacity-80 transition-opacity" title="Minimize" />
        <button type="button" onClick={onClose} className="terminal-btn terminal-btn-yellow hover:opacity-80 transition-opacity" title="Close" />
        <button type="button" onClick={onMaximize} className="terminal-btn terminal-btn-green hover:opacity-80 transition-opacity" title="Maximize" />
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-content">
        {children}
      </div>
    </div>
  )
}

export default function Home() {
  const [bioState, setBioState] = useState({ minimized: false, maximized: false })
  const [bioAnimation, setBioAnimation] = useState<'open' | 'pop' | 'none'>('open')
  const { registerMinimizedWindow, minimizedWindows } = useDock()

  useEffect(() => {
    const isMinimized = minimizedWindows.some(w => w.id === 'home-bio')
    if (!isMinimized && bioState.minimized) {
      setBioState(prev => ({ ...prev, minimized: false }))
      setBioAnimation('pop')
      setTimeout(() => setBioAnimation('none'), 300)
    }
  }, [minimizedWindows])

  const handleMinimize = () => {
    registerMinimizedWindow({
      id: 'home-bio',
      page: 'home',
      icon: FaUser,
      dockColor: 'dock-btn-terminal',
      title: 'bio.sh'
    })
    setBioState({ minimized: true, maximized: false })
  }

  const handleClose = () => {
    registerMinimizedWindow({
      id: 'home-bio',
      page: 'home',
      icon: FaUser,
      dockColor: 'dock-btn-terminal-yellow',
      title: 'bio.sh'
    })
    setBioState({ minimized: true, maximized: false })
  }

  const handleMaximize = () => {
    console.log('Before:', bioState)
    setBioState(prev => {
      const newState = { ...prev, maximized: !prev.maximized }
      console.log('After:', newState)
      return newState
    })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 pb-24">
      <div className="max-w-2xl w-full text-center fade-in">
        <ProfilePhoto />
        <h1 className="text-4xl font-bold mb-2 text-text-primary tracking-tight">DIEGO BARROS ARAYA</h1>
        <p className="text-xl text-accent mb-8">Senior IT Engineer & Technical Consultant</p>
        <TerminalWindow
          title="~/bio$ cat bio.sh"
          state={bioState}
          onMinimize={handleMinimize}
          onClose={handleClose}
          onMaximize={handleMaximize}
          animation={bioAnimation}
        >
          <div className="terminal-prompt">$ cat bio.sh</div>
          <TerminalBio text={bioText} />
        </TerminalWindow>
      </div>
    </main>
  )
}