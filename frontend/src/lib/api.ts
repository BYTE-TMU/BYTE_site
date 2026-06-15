import type { TeamMember, Event, Project } from './types'

function avatar(seed: string) {
  return `https://api.dicebear.com/8.x/initials/svg?seed=${seed}&backgroundColor=111111&fontColor=4ade80`
}

const TEAM: TeamMember[] = [
  // President
  { id: '1', name: 'Meet Patadia', role: 'President', group: 'president', imageUrl: avatar('MP'), linkedinUrl: '#' },

  // Vice Presidents
  { id: '2', name: 'Arshiya Das', role: 'VP of Events', group: 'vp', imageUrl: avatar('AD'), linkedinUrl: '#' },
  { id: '3', name: 'Vashisht Pawa', role: 'VP of Finance', group: 'vp', imageUrl: avatar('VP'), linkedinUrl: '#' },
  { id: '4', name: 'Areej Ubaid', role: 'VP of Growth', group: 'vp', imageUrl: avatar('AU'), linkedinUrl: '#' },
  { id: '5', name: 'Naetri Niranjan', role: 'VP of Marketing', group: 'vp', imageUrl: avatar('NN'), linkedinUrl: '#' },
  { id: '6', name: 'Jacob Mobin', role: 'VP of Technology', group: 'vp', imageUrl: avatar('JM'), linkedinUrl: '#' },

  // Leadership
  { id: '7', name: 'Pearl Ved', role: 'Chief of Staff', group: 'leadership', imageUrl: avatar('PV'), linkedinUrl: '#' },
  { id: '8', name: 'Yeji Lee', role: 'Head of Strategic Operations', group: 'leadership', imageUrl: avatar('YL'), linkedinUrl: '#' },
  { id: '9', name: 'Hetvi Modi', role: 'Head of Technical Operations', group: 'leadership', imageUrl: avatar('HM'), linkedinUrl: '#' },
  { id: '10', name: 'Rayan Roshan', role: 'Project Experience Lead', group: 'leadership', imageUrl: avatar('RR'), linkedinUrl: '#' },

  // Directors
  { id: '11', name: 'Prisha Thakkar', role: 'Director of AI/ML Engineering', group: 'directors', imageUrl: avatar('PT'), linkedinUrl: '#' },
  { id: '12', name: 'Johan Philip', role: 'Director of Frontend Engineering', group: 'directors', imageUrl: avatar('JP'), linkedinUrl: '#' },

  // Technical
  { id: '13', name: 'Nancy Maliackel', role: 'AI/ML Engineer', group: 'technical', imageUrl: avatar('NM'), linkedinUrl: '#' },
  { id: '14', name: 'Gajanan Vigneswaran', role: 'AI/ML Engineer', group: 'technical', imageUrl: avatar('GV'), linkedinUrl: '#' },
  { id: '15', name: 'Sanjana Urba', role: 'AI/ML Engineer', group: 'technical', imageUrl: avatar('SU'), linkedinUrl: '#' },
  { id: '16', name: 'Maha Baig', role: 'Backend Engineer', group: 'technical', imageUrl: avatar('MB'), linkedinUrl: '#' },
  { id: '17', name: 'Elena Kim', role: 'Backend Engineer', group: 'technical', imageUrl: avatar('EK'), linkedinUrl: '#' },
  { id: '18', name: 'Kashmala Fareed', role: 'Backend Engineer', group: 'technical', imageUrl: avatar('KF'), linkedinUrl: '#' },
  { id: '19', name: 'Ethan Cha', role: 'Frontend Engineer', group: 'technical', imageUrl: avatar('EC'), linkedinUrl: '#' },
  { id: '20', name: 'Stephen Nguyen', role: 'Frontend Engineer', group: 'technical', imageUrl: avatar('SN'), linkedinUrl: '#' },
  { id: '21', name: 'Anthony Ma', role: 'Frontend Engineer', group: 'technical', imageUrl: avatar('AM'), linkedinUrl: '#' },

  // Strategic
  { id: '22', name: 'Nyra Thakur', role: 'Community Associate', group: 'strategic', imageUrl: avatar('NT'), linkedinUrl: '#' },
  { id: '23', name: 'Abanshaji Lukose', role: 'Community Associate', group: 'strategic', imageUrl: avatar('AL'), linkedinUrl: '#' },
  { id: '24', name: 'Nidhi Biswas', role: 'Events Associate', group: 'strategic', imageUrl: avatar('NB'), linkedinUrl: '#' },
  { id: '25', name: 'Michael Aya-ay', role: 'Events Associate', group: 'strategic', imageUrl: avatar('MA'), linkedinUrl: '#' },
  { id: '26', name: 'Areej Tariq', role: 'Events Associate', group: 'strategic', imageUrl: avatar('AT'), linkedinUrl: '#' },
  { id: '27', name: 'Umar Muhammad', role: 'Finance Associate', group: 'strategic', imageUrl: avatar('UM'), linkedinUrl: '#' },
  { id: '28', name: 'Rishita Patel', role: 'Finance Associate', group: 'strategic', imageUrl: avatar('RP'), linkedinUrl: '#' },
  { id: '29', name: 'Angelina Tibayan', role: 'Finance Associate', group: 'strategic', imageUrl: avatar('ATi'), linkedinUrl: '#' },
  { id: '30', name: 'Sabesen Pathmanathan', role: 'Operations Associate', group: 'strategic', imageUrl: avatar('SP'), linkedinUrl: '#' },
  { id: '31', name: 'Affan Siddiqui', role: 'Operations Associate', group: 'strategic', imageUrl: avatar('AS'), linkedinUrl: '#' },
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
    description: 'The official BYTE club website — a React + Vite monorepo with a RAG-powered chatbot that answers questions about the club.',
    techStack: ['React', 'TypeScript', 'Vite', 'Claude API', 'Tailwind'],
    status: 'in dev',
    githubUrl: '#',
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

export function getTeam(): TeamMember[] { return TEAM }
export function getEvents(limit?: number): Event[] {
  return limit !== undefined ? EVENTS.slice(0, limit) : EVENTS
}
export function getProjects(limit?: number): Project[] {
  return limit !== undefined ? PROJECTS.slice(0, limit) : PROJECTS
}