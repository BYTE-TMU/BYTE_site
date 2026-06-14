export interface TeamMember {
  id: string
  name: string
  role: string
  imageUrl: string
  linkedinUrl?: string
}

export interface Event {
  id: string
  title: string
  category: string
  date: string
  description: string
  imageUrl?: string
  registrationUrl?: string
}

export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  status: 'in dev' | 'live' | 'archived'
  githubUrl?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}
