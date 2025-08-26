import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaDownload } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Pour changer la photo, remplacez le chemin ci-dessous :
  // - Photo locale : "/votre-photo.jpg" (placez le fichier dans public/)
  // - URL externe : "https://votre-url.com/photo.jpg"
  const profilePhotoSrc = "/photo-profil.png";
  
  // Pour changer le CV, remplacez le chemin ci-dessous :
  // - CV local : "/votre-cv.pdf" (placez le fichier dans public/)
  // - URL externe : "https://votre-url.com/cv.pdf"
  const cvSrc = "/cv.pdf";

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Bonjour, je suis <span className="highlight">Christ Ekra</span>
            </h1>
            <h2 className="hero-subtitle">Développeur Web Full Stack</h2>
            <p className="hero-description">
              Diplômé en Génie Logiciel, je crée des applications web modernes et performantes. 
              Prêt à entamer mon Master 1 en Cybersécurité pour approfondir mes compétences en sécurité informatique.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">
                <FaEnvelope />
                Me Contacter
              </a>
              <a href="#projects" className="btn btn-secondary">
                <FaEye />
                Voir Mes Projets
              </a>
              <a 
                href={cvSrc} 
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                download="CV_Christ_Ekra.pdf"
              >
                <FaDownload />
                Télécharger CV
              </a>
            </div>
          </div>
          <div className="hero-visual">
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
