import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaLinkedin, FaFilePdf, FaFileCode, FaFileAlt } from 'react-icons/fa'

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

function SkillSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-4">
      <h3 className="text-accent font-bold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (<span key={item} className="px-3 py-1 bg-bg-surface rounded-full text-sm text-text-secondary">{item}</span>))}
      </div>
    </div>
  )
}

function ExpItem({ role, company, location, period, description, url }: { role: string; company: string; location: string; period: string; description: string; url?: string }) {
  return (
    <div className="mb-6">
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

function EduItem({ degree, school, location, period }: { degree: string; school: string; location: string; period: string }) {
  return (
    <div className="mb-6">
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

  const exports = [
    { label: 'PDF', url: '/resume.pdf', icon: FaFilePdf, color: 'hover:bg-red-600' },
    { label: 'View', url: `${baseUrl}?theme=professional`, icon: FaFileCode, color: 'hover:bg-blue-600' },
    { label: 'HTML', url: `${baseUrl}.html?theme=professional`, icon: FaFileCode, color: 'hover:bg-orange-600' },
    { label: 'JSON', url: `${baseUrl}.json`, icon: FaFileAlt, color: 'hover:bg-yellow-600' },
    { label: 'YAML', url: `${baseUrl}.yaml`, icon: FaFileCode, color: 'hover:bg-green-600' },
  ]

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <span className="text-text-secondary text-sm py-2">Export:</span>
      {exports.map((exp) => {
        const Icon = exp.icon
        return (
          <a
            key={exp.label}
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 bg-bg-surface text-text-secondary rounded-lg transition-all duration-300 hover:text-white ${exp.color}`}
          >
            <Icon className="text-sm" />
            {exp.label}
          </a>
        )
      })}
    </div>
  )
}

export default function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/resume.json')
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

  if (loading) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-block mb-8 text-accent hover:text-accent-secondary transition-colors">← Back to Home</Link>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </main>
    )
  }

  if (!resumeData) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-block mb-8 text-accent hover:text-accent-secondary transition-colors">← Back to Home</Link>
          <p className="text-error">Failed to load resume data.</p>
        </div>
      </main>
    )
  }

  const { basics, work, education, skills, certificates } = resumeData

  return (
    <main className="min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-block mb-8 text-accent hover:text-accent-secondary transition-colors">← Back to Home</Link>
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
          <ExportButtons />
        </header>
        <section className="mb-8 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Summary</h2>
          <p className="text-text-secondary leading-relaxed">{basics.summary}</p>
        </section>
        <section className="mb-8 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Skills</h2>
          {skills.map((skill) => <SkillSection key={skill.name} title={skill.name} items={skill.keywords} />)}
        </section>
        <section className="mb-8 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Experience</h2>
          {work.map((exp, i) => (
            <ExpItem
              key={i}
              role={exp.position}
              company={exp.name}
              location={exp.location}
              period={formatDateRange(exp.startDate, exp.endDate)}
              description={exp.summary}
              url={exp.url}
            />
          ))}
        </section>
        <section className="mb-8 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Education</h2>
          {education.map((edu, i) => (
            <EduItem
              key={i}
              degree={`${edu.studyType} - ${edu.area}`}
              school={edu.institution}
              location={edu.location}
              period={formatDateRange(edu.startDate, edu.endDate)}
            />
          ))}
        </section>
        {certificates && certificates.length > 0 && (
          <section className="mb-8 fade-in">
            <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Certifications</h2>
            <div className="space-y-2">
              {certificates.map((cert, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-text-secondary">{cert.name}</span>
                  <span className="text-text-tertiary text-sm">
                    {formatDate(cert.date)} - Expires: {formatDate(cert.expires)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
