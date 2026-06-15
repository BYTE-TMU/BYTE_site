import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
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
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollToTop />
      <PageTransition />
      <Navbar />
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
    </div>
  )
}