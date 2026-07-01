import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import BYTESnake from './components/BYTESnake'
import { useKonamiCode } from './hooks/useKonamiCode'
import Footer from './components/Footer'
import ChatWidget from '../chatbot/ChatWidget'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Events from './pages/Events'
import Projects from './pages/Projects'
import Team from './pages/Team.tsx'
import News from './pages/News.tsx'
import Contact from './pages/Support.tsx'
import CyberSummit from './pages/CyberSummit'

export default function App() {
  const [showSnake, setShowSnake] = useState(false)
  useKonamiCode(() => setShowSnake(true))

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollToTop />
      <PageTransition />
      <Navbar onEasterEgg={() => setShowSnake(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cybersecurity" element={<CyberSummit />} />
      </Routes>
      <Footer />
      <ChatWidget />
      <Analytics />
      {showSnake && <BYTESnake onClose={() => setShowSnake(false)} />}
    </div>
  )
}
