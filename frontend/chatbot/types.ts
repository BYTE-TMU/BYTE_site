export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  pages?: string[]
}
