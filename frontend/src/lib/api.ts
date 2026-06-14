import type { TeamMember, Event, Project } from './types'

const TEAM: TeamMember[] = [
  { id: '1', name: 'Aisha Patel', role: 'President', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=AP&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '2', name: 'Marcus Chen', role: 'VP Engineering', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=MC&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '3', name: 'Priya Singh', role: 'VP Events', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=PS&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '4', name: 'Jordan Kim', role: 'VP Marketing', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=JK&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '5', name: 'Sofia Nguyen', role: 'ML Lead', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=SN&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '6', name: 'Ravi Sharma', role: 'Full-Stack Lead', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=RS&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '7', name: 'Chloe Park', role: 'Design Lead', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=CP&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '8', name: 'Tariq Hassan', role: 'Research Lead', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=TH&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '9', name: 'Emma Liu', role: 'Community Manager', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=EL&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
  { id: '10', name: 'Devan Mills', role: 'Data Engineer', imageUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=DM&backgroundColor=4ade80&fontColor=000000', linkedinUrl: '#' },
]

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Intro to LLMs Workshop',
    category: 'AI WORKSHOP',
    date: 'SPRING 2025',
    description: 'A hands-on introduction to large language models — how they work, how to prompt them effectively, and how to build your first LLM-powered app.',
    registrationUrl: '#',
  },
  {
    id: '2',
    title: 'BYTE × TechTMU Hackathon',
    category: 'HACKATHON',
    date: 'WINTER 2025',
    description: '24 hours to build something that matters. Teams of 2–4 compete across AI, web, and open-ended tracks. Prizes, mentors, and good vibes.',
    registrationUrl: '#',
  },
  {
    id: '3',
    title: 'AI in Industry Panel',
    category: 'PANEL',
    date: 'FALL 2024',
    description: 'Founders and engineers from local AI startups share what it actually takes to ship AI products — warts, pivots, and all.',
  },
  {
    id: '4',
    title: 'End-of-Year Social',
    category: 'SOCIAL',
    date: 'SPRING 2024',
    description: 'Celebrate the year with the BYTE crew. Food, demos, and a showcase of everything members built across our project teams.',
  },
  {
    id: '5',
    title: 'RAG Deep Dive',
    category: 'AI WORKSHOP',
    date: 'WINTER 2024',
    description: 'Go beyond basic prompting — learn retrieval-augmented generation, vector databases, and chunk strategy with real code examples.',
    registrationUrl: '#',
  },
]

const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'BYTE Website',
    description: 'The official BYTE club website — a React + Next.js monorepo with a RAG-powered chatbot that answers questions about the club.',
    techStack: ['React', 'TypeScript', 'Next.js', 'Claude API', 'Tailwind'],
    status: 'in dev',
    githubUrl: 'https://github.com/byte-tmu/byte-site',
  },
  {
    id: '2',
    name: 'CourseCompass',
    description: 'An AI-powered TMU course recommendation tool that maps your interests and completed courses to the best next electives.',
    techStack: ['Python', 'FastAPI', 'Claude API', 'React'],
    status: 'live',
    githubUrl: '#',
  },
  {
    id: '3',
    name: 'StudySync',
    description: 'Turn lecture slides and notes into practice questions and flashcards using an LLM pipeline — built during the 2025 hackathon.',
    techStack: ['Next.js', 'OpenAI', 'PostgreSQL', 'Vercel'],
    status: 'archived',
    githubUrl: '#',
  },
  {
    id: '4',
    name: 'TMU Research Digest',
    description: 'Weekly digest that scrapes TMU faculty publications and generates plain-English summaries — delivered via email and Discord bot.',
    techStack: ['Python', 'Claude API', 'SendGrid', 'Discord.py'],
    status: 'in dev',
    githubUrl: '#',
  },
]

export function getTeam(): TeamMember[] {
  return TEAM
}

export function getEvents(limit?: number): Event[] {
  return limit !== undefined ? EVENTS.slice(0, limit) : EVENTS
}

export function getProjects(limit?: number): Project[] {
  return limit !== undefined ? PROJECTS.slice(0, limit) : PROJECTS
}
