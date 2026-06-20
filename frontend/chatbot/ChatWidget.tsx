import { useState, useRef, useEffect } from 'react'
import type { ChatMessage } from './types'
import { linkify } from './linkify'

const INITIAL_MESSAGES: ChatMessage[] = [
  { role: 'assistant', content: 'Hi! I\'m the BYTE assistant. Ask me anything about the club — how to join, what we build, upcoming events, and more.' },
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [open, messages])

  async function handleSubmit(e: React.FormEvent) {
    //Grab the input, clear the box immediately so it feels responsive
    //Add the user's message to the chat right away
    //Call /api/chat with the message
    //When Gemini replies, append it to the chat

    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    })

    const { reply } = await res.json()
    setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 sm:bottom-6 sm:right-6">
      <div
        className={`chat-panel flex h-[70vh] w-[calc(100vw_-_2rem)] flex-col border border-[#222222] bg-black shadow-2xl sm:h-[28rem] sm:w-80 ${
          open ? 'chat-panel-open' : 'chat-panel-closed'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-[#222222] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-xs tracking-widest text-white uppercase">BYTE Chat</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="text-muted transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] break-words px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-black font-medium'
                    : 'border border-[#222222] bg-surface text-white'
                }`}
              >
                {linkify(msg.content)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="border border-[#222222] bg-surface px-3 py-2 text-sm text-muted">
                thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t border-[#222222] p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about BYTE…"
              className="flex-1 bg-transparent font-mono text-xs text-white placeholder-[#444444] outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="text-muted transition-colors hover:text-accent disabled:opacity-30"
              disabled={!input.trim()}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center border border-accent bg-accent text-black transition-all hover:bg-transparent hover:text-accent"
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  )
}
