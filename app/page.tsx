'use client'

import { useState } from 'react'

export default function Home() {
  const [content, setContent] = useState('')
  const [ttl, setTtl] = useState('')
  const [maxViews, setMaxViews] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? parseInt(ttl) : undefined,
          max_views: maxViews ? parseInt(maxViews) : undefined
        })
      })
      const data = await res.json()
      if (res.ok) {
        setUrl(data.url)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to create paste')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="container">
      <h1>Create a Paste</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your paste content here..."
            rows={12}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ttl">TTL (seconds, optional):</label>
            <input
              id="ttl"
              type="number"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              min="1"
              placeholder="e.g., 3600"
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxViews">Max Views (optional):</label>
            <input
              id="maxViews"
              type="number"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
              min="1"
              placeholder="e.g., 10"
            />
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Paste...' : 'Create Paste'}
        </button>
      </form>
      {url && (
        <div className="success">
          <p>Share this link:</p>
          <input type="text" value={url} readOnly className="link-input" />
          <div className="button-row">
            <button onClick={() => window.open(url, '_blank')} className="link-btn">
              Open Link
            </button>
            <button onClick={copyToClipboard} className="copy-btn">
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  )
}