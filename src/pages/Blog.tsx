import { useState } from 'react'

function BlogPlaceholder() {
  const [loading, setLoading] = useState(true)
  const [maximized, setMaximized] = useState(false)

  return (
    <div className={`terminal-window mb-6 fade-in ${maximized ? 'window-maximized' : ''}`}>
      <div className="terminal-titlebar">
        <button type="button" className="terminal-btn terminal-btn-red hover:opacity-80 transition-opacity" title="Minimize" />
        <button type="button" className="terminal-btn terminal-btn-yellow hover:opacity-80 transition-opacity" title="Close" />
        <button type="button" onClick={() => setMaximized(!maximized)} className="terminal-btn terminal-btn-green hover:opacity-80 transition-opacity" title="Maximize" />
        <span className="terminal-title">~/blog$ curl https://blog.diegobarrosaraya.com/</span>
      </div>
      <div className={`terminal-content ${maximized ? '' : 'h-[70vh]'}`}>
        {loading && (
          <div className="flex items-center justify-center h-full text-text-secondary">
            <span className="terminal-prompt">Loading blog...</span>
          </div>
        )}
        <iframe 
          src="https://blog.diegobarrosaraya.com/"
          className="w-full h-full rounded-lg border border-bg-surface"
          title="Blog"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  )
}

export default function Blog() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <BlogPlaceholder />
      </div>
    </main>
  )
}