import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { createContext, useContext, useState, type ReactNode } from 'react'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import { FaHome, FaFile } from 'react-icons/fa'

interface MinimizedWindow {
  id: string
  page: string
  icon: React.ComponentType<{ className?: string }>
  dockColor: string
  title: string
}

interface DockContextType {
  registerMinimizedWindow: (window: MinimizedWindow) => void
  unregisterMinimizedWindow: (id: string) => void
  minimizedWindows: MinimizedWindow[]
}

const DockContext = createContext<DockContextType | null>(null)

export function useDock() {
  const context = useContext(DockContext)
  if (!context) throw new Error('useDock must be used within DockProvider')
  return context
}

interface DockItem {
  id: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  dockColor: string
}

const PAGE_ITEMS: DockItem[] = [
  { id: 'home', path: '/', icon: FaHome, dockColor: 'dock-btn-home' },
  { id: 'resume', path: '/resume', icon: FaFile, dockColor: 'dock-btn-terminal' },
]

function Dock() {
  const location = useLocation()
  const { minimizedWindows, unregisterMinimizedWindow } = useDock()

  const activePage = PAGE_ITEMS.find(item => location.pathname === item.path)
  const currentPageId = activePage?.id || 'home'

  return (
    <div className="dock">
      {PAGE_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`dock-btn ${item.dockColor} ${isActive ? 'ring-2 ring-accent' : ''}`}
            title={item.id === 'home' ? 'Home' : 'Resume'}
          >
            <Icon className="text-lg" />
          </Link>
        )
      })}
      
      {minimizedWindows
        .filter(w => w.page === currentPageId)
        .map((window) => {
          const Icon = window.icon
          return (
            <button
              key={window.id}
              onClick={() => unregisterMinimizedWindow(window.id)}
              className={`dock-btn ${window.dockColor}`}
              title={window.title}
            >
              <Icon className="text-lg" />
            </button>
          )
        })}
    </div>
  )
}

function DockProvider({ children }: { children: ReactNode }) {
  const [minimizedWindows, setMinimizedWindows] = useState<MinimizedWindow[]>([])

  const registerMinimizedWindow = (window: MinimizedWindow) => {
    setMinimizedWindows(prev => {
      if (prev.find(w => w.id === window.id)) return prev
      return [...prev, window]
    })
  }

  const unregisterMinimizedWindow = (id: string) => {
    setMinimizedWindows(prev => prev.filter(w => w.id !== id))
  }

  return (
    <DockContext.Provider value={{ registerMinimizedWindow, unregisterMinimizedWindow, minimizedWindows }}>
      <Dock />
      {children}
    </DockContext.Provider>
  )
}

export default function App() {
  return (
    <DockProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </DockProvider>
  )
}