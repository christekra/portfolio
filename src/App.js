import React, { useState } from 'react';
import './App.css';
import Terminal from './components/Terminal';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Guide from './components/Guide';

function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    setTimeout(() => {
      setShowPortfolio(true);
    }, 500);
  };

  return (
    <div className="App">
      {showTerminal && <Terminal onComplete={handleTerminalComplete} />}
      {showPortfolio && (
        <>
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Interests />
            <Contact />
          </main>
          <Footer />
          <Guide />
        </>
      )}
    </div>
  );
}

export default App;
