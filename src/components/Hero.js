import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaEye, FaDownload } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const profilePhotoSrc = `${process.env.PUBLIC_URL || ''}/pro.png`;
  const cvSrc = `${process.env.PUBLIC_URL || ''}/cv.pdf`;

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">

          {/* ---- Text ---- */}
          <div className={`hero-text ${isVisible ? 'animate-in' : ''}`}>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Développeur Full Stack</span>
            </div>

            <h1 className="hero-title">
              Bonjour, je suis
              <span className="hero-name">
                Christ <span className="hero-name-accent">Ekra</span>
              </span>
            </h1>

            <p className="hero-subtitle">
              Je construis des applications web modernes &amp; performantes
            </p>

            <p className="hero-description">
              Diplômé en Génie Logiciel, spécialisé Laravel, React et Angular.
              Prêt à entamer mon Master 1 en Cybersécurité.
            </p>

            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">
                <span className="btn-content">
                  <FaEnvelope />
                  <span>Me Contacter</span>
                </span>
              </a>
              <a href="#projects" className="btn btn-secondary">
                <span className="btn-content">
                  <FaEye />
                  <span>Mes Projets</span>
                </span>
              </a>
              <a
                href={cvSrc}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                download="CV_Christ_Ekra.pdf"
              >
                <span className="btn-content">
                  <FaDownload />
                  <span>CV</span>
                </span>
              </a>
            </div>
          </div>

          {/* ---- Photo ---- */}
          <div className={`hero-visual ${isVisible ? 'animate-in' : ''}`}>
            <div className="hero-avatar">
              <div className="avatar-frame">
                {!imageError ? (
                  <img
                    src={profilePhotoSrc}
                    alt="Christ Ekra — Développeur Full Stack"
                    className="profile-photo"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="avatar-fallback">
                    <span className="avatar-initials">CE</span>
                    <span className="avatar-fallback-label">Développeur Web</span>
                  </div>
                )}
              </div>
              <div className="avatar-accent" aria-hidden="true" />
              <div className="hero-badge">
                <span className="badge-dot" />
                <span className="badge-text">Disponible pour missions</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="scroll-line" />
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
