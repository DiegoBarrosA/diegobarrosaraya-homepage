import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaLinkedin, FaPaperPlane } from 'react-icons/fa'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    try {
      const FORMSPREE_FORM_ID = 'YOUR_FORM_ID'
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) setFormState('success')
      else setFormState('error')
    } catch { setFormState('error') }
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="inline-block mb-8 text-accent hover:text-accent-secondary transition-colors flex items-center gap-2">
          <span>←</span> Back to Home
        </Link>
        <header className="mb-8 fade-in">
          <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
          <p className="text-text-secondary">Have a question or want to work together?</p>
        </header>
        {formState === 'success' ? (
          <div className="bg-success/10 border border-success rounded-lg p-6 text-center fade-in">
            <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
            <p className="text-text-secondary mb-4">I'll get back to you soon.</p>
            <button onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', message: '' }) }} className="nav-item">Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 fade-in">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Name</label>
              <input type="text" name="name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required
                className="w-full px-4 py-3 bg-bg-secondary border border-bg-surface rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Email</label>
              <input type="email" name="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required
                className="w-full px-4 py-3 bg-bg-secondary border border-bg-surface rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Message</label>
              <textarea name="message" value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} required rows={5}
                className="w-full px-4 py-3 bg-bg-secondary border border-bg-surface rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent resize-none" placeholder="Your message..." />
            </div>
            {formState === 'error' && <div className="bg-error/10 border border-error rounded-lg p-4 text-error">Something went wrong. Email me directly at contact@diegobarrosaraya.com</div>}
            <button type="submit" disabled={formState === 'submitting'} className="w-full nav-item flex items-center justify-center gap-2 disabled:opacity-50">
              <FaPaperPlane /> {formState === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
        <div className="mt-12 pt-8 border-t border-bg-surface fade-in text-center">
          <p className="text-text-secondary mb-4">Or reach out directly:</p>
          <div className="flex justify-center gap-6">
            <a href="mailto:contact@diegobarrosaraya.com" className="text-text-secondary hover:text-accent transition-colors flex items-center gap-2">
              <FaEnvelope /> contact@diegobarrosaraya.com
            </a>
            <a href="https://linkedin.com/in/diegobarrosaraya" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors flex items-center gap-2">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}