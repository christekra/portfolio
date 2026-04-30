import React, { useState } from 'react';
import {
  FaMoneyBillWave, FaClock, FaUtensils,
  FaShoppingBag, FaTimes, FaChevronLeft, FaChevronRight,
  FaBuilding, FaConciergeBell, FaGraduationCap
} from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Projects.css';

const getAssetPath = (relativePath = '') => {
  if (!relativePath) return '';
  if (/^https?:\/\//i.test(relativePath)) return relativePath;
  const base = process.env.PUBLIC_URL || '';
  return `${base}/${relativePath}`;
};

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0, rootMargin: '0px 0px -50px 0px' });
  const [imageErrors, setImageErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState('');
  const [currentImageTitle, setCurrentImageTitle] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState(null);

  const handleImageError = (projectId, screenshotIndex) => {
    setImageErrors(prev => ({ ...prev, [`${projectId}-${screenshotIndex}`]: true }));
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
    setCurrentProject(null);
  };

  const nextImage = () => {
    if (!currentProject?.screenshots) return;
    const next = (currentImageIndex + 1) % currentProject.screenshots.length;
    setCurrentImageIndex(next);
    setCurrentImageSrc(getAssetPath(currentProject.screenshots[next]));
  };

  const prevImage = () => {
    if (!currentProject?.screenshots) return;
    const prev = currentImageIndex === 0 ? currentProject.screenshots.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prev);
    setCurrentImageSrc(getAssetPath(currentProject.screenshots[prev]));
  };

  const projects = [
    {
      id: 1,
      title: 'FundFlow',
      description: 'Plateforme de crowdfunding moderne avec intégration Flutterwave pour les paiements sécurisés, gestion de campagnes et tableau de bord administrateur.',
      technologies: ['Laravel', 'Tailwind CSS', 'Flutterwave', 'MySQL'],
      icon: FaMoneyBillWave,
      stack: 'Full Stack Laravel',
      year: '2024',
      status: 'Complété',
      liveUrl: 'https://github.com/christekra',
      liveLabel: 'Voir sur GitHub',
      screenshots: ['screenshots/Fund1.png','screenshots/fund2.png','screenshots/fund3.png','screenshots/fund4.png','screenshots/fund5.png']
    },
    {
      id: 2,
      title: 'Maison des Poignets',
      description: 'E-commerce dédié aux montres et bracelets haut de gamme : catalogue détaillé, gestion des commandes, paiement en ligne et SEO optimisé.',
      technologies: ['React', 'Laravel', 'MySQL', 'SEO', 'Paiement en ligne'],
      icon: FaClock,
      stack: 'React + Laravel',
      year: '2024',
      status: 'En ligne',
      liveUrl: 'https://www.mpoignets.online',
      liveLabel: 'mpoignets.online',
      screenshots: ['screenshots/mpoignet1.png','screenshots/mpoignet2.png','screenshots/mpoignet3.png','screenshots/mpoignet4.png','screenshots/mpoignet5.png'],
      hostingNote: 'Développé, déployé et maintenu par mes soins.'
    },
    {
      id: 3,
      title: 'FoodHub',
      description: 'Plateforme de livraison de nourriture avec suivi en temps réel des commandes, système de paiement intégré et interface mobile-responsive.',
      technologies: ['React', 'Laravel', 'MySQL', 'Real-time'],
      icon: FaUtensils,
      stack: 'React + Laravel',
      year: '2024',
      status: 'Complété',
      liveUrl: 'https://github.com/christekra',
      liveLabel: 'Voir sur GitHub',
      screenshots: ['screenshots/food1.png','screenshots/food2.png','screenshots/food3.png','screenshots/food4.png','screenshots/food5.png']
    },
    {
      id: 4,
      title: 'BabiJersey',
      description: 'Boutique en ligne de maillots personnalisés : catalogue dynamique, gestion des stocks, paiements sécurisés et automatisation des commandes avec CI/CD.',
      technologies: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'SEO', 'CI/CD'],
      icon: FaShoppingBag,
      stack: 'Laravel + React',
      year: '2025',
      status: 'En ligne',
      liveUrl: 'https://www.babijersey.com',
      liveLabel: 'babijersey.com',
      screenshots: ['screenshots/babijersey1.png','screenshots/babijersey2.png','screenshots/babijersey3.png','screenshots/babijersey4.png','screenshots/babijersey5.png'],
      hostingNote: 'Développé, déployé et hébergé par mes soins.'
    },
    {
      id: 5,
      title: 'ERP Gestion d\'Entreprise',
      description: 'Système ERP complet pour la gestion d\'entreprise : comptabilité, ressources humaines, gestion des stocks, facturation et reporting avancé avec tableaux de bord en temps réel.',
      technologies: ['Laravel', 'React', 'MySQL', 'Inertia.js', 'Tailwind CSS'],
      icon: FaBuilding,
      stack: 'Laravel + React',
      year: '2025',
      status: 'Complété',
      liveUrl: 'https://github.com/christekra',
      liveLabel: 'Voir sur GitHub',
      screenshots: [
        'screenshots/erp-entreprise/erp-entreprise1.png',
        'screenshots/erp-entreprise/erp-entreprise2.png',
        'screenshots/erp-entreprise/erp-entreprise3.png',
        'screenshots/erp-entreprise/erp-entreprise4.png',
        'screenshots/erp-entreprise/erp-entreprise5.png',
        'screenshots/erp-entreprise/erp-entreprise6.png'
      ]
    },
    {
      id: 6,
      title: 'SaaS Resto',
      description: 'Solution ERP SaaS dédiée aux restaurants : gestion des commandes en salle et en ligne, suivi des stocks, caisse intégrée, gestion du personnel et analytics des ventes.',
      technologies: ['Laravel', 'React', 'MySQL', 'WebSocket', 'Tailwind CSS'],
      icon: FaConciergeBell,
      stack: 'Laravel + React',
      year: '2025',
      status: 'Complété',
      liveUrl: 'https://github.com/christekra',
      liveLabel: 'Voir sur GitHub',
      screenshots: [
        'screenshots/saasresto/saasresto1.png',
        'screenshots/saasresto/saasresto2.png',
        'screenshots/saasresto/saasresto3.png',
        'screenshots/saasresto/saasresto4.png',
        'screenshots/saasresto/saasresto5.png',
        'screenshots/saasresto/saasresto6.png'
      ]
    },
    {
      id: 7,
      title: 'SchoolAc',
      description: 'Plateforme de cours en ligne complète : gestion des cours, inscriptions, paiements, suivi de progression des apprenants et certificats numériques.',
      technologies: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
      icon: FaGraduationCap,
      stack: 'Laravel + React',
      year: '2025',
      status: 'En ligne',
      liveUrl: 'https://schoolac.org',
      liveLabel: 'schoolac.org',
      screenshots: [
        'screenshots/Schoolac/schoolac.png',
        'screenshots/Schoolac/schoolac1.png',
        'screenshots/Schoolac/schoolac2.png',
        'screenshots/Schoolac/schoolac3.png',
        'screenshots/Schoolac/schoolac4.png',
        'screenshots/Schoolac/schoolac5.png',
        'screenshots/Schoolac/schoolac6.png',
        'screenshots/Schoolac/schoolac7.png',
        'screenshots/Schoolac/schoolac8.png'
      ]
    }
  ];

  return (
    <>
      <section id="projects" className="projects">
        <div className="projects-container">
          <div className="section-header">
            <span className="section-label">Réalisations</span>
            <h2 className="section-title">Mes Projets</h2>
            <p className="section-subtitle" style={{ marginTop: '1rem' }}>
              Applications web, ERP et plateformes livrés de A à Z
            </p>
          </div>

          <div ref={ref} className={`projects-grid ${isVisible ? 'animate-in' : ''}`}>
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              const coverKey = `${project.id}-cover`;
              const coverHasError = imageErrors[coverKey];
              const coverRelativePath = project.screenshots?.[0];
              const coverSrc = !coverHasError && coverRelativePath ? getAssetPath(coverRelativePath) : null;

              return (
                <div
                  key={project.id}
                  className="project-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className={`project-image ${coverHasError || !coverSrc ? 'fallback' : ''}`}>
                    {coverSrc && (
                      <img
                        src={coverSrc}
                        alt={`Aperçu ${project.title}`}
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

                  {/* Header */}
                  <div className="project-header-content">
                    <div className="project-title-wrapper">
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-stack-badge">{project.stack}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="project-content">
                    <p className="project-description">{project.description}</p>

                    <div className="project-technologies">
                      <span className="tech-label">Technologies</span>
                      <div className="tech-tags-wrapper">
                        {project.technologies.map(tech => (
                          <span key={tech} className="tech-tag">
                            <span className="tech-tag-dot" />
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
                          {project.liveLabel || 'Voir le site'}
                        </a>
                        {project.hostingNote && (
                          <span className="project-hosting-note">{project.hostingNote}</span>
                        )}
                      </div>
                    )}

                    {project.screenshots?.length > 0 && (
                      <div className="project-screenshots">
                        <div className="screenshots-header">
                          <h4 className="screenshots-title">
                            <span className="screenshots-icon">📸</span>
                            Galerie
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
                                onClick={() => !hasError && openModal(screenshotSrc, project.title, idx, project)}
                              >
                                <div className="screenshot-overlay">
                                  <span className="screenshot-number">{idx + 1}</span>
                                  <span className="screenshot-view">Voir</span>
                                </div>
                                {!hasError ? (
                                  <img
                                    src={screenshotSrc}
                                    alt={`${project.title} — capture ${idx + 1}`}
                                    className="screenshot-image"
                                    onError={() => handleImageError(project.id, idx)}
                                  />
                                ) : (
                                  <div className="screenshot-placeholder">
                                    <div className="placeholder-content">
                                      <span className="placeholder-icon">📸</span>
                                      <p>Capture {idx + 1}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && currentImageSrc && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{currentImageTitle} — {currentImageIndex + 1} / {currentProject?.screenshots?.length}</h3>
              <button className="modal-close" onClick={closeModal} aria-label="Fermer">
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <button className="modal-nav prev" onClick={prevImage} aria-label="Précédent">
                <FaChevronLeft />
              </button>
              <div className="modal-image-container">
                <img
                  src={currentImageSrc}
                  alt={`${currentImageTitle} — capture ${currentImageIndex + 1}`}
                  className="modal-image"
                />
              </div>
              <button className="modal-nav next" onClick={nextImage} aria-label="Suivant">
                <FaChevronRight />
              </button>
            </div>
            <div className="modal-footer">
              <p>← → pour naviguer · Échap pour fermer</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
