import React, { useState } from 'react';
import {
  FaMoneyBillWave, FaClock, FaUtensils,
  FaShoppingBag, FaTimes, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Projects.css';

const getAssetPath = (relativePath = '') => {
  if (!relativePath) return '';
  if (/^https?:\/\//i.test(relativePath)) {
    return relativePath;
  }
  const base = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}` : '';
  return `${base}/${relativePath}`;
};

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [imageErrors, setImageErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState('');
  const [currentImageTitle, setCurrentImageTitle] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState(null);

  const handleImageError = (projectId, screenshotIndex) => {
    setImageErrors(prev => ({
      ...prev,
      [`${projectId}-${screenshotIndex}`]: true
    }));
  };

  const openModal = (imageSrc, projectTitle, imageIndex, project) => {
    setCurrentImageSrc(imageSrc);
    setCurrentImageTitle(projectTitle);
    setCurrentImageIndex(imageIndex);
    setCurrentProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImageSrc('');
    setCurrentImageTitle('');
    setCurrentImageIndex(0);
    setCurrentProject(null);
  };

  const nextImage = () => {
    if (!currentProject || !currentProject.screenshots) return;
    
    const nextIndex = (currentImageIndex + 1) % currentProject.screenshots.length;
    setCurrentImageIndex(nextIndex);
    setCurrentImageSrc(getAssetPath(currentProject.screenshots[nextIndex]));
  };

  const prevImage = () => {
    if (!currentProject || !currentProject.screenshots) return;
    
    const prevIndex = currentImageIndex === 0 ? currentProject.screenshots.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setCurrentImageSrc(getAssetPath(currentProject.screenshots[prevIndex]));
  };

  const projects = [
    {
      id: 1,
      title: 'FundFlow',
      description: 'Plateforme de crowdfunding moderne permettant aux utilisateurs de financer des projets communautaires. Intégration complète avec Flutterwave pour les paiements sécurisés, système de gestion de campagnes et tableau de bord administrateur.',
      technologies: ['Laravel', 'Tailwind CSS', 'Flutterwave', 'MySQL'],
      icon: FaMoneyBillWave,
      stack: 'Full Stack Laravel',
      year: '2024',
      status: 'Complété',
      liveUrl: 'https://github.com/christekra',
      liveLabel: 'Voir FundFlow sur GitHub',
      screenshots: [
        'screenshots/Fund1.png',
        'screenshots/fund2.png',
        'screenshots/fund3.png',
        'screenshots/fund4.png',
        'screenshots/fund5.png'
      ]
    },
    {
      id: 2,
      title: 'Maison des Poignets',
      description: 'Plateforme e-commerce dédiée aux montres et bracelets haut de gamme : catalogue détaillé, gestion des commandes et intégration paiement en ligne. Optimisée pour le SEO et entièrement hébergée par mes soins.',
      technologies: ['React', 'Laravel', 'MySQL', 'SEO', 'Paiement en ligne'],
      icon: FaClock,
      stack: 'React + Laravel',
      year: '2024',
      status: 'En ligne',
      liveUrl: 'https://www.mpoignets.online',
      liveLabel: 'Visiter mpoignets.online',
      screenshots: [
        'screenshots/mpoignet1.png',
        'screenshots/mpoignet2.png',
        'screenshots/mpoignet3.png',
        'screenshots/mpoignet4.png',
        'screenshots/mpoignet5.png'
      ],
      hostingNote: 'Projet développé, déployé et maintenu par mes soins.'
    },
    {
      id: 3,
      title: 'FoodHub',
      description: 'Plateforme de livraison de nourriture avec gestion en temps réel des commandes, suivi de livraison, système de paiement intégré et interface mobile-responsive. Optimisé pour une expérience utilisateur fluide.',
      technologies: ['React', 'Laravel', 'MySQL', 'Real-time'],
      icon: FaUtensils,
      stack: 'React + Laravel',
      year: '2024',
      status: 'Complété',
      liveUrl: 'https://github.com/christekra',
      liveLabel: 'Voir FoodHub sur GitHub',
      screenshots: [
        'screenshots/food1.png',
        'screenshots/food2.png',
        'screenshots/food3.png',
        'screenshots/food4.png',
        'screenshots/food5.png'
      ]
    },
    {
      id: 4,
      title: 'BabiJersey',
      description: 'Boutique en ligne spécialisée dans les maillots personnalisés, conçue de A à Z : catalogue dynamique, gestion des stocks, paiements sécurisés et automatisation des commandes. Déploiement complet et hébergement gérés par mes soins.',
      technologies: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'SEO', 'CI/CD'],
      icon: FaShoppingBag,
      stack: 'Laravel + React + SEO',
      year: '2025',
      status: 'En ligne',
      liveUrl: 'https://www.babijersey.com',
      liveLabel: 'Visiter www.babijersey.com',
      screenshots: [
        'screenshots/babijersey1.png',
        'screenshots/babijersey2.png',
        'screenshots/babijersey3.png',
        'screenshots/babijersey4.png',
        'screenshots/babijersey5.png'
      ],
      hostingNote: 'Site développé, déployé et hébergé par mes soins.'
    }
  ];

  return (
    <>
      <section id="projects" className="projects">
        <div className="projects-container">
          <div className="section-header">
            <h2 className="section-title">Mes Projets</h2>
            <p className="section-subtitle">Découvrez mes réalisations récentes</p>
          </div>
          
        <div ref={ref} className={`projects-grid ${isVisible ? 'animate-in' : ''}`}>
          {projects.map((project, index) => {
              const IconComponent = project.icon;
              const coverKey = `${project.id}-cover`;
              const coverHasError = imageErrors[coverKey];
              const coverRelativePath = project.screenshots?.[0];
              const coverSrc = !coverHasError && coverRelativePath ? getAssetPath(coverRelativePath) : null;
              return (
                <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="project-header">
                    <div className={`project-image ${coverHasError ? 'fallback' : ''}`}>
                      {coverSrc && (
                        <img
                          src={coverSrc}
                          alt={`Aperçu du projet ${project.title}`}
                          className="project-cover"
                          onError={() => handleImageError(project.id, 'cover')}
                        />
                      )}
                      <div className="project-icon-wrapper">
                        <IconComponent className="project-icon" />
                      </div>
                      <div className="project-badge">
                        <span className="project-year">{project.year}</span>
                        <span className="project-status">{project.status}</span>
                      </div>
                    </div>
                    <div className="project-header-content">
                      <div className="project-title-wrapper">
                        <h3 className="project-title">{project.title}</h3>
                        <span className="project-stack-badge">{project.stack}</span>
                      </div>
                    </div>
                  </div>
                  <div className="project-content">
                    <p className="project-description">{project.description}</p>
                    <div className="project-technologies">
                      <span className="tech-label">Technologies utilisées :</span>
                      <div className="tech-tags-wrapper">
                        {project.technologies.map(tech => (
                          <span key={tech} className="tech-tag">
                            <span className="tech-tag-dot"></span>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.liveUrl && (
                      <div className="project-links">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-button"
                        >
                          <span className="project-link-icon">🌐</span>
                          <span>{project.liveLabel || 'Voir le site en ligne'}</span>
                        </a>
                        {project.hostingNote && (
                          <span className="project-hosting-note">{project.hostingNote}</span>
                        )}
                      </div>
                    )}
                    <div className="project-screenshots">
                      <div className="screenshots-header">
                        <h4 className="screenshots-title">
                          <span className="screenshots-icon">📸</span>
                          Galerie du projet
                        </h4>
                        <span className="screenshots-count">{project.screenshots.length} captures</span>
                      </div>
                      <div className="screenshots-grid">
                        {project.screenshots.map((screenshot, idx) => {
                          const errorKey = `${project.id}-${idx}`;
                          const hasError = imageErrors[errorKey];
                          const screenshotSrc = getAssetPath(screenshot);

                          return (
                            <div 
                              key={idx} 
                              className="screenshot-item"
                              data-index={`${idx + 1}`}
                              title={`Cliquez pour agrandir - ${project.title} - Capture ${idx + 1}`}
                              onClick={() => !hasError && openModal(screenshotSrc, project.title, idx, project)}
                            >
                              <div className="screenshot-overlay">
                                <span className="screenshot-number">{idx + 1}</span>
                                <span className="screenshot-view">Voir</span>
                              </div>
                              {!hasError ? (
                                <img 
                                  src={screenshotSrc} 
                                  alt={`${project.title} - Capture ${idx + 1}`}
                                  className="screenshot-image"
                                  onError={() => handleImageError(project.id, idx)}
                                />
                              ) : (
                                <div className="screenshot-placeholder">
                                  <div className="placeholder-content">
                                    <span className="placeholder-icon">📸</span>
                                    <p>Capture {idx + 1}</p>
                                    <small>Image non trouvée</small>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal pour afficher les images en grand */}
      {modalOpen && currentImageSrc && currentImageTitle && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{currentImageTitle} - Capture {currentImageIndex + 1}</h3>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <button className="modal-nav prev" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <div className="modal-image-container">
                <img 
                  src={currentImageSrc} 
                  alt={`${currentImageTitle} - Capture ${currentImageIndex + 1}`}
                  className="modal-image"
                />
              </div>
              <button className="modal-nav next" onClick={nextImage}>
                <FaChevronRight />
              </button>
            </div>
            <div className="modal-footer">
              <p>Utilisez les flèches ou cliquez sur les boutons pour naviguer</p>
              <p>Appuyez sur Échap pour fermer</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
