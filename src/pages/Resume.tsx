import { Link } from 'react-router-dom'

const resumeData = {
  name: "Diego Pablo Barros Araya",
  title: "Senior IT Engineer & Technical Consultant",
  contact: { email: "contact@diegobarrosaraya.com", linkedin: "linkedin.com/in/diegobarrosaraya" },
  summary: "Senior Engineer and lifelong Linux user with over 10 years of hands-on experience using and exploring Linux systems. Experienced in agile teams, supporting cloud-based environments, and expertise in automation and cloud-native tools such as Docker and OCI.",
  skills: {
    tools: ["Jira Administration", "Confluence Administration", "Git", "Docker", "Podman"],
    languages: ["Python", "Java", "TypeScript", "JavaScript", "PL/SQL", "SQL"],
    frameworks: ["Django", "Android Studio", "Spring", "React", "Tailwind CSS"],
    ai: ["Model Context Protocol (MCP)", "Cursor AI", "Claude Code", "OpenCode"],
    os: ["Debian", "Ubuntu", "RHEL", "NixOS", "Arch Linux", "Mac OS", "Windows 11"],
    cloud: ["AWS", "Azure AD"]
  },
  certifications: [
    { name: "Atlassian Certified Expert", date: "Jan 2024", expires: "Jan 2026" },
    { name: "Atlassian Certified Jira Administrator", date: "Jan 2024", expires: "Apr 2026" },
    { name: "ITIL Foundation Level", date: "May 2023", expires: "Jan 2026" }
  ],
  experience: [
    { role: "Senior Engineer, Customer Support", company: "ServiceRocket", location: "Santiago, Chile", period: "April 2025 - Present", description: "Provide assistance to application administrators in diagnosing, troubleshooting, and debugging complex B2B software systems." },
    { role: "Engineer, Customer Support", company: "ServiceRocket", location: "Santiago, Chile", period: "March 2024 - April 2025", description: "Specialized in providing support for Atlassian products." }
  ],
  education: [
    { degree: "Bachelor of Engineering - Software Development Engineering", school: "Duoc UC", location: "Santiago, Chile", period: "August 2024 - November 2025" },
    { degree: "Associate's Degree, Programming Analyst", school: "Duoc UC", location: "Santiago, Chile", period: "January 2021 - July 2023" }
  ]
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

function ExpItem({ role, company, location, period, description }: { role: string; company: string; location: string; period: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
        <h3 className="text-lg font-bold text-text-primary">{role}</h3>
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

export default function Resume() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-block mb-8 text-accent hover:text-accent-secondary transition-colors">← Back to Home</Link>
        <header className="mb-8 fade-in">
          <h1 className="text-3xl font-bold mb-2">{resumeData.name}</h1>
          <p className="text-xl text-accent mb-4">{resumeData.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <a href={`mailto:${resumeData.contact.email}`} className="hover:text-accent transition-colors">{resumeData.contact.email}</a>
            <a href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
          </div>
        </header>
        <section className="mb-8 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Summary</h2>
          <p className="text-text-secondary leading-relaxed">{resumeData.summary}</p>
        </section>
        <section className="mb-8 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Skills</h2>
          <SkillSection title="Tools" items={resumeData.skills.tools} />
          <SkillSection title="Languages" items={resumeData.skills.languages} />
          <SkillSection title="Frameworks" items={resumeData.skills.frameworks} />
          <SkillSection title="AI & Editors" items={resumeData.skills.ai} />
        </section>
        <section className="mb-8 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Experience</h2>
          {resumeData.experience.map((exp) => <ExpItem key={exp.role} {...exp} />)}
        </section>
        <section className="mb-8 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-text-primary border-b border-bg-surface pb-2">Education</h2>
          {resumeData.education.map((edu) => <EduItem key={edu.degree} {...edu} />)}
        </section>
      </div>
    </main>
  )
}