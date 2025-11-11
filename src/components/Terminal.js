import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = ({ onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const terminalBodyRef = useRef(null);
  const audioContextRef = useRef(null);

  // Fonction pour générer un son de clavier réaliste
  const playKeySound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      
      // Si l'AudioContext est suspendu, le reprendre
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      // Créer un son de clavier plus réaliste avec plusieurs oscillateurs
      const now = audioContext.currentTime;
      
      // Son principal (fréquence basse)
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);
      
      osc1.frequency.value = 200 + Math.random() * 100;
      osc1.type = 'square';
      
      gain1.gain.setValueAtTime(0.05, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      osc1.start(now);
      osc1.stop(now + 0.05);
      
      // Son secondaire (fréquence haute pour le "clic")
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      
      osc2.frequency.value = 1000 + Math.random() * 500;
      osc2.type = 'sine';
      
      gain2.gain.setValueAtTime(0.03, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      
      osc2.start(now);
      osc2.stop(now + 0.03);
    } catch (error) {
      // Ignorer les erreurs audio (peut être bloqué par le navigateur)
      console.log('Audio not available');
    }
  };

  const terminalCommands = [
    { type: 'command', text: 'myphz@archlinux:$ whoami', typingSpeed: 20 },
    { type: 'output', text: 'christ', delay: 150 },
    { type: 'command', text: 'myphz@archlinux:$ cd portfolio', typingSpeed: 20 },
    { type: 'output', text: '', delay: 100 },
    { type: 'command', text: 'myphz@archlinux:$ npm run dev', typingSpeed: 20 },
    { type: 'output', text: 'Server starting...', delay: 200 },
    { type: 'output', text: '✓ Compiled successfully', delay: 200 },
    { type: 'output', text: 'Portfolio loaded!', delay: 300 },
  ];

  useEffect(() => {
    if (currentCommandIndex >= terminalCommands.length) {
      setTimeout(() => {
        setShowConfirmation(true);
      }, 800);
      return;
    }

    const command = terminalCommands[currentCommandIndex];

    if (command.type === 'command') {
      // Commencer à taper la commande
      setIsTyping(true);
      setCurrentText('');
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex < command.text.length) {
          setCurrentText(command.text.substring(0, charIndex + 1));
          // Jouer le son de clavier pour chaque caractère (sauf espaces)
          if (command.text[charIndex] !== ' ') {
            playKeySound();
          }
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setDisplayedLines(prev => [...prev, { type: 'command', text: command.text }]);
          setCurrentText('');
          setTimeout(() => {
            setCurrentCommandIndex(prev => prev + 1);
          }, 300);
        }
      }, command.typingSpeed || 30);

      return () => clearInterval(typingInterval);
    } else if (command.type === 'output') {
      // Afficher la sortie directement
      const outputTimer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, { type: 'output', text: command.text }]);
        setCurrentCommandIndex(prev => prev + 1);
      }, command.delay || 500);

      return () => clearTimeout(outputTimer);
    }
  }, [currentCommandIndex]);

  useEffect(() => {
    // Auto-scroll vers le bas
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [displayedLines, currentText, showConfirmation]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleConfirm = () => {
    playKeySound();
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div className={`terminal-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button terminal-button-close"></span>
            <span className="terminal-button terminal-button-minimize"></span>
            <span className="terminal-button terminal-button-maximize"></span>
          </div>
          <div className="terminal-title">Terminal - portfolio</div>
        </div>
        <div className="terminal-body" ref={terminalBodyRef}>
          {displayedLines.map((line, index) => (
            <div key={index} className={`terminal-line ${line.type}`}>
              {line.type === 'command' ? (
                <span className="terminal-prompt">{line.text}</span>
              ) : (
                <span className="terminal-output">{line.text}</span>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="terminal-line command">
              <span className="terminal-prompt">{currentText}</span>
              <span className={`terminal-cursor ${showCursor ? 'visible' : ''}`}>█</span>
            </div>
          )}
          {!isTyping && currentCommandIndex < terminalCommands.length && !showConfirmation && (
            <div className="terminal-line command">
              <span className="terminal-prompt">myphz@archlinux:$ </span>
              <span className={`terminal-cursor ${showCursor ? 'visible' : ''}`}>█</span>
            </div>
          )}
          {showConfirmation && (
            <div className="terminal-confirmation">
              <div className="confirmation-message">
                <span className="confirmation-text">
                  <span className="confirmation-prompt">[?]</span> Entrer dans mon univers ? (y/n)
                </span>
                <span className={`terminal-cursor ${showCursor ? 'visible' : ''}`}>█</span>
              </div>
              <div className="confirmation-buttons">
                <button className="confirm-btn yes-btn" onClick={handleConfirm}>
                  <span className="btn-text">Y</span>
                  <span className="btn-label">Oui</span>
                </button>
                <button className="confirm-btn no-btn" onClick={() => {
                  playKeySound();
                  setShowConfirmation(false);
                  setCurrentCommandIndex(0);
                  setDisplayedLines([]);
                }}>
                  <span className="btn-text">N</span>
                  <span className="btn-label">Non</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;

