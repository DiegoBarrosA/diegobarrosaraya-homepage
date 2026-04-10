import { useState, useEffect } from 'react'
import { 
  FaEnvelope, FaLinkedin, FaFilePdf, FaFileCode, FaFileAlt, FaMinus, FaExpand, 
  FaCogs, FaBriefcase, FaGraduationCap, FaAward, FaDownload, FaFile
} from 'react-icons/fa'
import { useDock } from '../App'

interface ResumeData {
  basics: {
    name: string
    label: string
    email: string
    url: string
    summary: string
    location: { city: string; countryCode: string; region: string }
    profiles: { network: string; username: string; url: string }[]
  }
  work: { name: string; position: string; url: string; startDate: string; endDate?: string; summary: string; location: string }[]
  education: { institution: string; area: string; studyType: string; startDate: string; endDate: string; location: string }[]
  skills: { name: string; keywords: string[] }[]
  certificates: { name: string; date: string; expires: string }[]
}

const GITHUB_USERNAME = 'DiegoBarrosA'

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatDateRange(start: string, end?: string): string {
  const startStr = formatDate(start)
  const endStr = end ? formatDate(end) : 'Present'
  return `${startStr} - ${endStr}`
}

type WindowType = 'terminal' | 'gui'

interface WindowState {
  minimized: boolean
  maximized: boolean
}

interface WindowConfig {
  id: string
  title: string
  type: WindowType
  icon: React.ComponentType<{ className?: string }>
  dockColor: string
}

function TerminalTyping({ text, speed = 5 }: { text: string; speed?: number }) {
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
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <pre className="whitespace-pre-wrap leading-relaxed text-text-secondary">
      {displayedText}
      {!isComplete && <span className="terminal-cursor animate-[blink_1s_infinite]" />}
    </pre>
  )
}

function TerminalWindow({
  config,
  state,
  onMinimize,
  onClose,
  onMaximize,
  children
}: {
  config: WindowConfig
  state: WindowState
  onMinimize: () => void
  onClose: () => void
  onMaximize: () => void
  children: React.ReactNode
}) {
  if (state.minimized) return null

  return (
    <div className={`terminal-window mb-6 fade-in ${state.maximized ? 'window-maximized' : ''}`}>
      <div className="terminal-titlebar">
        <button onClick={onMinimize} className="terminal-btn terminal-btn-red hover:opacity-80 transition-opacity" title="Minimize" />
        <button onClick={onClose} className="terminal-btn terminal-btn-yellow hover:opacity-80 transition-opacity" title="Close" />
        <button onClick={onMaximize} className="terminal-btn terminal-btn-green hover:opacity-80 transition-opacity" title="Maximize" />
        <span className="terminal-title">{config.title}</span>
      </div>
      <div className="terminal-content">
        {children}
      </div>
    </div>
  )
}

function GUIWindow({
  config,
  state,
  onMinimize,
  onMaximize,
  children
}: {
  config: WindowConfig
  state: WindowState
  onMinimize: () => void
  onMaximize: () => void
  children: React.ReactNode
}) {
  if (state.minimized) return null

  return (
    <div className={`gui-window mb-6 fade-in ${state.maximized ? 'window-maximized' : ''}`}>
      <div className="gui-header">
        <span className="gui-title">{config.title}</span>
        <div className="gui-controls">
          <button onClick={onMinimize} className="gui-btn" title="Minimize">
            <FaMinus />
          </button>
          <button onClick={onMaximize} className="gui-btn" title="Maximize">
            <FaExpand />
          </button>
        </div>
      </div>
      <div className="terminal-content">
        {children}
      </div>
    </div>
  )
}

function SkillItem({ index, name }: { index: number; name: string }) {
  return (
    <div className="nushell-row">
      <span className="nushell-row-header">{index}</span>
      <span className="nushell-cell">{name}</span>
    </div>
  )
}

function SkillsTable({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="nushell-table">
      <div className="terminal-prompt">$ cat {title.toLowerCase()}.json</div>
      <div className="bg-bg-surface px-2 py-1 text-text-tertiary font-bold flex">
        <span className="w-8">#</span>
        <span className="flex-1">{title}</span>
      </div>
      <div className="border-t border-bg-surface/30">
        {items.map((item, i) => (
          <SkillItem key={item} index={i} name={item} />
        ))}
      </div>
    </div>
  )
}

function CertsList({ items }: { items: { name: string; date: string; expires: string }[] }) {
  return (
    <div className="ls-output">
      <div className="terminal-prompt">$ ls</div>
      <div className="flex text-text-tertiary text-xs border-b border-bg-surface pb-1 mb-2" style={{ gap: '8px' }}>
        <span className="ls-permissions" style={{ width: '120px', flexShrink: 0 }}>Permissions</span>
        <span className="ls-size" style={{ width: '48px', flexShrink: 0 }}>Size</span>
        <span className="ls-date" style={{ width: '80px', flexShrink: 0 }}>Date</span>
        <span className="ls-name">Name</span>
      </div>
      {items.map((item, i) => (
        <CertItem 
          key={i} 
          name={item.name} 
          date={item.date} 
          expires={item.expires} 
        />
      ))}
    </div>
  )
}

function CertItem({ name, date, expires }: { name: string; date: string; expires: string }) {
  return (
    <div className="flex items-center" style={{ gap: '8px' }}>
      <span className="ls-permissions" style={{ width: '120px', flexShrink: 0 }}>-rw-r--r--</span>
      <span className="ls-size" style={{ width: '48px', flexShrink: 0, textAlign: 'right' }}>1</span>
      <span className="ls-date" style={{ width: '80px', flexShrink: 0 }}>{date}</span>
      <span className="ls-name">{name}</span>
      <span className="text-text-tertiary">→ expires {expires}</span>
    </div>
  )
}

function ExpItem({ role, company, location, period, description, url, isLast }: { role: string; company: string; location: string; period: string; description: string; url?: string; isLast?: boolean }) {
  return (
    <div className={isLast ? 'mb-0' : 'mb-6'}>
      <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
        <h3 className="text-lg font-bold text-text-primary">
          {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{role}</a> : role}
        </h3>
        <span className="text-accent-secondary text-sm">{period}</span>
      </div>
      <p className="text-text-secondary mb-1">{company} | {location}</p>
      {description && <p className="text-text-secondary/80 text-sm">{description}</p>}
    </div>
  )
}

function EduItem({ degree, school, location, period, isLast }: { degree: string; school: string; location: string; period: string; isLast?: boolean }) {
  return (
    <div className={isLast ? 'mb-0' : 'mb-6'}>
      <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
        <h3 className="text-lg font-bold text-text-primary">{degree}</h3>
        <span className="text-accent-secondary text-sm">{period}</span>
      </div>
      <p className="text-text-secondary">{school} | {location}</p>
    </div>
  )
}

function ExportButtons() {
  const username = GITHUB_USERNAME
  const baseUrl = `https://registry.jsonresume.org/${username}`

  const exportLinks = [
    { label: 'PDF', url: '/resume.pdf', icon: FaFilePdf, color: 'bg-base09/20 hover:bg-base09/40 text-base09 border border-base09/30' },
    { label: 'HTML', url: `${baseUrl}.html`, icon: FaFileCode, color: 'bg-base0A/20 hover:bg-base0A/40 text-base0A border border-base0A/30' },
    { label: 'JSON', url: `${baseUrl}.json`, icon: FaFileAlt, color: 'bg-base0B/20 hover:bg-base0B/40 text-base0B border border-base0B/30' },
    { label: 'YAML', url: `${baseUrl}.yaml`, icon: FaFileCode, color: 'bg-base0C/20 hover:bg-base0C/40 text-base0C border border-base0C/30' },
  ]

  return (
    <div className="terminal-output">
      <div className="terminal-prompt">$ ./export.sh</div>
      <div className="flex flex-wrap gap-3 mt-4">
        {exportLinks.map((exp) => {
          const Icon = exp.icon
          return (
            <a
              key={exp.label}
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium border ${exp.color}`}
            >
              <Icon className="text-sm" />
              {exp.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

const WINDOW_CONFIGS: WindowConfig[] = [
  { id: 'summary', title: '~/summary$ echo "$SUMMARY"', type: 'terminal', icon: FaFile, dockColor: 'dock-btn-terminal' },
  { id: 'skills', title: '~/skills$ cat skills.json', type: 'gui', icon: FaCogs, dockColor: 'dock-btn-gui' },
  { id: 'experience', title: '~/experience$ cat experience.log', type: 'terminal', icon: FaBriefcase, dockColor: 'dock-btn-terminal-blue' },
  { id: 'education', title: '~/education$ cat education.sh', type: 'terminal', icon: FaGraduationCap, dockColor: 'dock-btn-terminal-purple' },
  { id: 'certifications', title: '~/certifications$ ls', type: 'terminal', icon: FaAward, dockColor: 'dock-btn-terminal-cyan' },
  { id: 'export', title: '~/export$ ./export.sh', type: 'gui', icon: FaDownload, dockColor: 'dock-btn-gui' },
]

const WINDOW_ID_TO_INDEX: Record<string, number> = {
  summary: 0,
  skills: 1,
  experience: 2,
  education: 3,
  certifications: 4,
  export: 5,
}

const initialWindowStates = {
  summary: { minimized: false, maximized: false },
  skills: { minimized: false, maximized: false },
  experience: { minimized: false, maximized: false },
  education: { minimized: false, maximized: false },
  certifications: { minimized: false, maximized: false },
  export: { minimized: false, maximized: false },
}

type WindowStates = typeof initialWindowStates

export default function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [windowStates, setWindowStates] = useState<WindowStates>(initialWindowStates)
  const { registerMinimizedWindow, minimizedWindows } = useDock()

  useEffect(() => {
    const myWindows = minimizedWindows.filter(w => w.page === 'resume')
    if (myWindows.length === 0) {
      setWindowStates(prev => {
        const keys = Object.keys(prev) as (keyof WindowStates)[]
        let changed = false
        const updated = { ...prev }
        keys.forEach(key => {
          if (updated[key].minimized) {
            updated[key] = { ...updated[key], minimized: false }
            changed = true
          }
        })
        return changed ? updated : prev
      })
    }
  }, [minimizedWindows])

  useEffect(() => {
    fetch('https://registry.jsonresume.org/DiegoBarrosA.json')
      .then(res => res.json())
      .then(data => {
        setResumeData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load resume:', err)
        setLoading(false)
      })
  }, [])

  const handleMinimize = (id: keyof typeof windowStates) => {
    const idx = WINDOW_ID_TO_INDEX[id]
    const config = WINDOW_CONFIGS[idx]
    registerMinimizedWindow({
      id: `resume-${id}`,
      page: 'resume',
      icon: config.icon,
      dockColor: config.dockColor,
      title: config.title
    })
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], minimized: true, maximized: false }
    }))
  }

  const handleClose = (id: keyof typeof windowStates) => {
    const idx = WINDOW_ID_TO_INDEX[id]
    const config = WINDOW_CONFIGS[idx]
    registerMinimizedWindow({
      id: `resume-${id}`,
      page: 'resume',
      icon: config.icon,
      dockColor: 'dock-btn-terminal-yellow',
      title: config.title
    })
    setWindowStates(prev => ({
      ...prev,
      [id]: { minimized: true, maximized: false }
    }))
  }

  const handleMaximize = (id: keyof typeof windowStates) => {
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], maximized: !prev[id].maximized }
    }))
  }

  if (loading) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-8 pl-20">
        <p className="text-text-secondary">Loading...</p>
      </main>
    )
  }

  if (!resumeData) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-8 pl-20">
        <p className="text-error">Failed to load resume data.</p>
      </main>
    )
  }

  const { basics, work, education, skills, certificates } = resumeData

  return (
    <main className="min-h-screen py-12 px-4 sm:px-8 pl-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 fade-in">
          <h1 className="text-3xl font-bold mb-2">{basics.name}</h1>
          <p className="text-xl text-accent mb-4">{basics.label}</p>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <a href={`mailto:${basics.email}`} className="hover:text-accent transition-colors flex items-center gap-2">
              <FaEnvelope /> {basics.email}
            </a>
            {basics.profiles?.[0] && (
              <a href={basics.profiles[0].url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
                <FaLinkedin /> LinkedIn
              </a>
            )}
          </div>
        </header>
        
        <TerminalWindow
          config={WINDOW_CONFIGS[0]}
          state={windowStates['summary']}
          onMinimize={() => handleMinimize('summary')}
          onClose={() => handleClose('summary')}
          onMaximize={() => handleMaximize('summary')}
        >
          <TerminalTyping text={basics.summary} />
        </TerminalWindow>

        <GUIWindow
          config={WINDOW_CONFIGS[1]}
          state={windowStates['skills']}
          onMinimize={() => handleMinimize('skills')}
          onMaximize={() => handleMaximize('skills')}
        >
          {skills.map((skill) => (
            <SkillsTable key={skill.name} title={skill.name} items={skill.keywords} />
          ))}
        </GUIWindow>

        <TerminalWindow
          config={WINDOW_CONFIGS[2]}
          state={windowStates['experience']}
          onMinimize={() => handleMinimize('experience')}
          onClose={() => handleClose('experience')}
          onMaximize={() => handleMaximize('experience')}
        >
          {work.map((exp, i) => (
            <ExpItem
              key={i}
              role={exp.position}
              company={exp.name}
              location={exp.location}
              period={formatDateRange(exp.startDate, exp.endDate)}
              description={exp.summary}
              url={exp.url}
              isLast={i === work.length - 1}
            />
          ))}
        </TerminalWindow>

        <TerminalWindow
          config={WINDOW_CONFIGS[3]}
          state={windowStates['education']}
          onMinimize={() => handleMinimize('education')}
          onClose={() => handleClose('education')}
          onMaximize={() => handleMaximize('education')}
        >
          {education.map((edu, i) => (
            <EduItem
              key={i}
              degree={`${edu.studyType} - ${edu.area}`}
              school={edu.institution}
              location={edu.location}
              period={formatDateRange(edu.startDate, edu.endDate)}
              isLast={i === education.length - 1}
            />
          ))}
        </TerminalWindow>

        {certificates && certificates.length > 0 && (
          <TerminalWindow
            config={WINDOW_CONFIGS[4]}
            state={windowStates['certifications']}
            onMinimize={() => handleMinimize('certifications')}
            onClose={() => handleClose('certifications')}
            onMaximize={() => handleMaximize('certifications')}
          >
            <CertsList items={certificates.map(c => ({ name: c.name, date: formatDate(c.date), expires: formatDate(c.expires) }))} />
          </TerminalWindow>
        )}
        
        <GUIWindow
          config={WINDOW_CONFIGS[5]}
          state={windowStates['export']}
          onMinimize={() => handleMinimize('export')}
          onMaximize={() => handleMaximize('export')}
        >
          <ExportButtons />
        </GUIWindow>
      </div>
    </main>
  )
}