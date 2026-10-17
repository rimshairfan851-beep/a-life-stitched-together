import { useCallback, useState } from 'react';
import { useScrollReveal } from './hooks.js';
import { projects } from './data.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Story from './components/Story.jsx';
import Projects from './components/Projects.jsx';
import ProjectDialog from './components/ProjectDialog.jsx';
import Skills from './components/Skills.jsx';
import Music from './components/Music.jsx';
import Movies from './components/Movies.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useScrollReveal();
  const [openId, setOpenId] = useState(null);
  const openProject = useCallback((id) => setOpenId(id), []);
  const closeProject = useCallback(() => setOpenId(null), []);
  const project = projects.find((p) => p.id === openId) || null;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Story onOpenProject={openProject} />
        <Projects onOpenProject={openProject} />
        <Skills />
        <Music />
        <Movies />
        <Contact />
      </main>
      <Footer />
      <ProjectDialog project={project} onClose={closeProject} onNavigate={openProject} />
    </>
  );
}
