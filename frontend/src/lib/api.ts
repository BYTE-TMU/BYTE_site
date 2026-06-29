import type { TeamMember, Event, Project, Announcement } from './types'

function avatar(seed: string) {
  return `https://api.dicebear.com/8.x/initials/svg?seed=${seed}&backgroundColor=111111&fontColor=4ade80`
}

const TEAM: TeamMember[] = [
  // President
  { id: '1', name: 'Meet Patadia', role: 'President', group: 'president', imageUrl: avatar('MP'), linkedinUrl: '#' },

  // Vice Presidents
  { id: '2', name: 'Arshiya Das', role: 'VP of Events', group: 'vp', imageUrl: avatar('AD'), linkedinUrl: '#' },
  { id: '3', name: 'Vashisht Pawa', role: 'VP of Finance', group: 'vp', imageUrl: avatar('VP'), linkedinUrl: '#' },
  { id: '4', name: 'Areej Ubaid', role: 'Chief of Strategy', group: 'vp', imageUrl: avatar('AU'), linkedinUrl: '#' },
  { id: '5', name: 'Naetri Niranjan', role: 'VP of Marketing', group: 'vp', imageUrl: avatar('NN'), linkedinUrl: '#' },
  { id: '6', name: 'Jacob Mobin', role: 'VP of Technology', group: 'vp', imageUrl: avatar('JM'), linkedinUrl: '#' },

  // Leadership
  { id: '7', name: 'Pearl Ved', role: 'Chief of Staff', group: 'leadership', imageUrl: avatar('PV'), linkedinUrl: '#' },
  { id: '8', name: 'Yeji Lee', role: 'Head of Strategic Operations', group: 'leadership', imageUrl: avatar('YL'), linkedinUrl: '#' },
  { id: '9', name: 'Hetvi Modi', role: 'Chief of Technology', group: 'leadership', imageUrl: avatar('HM'), linkedinUrl: '#' },
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
    title: 'BYTE Pitch Day',
    category: 'PITCH EVENT',
    date: 'JULY 4, 2026',
    description: 'Have an idea for a project you\'d love to build? Pitch it at BYTE Pitch Day — TMU students will present original project ideas for the chance to have them developed during the Fall 2026 semester.',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf8BGx0sShB8zdzl0jUF8dwkwvmFaM7CP7WQy-yugTxU3xoNg/viewform',
  },
  {
    id: '2',
    title: 'OpenClaw 2026',
    category: 'HACKATHON',
    date: 'MAY 2026',
    description: 'Hackathons test your builds. This one tested everything else too. When the lights went out mid-event, we found a new spot and got back to it — 200+ attendees, incredible ideas, real connections, and deserving winners. Co-organized with @cryptochicks.ca.',
  },
  {
    id: '3',
    title: 'TMU Tech Week',
    category: 'CONFERENCE',
    date: 'SPRING 2026',
    description: 'A week-long celebration of technology and innovation at TMU, featuring workshops, panels, and networking sessions with industry leaders and student builders.',
  },
]

const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'SecureBYTE',
    description: 'A Python-based AI vulnerability scanner that integrates static analysis and LLMs to identify security flaws and logical issues. Combines traditional analysis with natural language reasoning to provide insights, suggest remediations, and generate automated test cases.',
    techStack: ['Python', 'Flask', 'React', 'JavaScript', 'TailwindCSS', 'Firebase'],
    status: 'live',
    githubUrl: 'https://github.com/byte-org/securebyte',
  },
  {
    id: '2',
    name: 'Yapp',
    description: 'The campus social platform designed exclusively for TMU students. Connect with your community, discover amazing events across downtown Toronto, and explore your urban campus like never before.',
    techStack: ['Python', 'Flask', 'React', 'JavaScript', 'TailwindCSS', 'MongoDB', 'AWS'],
    status: 'live',
    liveUrl: 'https://yapp-mu.com',
  },
]

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'TMU Tech Week 2026 is Coming!',
    date: 'JAN 15, 2026',
    imageUrl: '/images/events/Tmutechweek.png',
    body: 'Get ready for TMU Tech Week 2026 on February 15th! BYTE is hosting this exciting week of tech events, bringing together students and industry leaders to explore AI, machine learning, and software development. Mark your calendars!',
  },
  {
    id: '2',
    title: 'BYTE Demo Day — SecureBYTE Showcase',
    date: 'DEC 1, 2025',
    imageUrl: '/images/events/Demoday.JPG',
    body: 'We hosted an incredible Demo Day featuring our flagship SecureBYTE cybersecurity project! Thank you to everyone who attended our panel discussion on the future of security solutions and innovation at BYTE.',
  },
  {
    id: '3',
    title: 'BYTE at Google DevFest Toronto 2025',
    date: 'NOV 15, 2025',
    imageUrl: '/images/events/devfestevent.JPG',
    body: 'BYTE represented at Google DevFest Toronto 2025, one of Canada\'s largest developer conferences! We connected with thousands of developers, showcased our SecureBYTE project, and networked with industry professionals.',
  },
  {
    id: '4',
    title: 'BYTE Launch Event Success!',
    date: 'SEP 29, 2025',
    imageUrl: '/images/events/bytelaunch.jpeg',
    body: 'Our official launch event was a huge success! We welcomed new members, presented our vision for the year, and introduced SecureBYTE. Thanks to everyone who joined us at the George Vari Engineering Building.',
  },
  {
    id: '5',
    title: 'Find BYTE at the TMSU Street Fair',
    date: 'SEP 10, 2025',
    imageUrl: '/images/events/tmsustreetfair.jpeg',
    body: 'We had an amazing time meeting students at the TMSU Campus Street Fair! Thanks to everyone who stopped by to learn about BYTE and our hands-on approach to AI development and open-source projects.',
  },
]

export function getTeam(): TeamMember[] { return TEAM }
export function getEvents(limit?: number): Event[] {
  return limit !== undefined ? EVENTS.slice(0, limit) : EVENTS
}
export function getProjects(limit?: number): Project[] {
  return limit !== undefined ? PROJECTS.slice(0, limit) : PROJECTS
}
export function getAnnouncements(): Announcement[] { return ANNOUNCEMENTS }