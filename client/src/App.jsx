import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { WhatsAppFloating } from './components/WhatsAppButton'

// Home / Work / Case study are the live-demo path — bundled eagerly so they
// never show a loading state in front of a client. The rest are code-split.
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'

const Services = lazy(() => import('./pages/Services'))
const Team = lazy(() => import('./pages/Team'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return <div className="min-h-[60vh]" />
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 pb-20 sm:pb-0">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppFloating />
    </div>
  )
}
