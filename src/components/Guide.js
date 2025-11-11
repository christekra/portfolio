import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaMobileAlt, FaUser, FaEnvelope, FaTimes, FaRocket, FaThumbsUp, FaHandPointer, FaPlay, FaStop } from 'react-icons/fa';
import './Guide.css';

const TOUR_STEPS = [
  {
    sectionId: 'hero',
    tooltipMessage: "🚀 On commence par l'accueil : découvre l'univers de Christ Ekra.",
    dialogMessage: "🚀 Bienvenue ! Je te présente rapidement l'accueil avant de poursuivre.",
    gesture: 'waving',
    expression: 'happy',
    duration: 4000,
  },
  {
    sectionId: 'about',
    tooltipMessage: "🧠 Ici, tu peux découvrir son parcours et sa vision.",
    dialogMessage: "🧠 Regarde son parcours : études, expériences et mindset.",
    gesture: 'pointing',
    expression: 'thinking',
    duration: 4500,
  },
  {
    sectionId: 'skills',
    tooltipMessage: "💻 Ses compétences clés : React, Laravel, Flutter, et plus encore.",
    dialogMessage: "💻 Voici ses compétences principales et ses stacks favorites.",
    gesture: 'pointing',
    expression: 'happy',
    duration: 4500,
  },
  {
    sectionId: 'projects',
    tooltipMessage: "🚀 Ses projets phares : clique pour découvrir chaque réalisation.",
    dialogMessage: "🚀 On enchaîne avec ses projets web et mobiles les plus marquants.",
    gesture: 'pointing',
    expression: 'surprised',
    duration: 5000,
  },
  {
    sectionId: 'contact',
    tooltipMessage: "📩 Envie de discuter ? Ce formulaire est là pour toi.",
    dialogMessage: "📩 Termine par le contact pour lui écrire directement.",
    gesture: 'waving',
    expression: 'thumbsup',
    duration: 5000,
  },
];

const Guide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isIdle, setIsIdle] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expression, setExpression] = useState('happy'); // happy, surprised, thinking, thumbsup, pointing
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [gesture, setGesture] = useState(null); // pointing, waving, dancing
  const [scrollDirection, setScrollDirection] = useState('down');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [pendingTourPrompt, setPendingTourPrompt] = useState(false);
  const guideRef = useRef(null);
  const idleTimerRef = useRef(null);
  const mouseFollowRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollSpeed = useRef(0);
  const longInactivityTimer = useRef(null);
  const tourTimeoutRef = useRef(null);
  const skillHighlightIndex = useRef(-1);
  const skillHighlightTimeout = useRef(null);
  const skillHighlightActive = useRef(false);

  const clearTourTimeout = useCallback(() => {
    if (tourTimeoutRef.current) {
      clearTimeout(tourTimeoutRef.current);
      tourTimeoutRef.current = null;
    }
  }, []);

  const stopGuidedTour = useCallback(() => {
    if (!isTourActive) return;
    clearTourTimeout();
    setIsTourActive(false);
    setTourStepIndex(0);
    setGesture(null);
    setExpression('happy');
    setShowTooltip(false);
    setPendingTourPrompt(false);
    setHoveredElement(null);
  }, [clearTourTimeout, isTourActive]);

  const finishGuidedTour = useCallback(() => {
    if (!isTourActive) return;
    clearTourTimeout();
    setIsTourActive(false);
    setTourStepIndex(0);
    setGesture(null);
    setExpression('thumbsup');
    setShowTooltip(true);
    setTooltipMessage("✅ Tour terminé ! Tu peux explorer librement maintenant.");
    tourTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
      setExpression('happy');
    }, 4000);
    setPendingTourPrompt(false);
    setHoveredElement(null);
  }, [clearTourTimeout, isTourActive]);

  const goToTourStep = useCallback((index) => {
    clearTourTimeout();

    if (index >= TOUR_STEPS.length) {
      finishGuidedTour();
      return;
    }

    const step = TOUR_STEPS[index];
    setIsTourActive(true);
    setTourStepIndex(index);
    setGesture(step.gesture || null);
    setExpression(step.expression || 'happy');
    setShowTooltip(true);
    setTooltipMessage(step.tooltipMessage);

    const element = document.getElementById(step.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    tourTimeoutRef.current = setTimeout(() => {
      goToTourStep(index + 1);
    }, step.duration || 4500);
  }, [finishGuidedTour, clearTourTimeout]);

  const startGuidedTour = useCallback(() => {
    if (isTourActive) return;
    clearTourTimeout();
    setPendingTourPrompt(false);
    setIsOpen(false);
    setGesture(null);
    setExpression('happy');
    setShowTooltip(false);
    setHoveredElement(null);
    clearTimeout(idleTimerRef.current);
    clearTimeout(longInactivityTimer.current);
    goToTourStep(0);
  }, [clearTourTimeout, goToTourStep, isTourActive]);

  const SKILL_HIGHLIGHTS = useMemo(() => ([
    { name: 'Laravel', message: "⚙️ Laravel : API REST sécurisée, jobs asynchrones et Auth personnalisée." },
    { name: 'React', message: "⚛️ React : interfaces dynamiques avec hooks avancés et animations fluides." },
    { name: 'PostgreSQL', message: "💾 PostgreSQL : requêtes optimisées, vues matérialisées et indexes GIN." },
    { name: 'MongoDB', message: "🍃 MongoDB : schémas flexibles, agrégations puissantes et change streams." },
    { name: 'Redis', message: "⚡ Redis : cache distribué, files d’attente en temps réel et rate limiting." },
    { name: 'Docker', message: "🐳 Docker : environnements isolés, CI/CD simplifiés et déploiements rapides." },
  ]), []);

  const SKILL_MESSAGES = useMemo(() => ({
    laravel: "⚙️ Laravel : API REST sécurisée, jobs asynchrones et Auth personnalisée.",
    react: "⚛️ React : hooks avancés, context et animations fluides pour des UX modernes.",
    angular: "🅰️ Angular : architecture scalable, RxJS et modules optimisés.",
    php: "🐘 PHP : backends robustes, architecture hexagonale et tests automatisés.",
    javascript: "✨ JavaScript : ESNext, optimisations de performance et animations web.",
    'c#': "🔷 C# : développement .NET, APIs REST et intégrations d'entreprises.",
    'c ': "💡 Langage C : bases systèmes, optimisation mémoire et algorithmes performants.",
    ' c': "💡 Langage C : bases systèmes, optimisation mémoire et algorithmes performants.",
    ' c ': "💡 Langage C : bases systèmes, optimisation mémoire et algorithmes performants.",
    '.net': "🔷 C# / .NET : services REST, Entity Framework et intégrations métier.",
    mysql: "💾 MySQL : schémas normalisés, indexations et requêtes complexes optimisées.",
    postgresql: "🛢️ PostgreSQL : vues matérialisées, JSONB et triggers efficaces.",
    mongodb: "🍃 MongoDB : agrégations, pipelines et modèles de données flexibles.",
    redis: "⚡ Redis : cache distribué, pub/sub et file d’attente ultra-rapide.",
    tailwind: "🎨 Tailwind CSS : design system sur-mesure et composants réutilisables.",
    bootstrap: "🧩 Bootstrap : prototypage rapide et grilles responsive éprouvées.",
    html: "🧱 HTML5 : structures sémantiques, accessibilité et SEO friendly.",
    css: "🎨 CSS3 : animations, layouts modernes et responsive design.",
    'html/css': "🧱 HTML5 & CSS3 : interfaces soignées, responsive et accessibles.",
    'html / css': "🧱 HTML5 & CSS3 : interfaces soignées, responsive et accessibles.",
    git: "🔁 Git : branching stratégique, hooks et workflows collaboratifs.",
    docker: "🐳 Docker : environnements isolés, images optimisées et orchestration facile.",
    'github actions': "⚙️ GitHub Actions : pipelines CI/CD, tests automatisés et déploiements continus.",
    jwt: "🔐 JWT : authentification stateless, refresh tokens et autorisations fines.",
    oauth: "🔑 OAuth 2.0 : connexions sécurisées, scopes et intégrations tierces.",
    flutterwave: "💸 Flutterwave : paiements sécurisés et intégrations multi-devise.",
    flutter: "📱 Flutter : UI multi-plateforme animée et logique partagée.",
  }), []);

  const showNextSkillHighlight = useCallback(() => {
    if (currentSection !== 'skills' || isTourActive) return;
    skillHighlightIndex.current = (skillHighlightIndex.current + 1) % SKILL_HIGHLIGHTS.length;
    const highlight = SKILL_HIGHLIGHTS[skillHighlightIndex.current];
    skillHighlightActive.current = true;
    setTooltipMessage(highlight.message);
    setShowTooltip(true);
    setExpression('thumbsup');
    setGesture('pointing');
    if (skillHighlightTimeout.current) clearTimeout(skillHighlightTimeout.current);
    skillHighlightTimeout.current = setTimeout(() => {
      if (skillHighlightActive.current) {
        setShowTooltip(false);
        setExpression('happy');
        setGesture(null);
        skillHighlightActive.current = false;
      }
    }, 4000);
  }, [SKILL_HIGHLIGHTS, currentSection, isTourActive]);

  const cancelSkillHighlight = useCallback(() => {
    if (skillHighlightTimeout.current) {
      clearTimeout(skillHighlightTimeout.current);
      skillHighlightTimeout.current = null;
    }
    if (skillHighlightActive.current) {
      skillHighlightActive.current = false;
      setShowTooltip(false);
      setExpression('happy');
      setGesture(null);
    }
  }, []);

  const handleTourNext = useCallback(() => {
    goToTourStep(tourStepIndex + 1);
  }, [goToTourStep, tourStepIndex]);

  const openGuideDialog = useCallback(() => {
    stopGuidedTour();
    setPendingTourPrompt(false);
    setIsOpen(true);
    setExpression('happy');
    setGesture(null);
  }, [stopGuidedTour]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    stopGuidedTour();
    setIsOpen(false);
    setExpression('happy');
    setGesture(null);
  }, [stopGuidedTour]);

  const dialogues = useMemo(() => ({
    hero: {
      message: "👋 Salut ! Je suis Codey, ton guide digital. Tu veux que je te fasse visiter le portfolio de Christ Ekra ?",
      buttons: [
        { icon: FaPlay, label: "Tour guidé", action: startGuidedTour },
        { icon: FaCode, label: "Projets Web", action: () => scrollToSection('projects') },
        { icon: FaMobileAlt, label: "Compétences", action: () => scrollToSection('skills') },
        { icon: FaUser, label: "Parcours", action: () => scrollToSection('about') },
        { icon: FaEnvelope, label: "Me Contacter", action: () => scrollToSection('contact') }
      ]
    },
    about: {
      message: "🧠 Christ est un développeur full-stack passionné. Diplômé en Génie Logiciel, il crée des applications web modernes et performantes.",
      buttons: [
        { icon: FaPlay, label: "Tour guidé", action: startGuidedTour },
        { icon: FaCode, label: "Voir Projets", action: () => scrollToSection('projects') },
        { icon: FaRocket, label: "Compétences", action: () => scrollToSection('skills') }
      ]
    },
    skills: {
      message: "💻 Christ maîtrise Laravel, React, Angular, Flutter et bien d'autres technologies ! Il est toujours en train d'apprendre de nouvelles choses.",
      buttons: [
        { icon: FaPlay, label: "Tour guidé", action: startGuidedTour },
        { icon: FaCode, label: "Voir Projets", action: () => scrollToSection('projects') },
        { icon: FaUser, label: "En savoir plus", action: () => scrollToSection('about') }
      ]
    },
    projects: {
      message: "🚀 Voici quelques-unes des applications web et mobiles que Christ a développées. Clique sur un projet pour en savoir plus !",
      buttons: [
        { icon: FaPlay, label: "Tour guidé", action: startGuidedTour },
        { icon: FaRocket, label: "Compétences", action: () => scrollToSection('skills') },
        { icon: FaEnvelope, label: "Me Contacter", action: () => scrollToSection('contact') }
      ]
    },
    contact: {
      message: formSubmitted
        ? "✅ Merci pour ton message ! Christ te répondra très vite."
        : "📩 Envie de collaborer ? Une idée de projet ? Laisse-lui un message, il répond vite ⚡",
      buttons: [
        { icon: FaPlay, label: "Tour guidé", action: startGuidedTour },
        { icon: FaCode, label: "Voir Projets", action: () => scrollToSection('projects') },
        { icon: FaUser, label: "Parcours", action: () => scrollToSection('about') }
      ]
    },
    idle: {
      message: "😉 Toujours là ? Veux-tu que je te montre le projet préféré de Christ ?",
      buttons: [
        { icon: FaPlay, label: "Tour guidé", action: startGuidedTour },
        { icon: FaCode, label: "Explorer", action: openGuideDialog }
      ]
    },
    longIdle: {
      message: "🎯 Clique sur moi pour un petit tour guidé !",
      buttons: [
        { icon: FaPlay, label: "Commencer", action: startGuidedTour }
      ]
    }
  }), [formSubmitted, openGuideDialog, scrollToSection, startGuidedTour]);

  // Messages contextuels pour les éléments survolés
  const getHoverMessage = useCallback((element) => {
    // Convertir className en string si c'est un objet
    const className = typeof element.className === 'string' 
      ? element.className 
      : element.className?.baseVal || element.className?.value || '';
    const classList = element.classList ? Array.from(element.classList).join(' ') : '';
    const allClasses = `${className} ${classList}`.toLowerCase();
    const text = element.textContent?.toLowerCase() || '';
    
    // Boutons CTA
    if (allClasses.includes('btn-primary') || (text.includes('contacter') && allClasses.includes('btn'))) {
      return "💬 Clique ici pour contacter Christ directement !";
    }
    if (allClasses.includes('btn-secondary') || (text.includes('projet') && allClasses.includes('btn'))) {
      return "👁️ Clique ici pour découvrir les projets les plus cool 🚀";
    }
    
    // Projets
    if (allClasses.includes('project-card') || element.closest('.project-card')) {
      const projectCard = element.closest('.project-card') || element;
      const projectText = projectCard.textContent?.toLowerCase() || '';
      if (projectText.includes('react') || projectText.includes('tailwind')) {
        return "💻 Ce projet React/Tailwind est connecté à Laravel ! Clique pour voir la stack complète 🚀";
      }
      if (projectText.includes('flutter') || projectText.includes('mobile')) {
        return "📱 Cette appli Flutter est fluide et cross-platform ! Clique pour en savoir plus 💡";
      }
      return "💻 Ce projet a été développé avec les meilleures technologies ! Clique pour découvrir 🚀";
    }
    
    // Compétences
    if (allClasses.includes('skill-item') || element.closest('.skill-item')) {
      const skillText = text.toLowerCase();
      const skillKey = Object.keys(SKILL_MESSAGES).find(key => skillText.includes(key));
      if (skillKey) {
        return SKILL_MESSAGES[skillKey];
      }
      return null;
    }
    
    // Formulaire de contact
    if (allClasses.includes('contact-form') || element.closest('.contact-form') || element.closest('form')) {
      return "📝 Besoin d'aide pour remplir le formulaire ? 😉";
    }
    
    // CV / Diplômes
    if (text.includes('diplôme') || text.includes('formation') || text.includes('licence') || text.includes('master')) {
      return "🎓 Cette formation lui a permis de devenir un dev polyvalent !";
    }
    
    return null;
  }, [SKILL_MESSAGES]);

  // Détecter la section active et le scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const currentScrollY = window.scrollY;
      
      // Calculer la vitesse et direction de scroll
      const delta = currentScrollY - lastScrollY.current;
      scrollSpeed.current = Math.abs(delta);
      setScrollDirection(delta > 0 ? 'down' : 'up');
      lastScrollY.current = currentScrollY;

      // Détecter la section active
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (currentSection !== section) {
              setCurrentSection(section);
              // Animation de Codey suivant le scroll
              if (scrollSpeed.current > 10 && !isTourActive) {
                setExpression('surprised');
                setGesture('pointing');
                setTimeout(() => {
                  setExpression('happy');
                  setGesture(null);
                }, 800);
              }
              
              // Message contextuel selon la section
              if (section === 'projects' && scrollDirection === 'down' && !isTourActive) {
                setShowTooltip(true);
                setTooltipMessage("Allons voir ses projets web et mobiles 👇");
                setTimeout(() => setShowTooltip(false), 3000);
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, scrollDirection, isTourActive]);

  // Suivre le curseur légèrement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (mouseFollowRef.current) {
        cancelAnimationFrame(mouseFollowRef.current);
      }

      mouseFollowRef.current = requestAnimationFrame(() => {
        setMousePosition(prev => ({
          x: prev.x + (e.clientX - prev.x) * 0.05, // 5% interpolation
          y: prev.y + (e.clientY - prev.y) * 0.05,
        }));
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseFollowRef.current) {
        cancelAnimationFrame(mouseFollowRef.current);
      }
    };
  }, []);

  // Détecter les survols d'éléments interactifs
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (isTourActive) return;
      const target = e.target;
      const message = getHoverMessage(target);
      
      if (message) {
        setHoveredElement(target);
        setTooltipMessage(message);
        setShowTooltip(true);
        setExpression('surprised');
        
        // Déterminer le geste selon l'élément
        if (target.closest('.btn') || target.closest('.project-card')) {
          setGesture('pointing');
        } else if (target.closest('.skill-item')) {
          setGesture('pointing');
        } else if (target.closest('form')) {
          setGesture('pointing');
        }
      }
    };

    const handleMouseOut = () => {
      if (isTourActive) return;
      setHoveredElement(null);
      setShowTooltip(false);
      setExpression('happy');
      setGesture(null);
    };

    const handleClick = (e) => {
      if (isTourActive) return;
      const target = e.target.closest('.project-card, .btn, .skill-item');
      if (target) {
        setExpression('thumbsup');
        setGesture('pointing');
        
        if (target.closest('.project-card')) {
          setTooltipMessage("Excellent choix ! Je vais te montrer les technologies utilisées 🚀");
          setShowTooltip(true);
          setTimeout(() => {
            setShowTooltip(false);
            setExpression('happy');
            setGesture(null);
          }, 3000);
        } else if (target.closest('.btn')) {
          setTooltipMessage("Super ! On y va 🚀");
          setShowTooltip(true);
          setTimeout(() => {
            setShowTooltip(false);
            setExpression('happy');
            setGesture(null);
          }, 2000);
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, [isTourActive, getHoverMessage]);

  // Détecter l'envoi du formulaire
  useEffect(() => {
    const handleFormSubmit = (e) => {
      const form = e.target.closest('form');
      if (form && form.classList.contains('contact-form')) {
        setFormSubmitted(true);
        setExpression('thumbsup');
        setGesture('dancing');
        setShowTooltip(true);
        setTooltipMessage("Merci ! Christ te répondra bientôt 🚀");
        setTimeout(() => {
          setShowTooltip(false);
          setExpression('happy');
          setGesture(null);
          setFormSubmitted(false);
        }, 4000);
      }
    };

    document.addEventListener('submit', handleFormSubmit);

    return () => {
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  // Détecter l'inactivité (10-15 secondes et 30 secondes)
  useEffect(() => {
    const resetTimers = () => {
      setIsIdle(false);
      setPendingTourPrompt(false);
      clearTimeout(idleTimerRef.current);
      clearTimeout(longInactivityTimer.current);
      
      if (isTourActive) {
        return;
      }

      // Timer court (10-15 secondes)
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
        setExpression('thinking');
        if (!isOpen) {
          setShowTooltip(true);
          setTooltipMessage("Toujours là ? 😄 Veux-tu que je te montre le projet préféré de Christ ?");
          setTimeout(() => setShowTooltip(false), 5000);
        }
      }, 12000); // 12 secondes
      
      // Timer long (30 secondes)
      longInactivityTimer.current = setTimeout(() => {
        setExpression('thinking');
        setGesture('waving');
        if (!isOpen && !isTourActive) {
          setShowTooltip(true);
          setTooltipMessage("🎯 Clique sur moi pour un petit tour guidé !");
          setTimeout(() => {
            setShowTooltip(false);
            setGesture(null);
            setPendingTourPrompt(false);
          }, 5000);
          setPendingTourPrompt(true);
        }
      }, 30000); // 30 secondes
    };

    window.addEventListener('scroll', resetTimers, { passive: true });
    window.addEventListener('mousemove', resetTimers, { passive: true });
    window.addEventListener('click', resetTimers);

    resetTimers();

    return () => {
      window.removeEventListener('scroll', resetTimers);
      window.removeEventListener('mousemove', resetTimers);
      window.removeEventListener('click', resetTimers);
      clearTimeout(idleTimerRef.current);
      clearTimeout(longInactivityTimer.current);
    };
  }, [isOpen, isTourActive]);

  // Animation d'entrée après le terminal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowTooltip(true);
      setTooltipMessage("👋 Salut ! Je suis Codey, ton guide digital. Tu veux que je te fasse visiter le portfolio de Christ Ekra ?");
      setTimeout(() => setShowTooltip(false), 5000);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      clearTourTimeout();
      if (skillHighlightTimeout.current) clearTimeout(skillHighlightTimeout.current);
    };
  }, [clearTourTimeout]);

  const getCurrentDialogue = () => {
    if (isTourActive) {
      const step = TOUR_STEPS[tourStepIndex] || TOUR_STEPS[0];
      return {
        message: step?.dialogMessage || "🗺️ Tour guidé en cours...",
        buttons: [
          { icon: FaHandPointer, label: "Étape suivante", action: handleTourNext },
          { icon: FaStop, label: "Terminer", action: finishGuidedTour }
        ]
      };
    }
    if (pendingTourPrompt) return dialogues.longIdle;
    if (isIdle) return dialogues.idle;
    return dialogues[currentSection] || dialogues.hero;
  };

  if (!isVisible) return null;

  const currentDialogue = getCurrentDialogue();
  
  // Calculer la position de Codey avec suivi du curseur
  const codeyX = mousePosition.x * 0.02;
  const codeyY = mousePosition.y * 0.02;

  const guideContent = (
    <div 
      ref={guideRef}
      className={`guide-container ${isVisible ? 'visible' : ''} ${currentSection}`}
      style={{
        transform: `translate(${codeyX}px, ${codeyY}px)`
      }}
    >
        {/* Avatar Codey */}
        <motion.div
          className={`codey-avatar ${expression} ${gesture ? `gesture-${gesture}` : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (isTourActive) {
              stopGuidedTour();
              return;
            }
            if (pendingTourPrompt && !isOpen) {
              startGuidedTour();
              return;
            }
            setIsOpen(prev => !prev);
            setExpression('happy');
            setGesture(null);
            setPendingTourPrompt(false);
          }}
          onMouseEnter={() => {
            showNextSkillHighlight();
          }}
          onMouseLeave={() => {
            cancelSkillHighlight();
          }}
          animate={{
            y: [0, -5, 0],
            rotate: expression === 'surprised' ? [0, -5, 5, 0] : gesture === 'dancing' ? [0, -10, 10, -10, 10, 0] : 0,
            scale: expression === 'thumbsup' ? [1, 1.1, 1] : gesture === 'dancing' ? [1, 1.15, 1, 1.15, 1] : 1,
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.5 },
            scale: { duration: 0.6 }
          }}
        >
          <div className="codey-sphere">
            <div className="codey-face">
              <div className="codey-eye codey-eye-left">
                <motion.div 
                  className="eye-pupil"
                  animate={{
                    x: hoveredElement ? [0, 3, -3, 0] : 0,
                    y: hoveredElement ? [0, -2, 2, 0] : 0,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="codey-eye codey-eye-right">
                <motion.div 
                  className="eye-pupil"
                  animate={{
                    x: hoveredElement ? [0, 3, -3, 0] : 0,
                    y: hoveredElement ? [0, -2, 2, 0] : 0,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <motion.div 
                className="codey-mouth"
                animate={{
                  scaleY: expression === 'happy' ? [1, 1.2, 1] : expression === 'surprised' ? [1, 1.5, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: expression === 'happy' ? Infinity : 0 }}
              />
              {expression === 'thumbsup' && (
                <motion.div
                  className="codey-thumbsup"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                >
                  <FaThumbsUp />
                </motion.div>
              )}
              {gesture === 'pointing' && (
                <motion.div
                  className="codey-pointing"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0, x: [0, 5, 0] }}
                  exit={{ scale: 0, rotate: 45 }}
                >
                  <FaHandPointer />
                </motion.div>
              )}
              {gesture === 'waving' && (
                <motion.div
                  className="codey-waving"
                  animate={{ rotate: [0, 20, -20, 20, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  👋
                </motion.div>
              )}
            </div>
            <div className="codey-glow" />
            <div className="codey-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
            </div>
          </div>
        </motion.div>

        {/* Bulle de dialogue */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="codey-dialog"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className="dialog-close"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>
              <div className="dialog-content">
                <p className="dialog-message">{currentDialogue.message}</p>
                <div className="dialog-buttons">
                  {currentDialogue.buttons.map((button, index) => (
                    <motion.button
                      key={index}
                      className="dialog-button"
                      onClick={button.action}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button.icon className="button-icon" />
                      <span>{button.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="dialog-arrow"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip contextuel */}
        <AnimatePresence>
          {showTooltip && tooltipMessage && (
            <motion.div
              className="codey-tooltip"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <p>{tooltipMessage}</p>
              <div className="tooltip-arrow"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicateur de notification */}
        {!isOpen && !showTooltip && (
          <motion.div
            className="notification-dot"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        )}
    </div>
  );

  // Utiliser un Portal pour rendre le guide directement dans le body
  return createPortal(guideContent, document.body);
};

export default Guide;
