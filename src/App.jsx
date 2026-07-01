import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import SideRail from './components/SideRail';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => (
  <ThemeProvider>
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-clip">
        {/* Atmospheric background layers */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-mesh" />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-grid mask-radial opacity-50" />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.035] dark:opacity-[0.055]" />

        <CursorGlow />
        <ScrollProgress />
        <SideRail />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  </ThemeProvider>
);

export default App;
