import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaEye, FaDownload } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  // Pour changer la photo, remplacez le chemin ci-dessous :
  // - Photo locale : "/votre-photo.jpg" (placez le fichier dans public/)
  // - URL externe : "https://votre-url.com/photo.jpg"
  const profilePhotoSrc = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/pro.png` : '/pro.png';
  
  // Pour changer le CV, remplacez le chemin ci-dessous :
  // - CV local : "/votre-cv.pdf" (placez le fichier dans public/)
  // - URL externe : "https://votre-url.com/cv.pdf"
  const cvSrc = "cv.pdf";

  return (
    <section id="hero" className="hero">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
      <div className="animated-background">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className={`hero-text ${isVisible ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Bonjour, je suis<br />
              <span className="hero-name">Christ Ekra</span>
            </h1>
            <h2 className="hero-subtitle">
              <span className="subtitle-text">Développeur Web Full Stack</span>
            </h2>
            <p className="hero-description">
              Diplômé en Génie Logiciel, je crée des applications web modernes et performantes. 
              Prêt à entamer mon Master 1 en Cybersécurité pour approfondir mes compétences en sécurité informatique.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">
                <span className="btn-content">
                  <FaEnvelope />
                  <span>Me Contacter</span>
                </span>
                <span className="btn-underline"></span>
                <span className="btn-ripple"></span>
              </a>
              <a href="#projects" className="btn btn-secondary">
                <span className="btn-content">
                  <FaEye />
                  <span>Voir Mes Projets</span>
                </span>
                <span className="btn-underline"></span>
                <span className="btn-ripple"></span>
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
                <span>Télécharger CV</span>
                </span>
                <span className="btn-underline"></span>
                <span className="btn-ripple"></span>
              </a>
            </div>
          </div>
          <div className={`hero-visual ${isVisible ? 'animate-in' : ''}`}>
            <div className="hero-avatar">
              <div className="avatar-placeholder">
                {!imageError ? (
                  <img 
                    src={profilePhotoSrc}
                    alt="Christ Ekra" 
                    className="profile-photo"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="avatar-content">
                    <div className="avatar-icon">CE</div>
                    <div className="avatar-subtitle">Développeur Web</div>
                  </div>
                )}
              </div>
              <div className="avatar-glow"></div>
              <div className="avatar-ring ring-1"></div>
              <div className="avatar-ring ring-2"></div>
              <div className="avatar-ring ring-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
