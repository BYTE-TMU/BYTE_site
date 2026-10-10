export type SessionKind =
  | 'Welcome'
  | 'Keynote'
  | 'Workshop'
  | 'Talk'
  | 'Panel'
  | 'Competition'
  | 'Activity'
  | 'Networking'
  | 'Break'
  | 'Announcement'
  | 'Gala'

export interface Speaker {
  name: string
  role?: string
  org?: string
}

export interface Session {
  start: string
  end: string
  kind: SessionKind
  title: string
  /** One sentence. Keep it to what the title, schedule and promo copy support. */
  description: string
  speakers?: Speaker[]
}

export interface AgendaDay {
  label: string
  date: string
  theme: string
  sessions: Session[]
}

const MEET: Speaker = { name: 'Meet Patadia', role: 'President', org: 'BYTE' }
const YEJI: Speaker = { name: 'Yeji Lee', role: 'Co-President', org: 'BYTE' }
const JUNIOR: Speaker = { name: 'Junior Williams', role: 'Industry Research Fellow', org: 'Rogers CyberSecure Catalyst' }
const MILOS: Speaker = { name: 'Milos Stojadinovic', role: 'Cyber Fellow & Vice President', org: 'RBC Adversary Emulation' }

export const DAYS: AgendaDay[] = [
  {
    label: 'Day 1',
    date: 'Sat · Oct 3',
    theme: 'Learn & Connect',
    sessions: [
      {
        start: '9:00 AM', end: '9:45 AM', kind: 'Welcome',
        title: 'Registration, Breakfast and Program Commencement',
        description: "Doors opened with registration and breakfast, and BYTE's leadership welcomed everyone to the summit.",
        speakers: [MEET, YEJI],
      },
      {
        start: '9:45 AM', end: '10:00 AM', kind: 'Keynote',
        title: 'Opening Keynote',
        description: 'The first keynote of the weekend kicked off two days of talks, workshops and challenges.',
        speakers: [JUNIOR],
      },
      {
        start: '10:00 AM', end: '10:15 AM', kind: 'Talk',
        title: 'Introduction to Cybersecurity',
        description: "A quick primer from the summit's technical co-chair to get everyone on the same page before the deep dives.",
        speakers: [{ name: 'Nancy Maliackel', role: 'Technical Co-Chair', org: 'TMU Cyber Summit' }],
      },
      {
        start: '10:15 AM', end: '11:45 AM', kind: 'Workshop',
        title: 'Eliminating LLM Hallucinations in Active Threat Remediation & Building Quantum-Ready SOCs',
        description: 'Showed how a real SOC catches and contains threats with AI you can trust, from taming LLM hallucinations to quantum-ready design.',
        speakers: [{ name: 'Jonathan Catalano MacPherson-Gray', role: 'Founder', org: 'NEX Labs' }],
      },
      {
        start: '11:45 AM', end: '4:30 PM', kind: 'Activity',
        title: 'SiberX Escape Room',
        description: 'SiberX turned the afternoon into a series of escape rooms, running alongside the other sessions.',
      },
      {
        start: '12:00 PM', end: '1:00 PM', kind: 'Panel',
        title: 'Unpacking the Intern Experience',
        description: 'Five panelists unpacked what the intern experience is really like.',
        speakers: [
          { name: 'Walker Egsgard' },
          { name: 'Auswah Imaan' },
          { name: 'Mikayla Morrison' },
          { name: 'Kshitij Chada' },
          { name: 'Azeem Cochinwala' },
        ],
      },
      {
        start: '1:00 PM', end: '1:45 PM', kind: 'Break',
        title: 'Lunch',
        description: 'A midday break to refuel and mingle.',
      },
      {
        start: '1:45 PM', end: '2:45 PM', kind: 'Networking',
        title: 'Open Networking / Tabling Session 1',
        description: 'Open time to meet fellow attendees and chat with organizations at their tables.',
      },
      {
        start: '3:00 PM', end: '3:30 PM', kind: 'Talk',
        title: 'Engineering Trust in AI Agents — Permissions, Proof, and Accountability',
        description: 'A talk on how AI agents can earn our trust through permissions, proof and accountability.',
        speakers: [JUNIOR],
      },
      {
        start: '3:30 PM', end: '4:30 PM', kind: 'Workshop',
        title: 'Cloud Elevated: Balancing Speed, Scale & Security',
        description: 'A cloud session for newcomers on balancing speed, scale and security, with no experience needed.',
        speakers: [{ name: 'Sandipkumar Patel', role: 'Cloud Engineer & AWS User Group Leader' }],
      },
      {
        start: '4:30 PM', end: '5:00 PM', kind: 'Announcement',
        title: 'Closing Announcement',
        description: 'Wrapped up Day 1 with announcements on what was coming next.',
      },
    ],
  },
  {
    label: 'Day 2',
    date: 'Sun · Oct 4',
    theme: 'Build & Celebrate',
    sessions: [
      {
        start: '9:00 AM', end: '9:30 AM', kind: 'Welcome',
        title: 'Registration, Breakfast and Program Commencement',
        description: 'Day 2 started the same way: breakfast, check-in and a welcome from BYTE.',
        speakers: [MEET, YEJI],
      },
      {
        start: '9:30 AM', end: '10:00 AM', kind: 'Keynote',
        title: 'Opening Keynote',
        description: 'Day 2 opened with a keynote right before everyone dove into the CTF.',
        speakers: [{ name: 'Randy Purse', role: 'Senior Practice Lead', org: 'Rogers CyberSecure Catalyst' }],
      },
      {
        start: '10:00 AM', end: '11:30 AM', kind: 'Competition',
        title: 'TMU Cyber Summit CTF',
        description: "A gamified, beginner-level capture-the-flag competition built in-house, so you didn't need to be an expert to join.",
      },
      {
        start: '11:45 AM', end: '12:00 PM', kind: 'Announcement',
        title: 'Adderbee Product Announcement',
        description: 'Adderbee took the stage to share a product announcement.',
      },
      {
        start: '12:00 PM', end: '12:45 PM', kind: 'Break',
        title: 'Lunch',
        description: "Lunch to refuel before the afternoon's corporate panel.",
      },
      {
        start: '1:00 PM', end: '1:45 PM', kind: 'Panel',
        title: 'Corporate Cybersecurity Panel',
        description: 'Five security professionals from ISACA, KPMG, Amazon, CIBC and IDMWorks shared views from inside the industry.',
        speakers: [
          { name: 'Harsh Sahni', org: 'ISACA' },
          { name: 'Mohammad Suleman', org: 'KPMG' },
          { name: 'Kai Iyer', org: 'Amazon' },
          { name: 'Steve M Brown', org: 'CIBC' },
          { name: 'Catherine Lee', org: 'IDMWorks' },
        ],
      },
      {
        start: '2:00 PM', end: '3:30 PM', kind: 'Workshop',
        title: 'Know Your Enemy: Adversary Emulation',
        description: 'Attendees learned how to think like an adversary from one of the earliest contributors to MITRE ATT&CK.',
        speakers: [MILOS],
      },
      {
        start: '3:30 PM', end: '3:45 PM', kind: 'Announcement',
        title: 'Transfer-to-Gala Announcement',
        description: 'The details for getting from the summit over to the evening gala.',
      },
      {
        start: '6:30 PM', end: '6:45 PM', kind: 'Gala',
        title: 'Awards Ceremony',
        description: "The gala opened with the awards ceremony, featuring TMU's Dean of Science.",
        speakers: [{ name: 'David Cramb', role: 'Dean, Faculty of Science', org: 'TMU' }],
      },
      {
        start: '6:45 PM', end: '7:00 PM', kind: 'Gala',
        title: 'Closing Keynote',
        description: 'Milos Stojadinovic returned to close out the summit with one last keynote.',
        speakers: [MILOS],
      },
      {
        start: '7:00 PM', end: '9:00 PM', kind: 'Gala',
        title: 'Dinner',
        description: 'A gala dinner to celebrate two days of cybersecurity.',
      },
    ],
  },
]
