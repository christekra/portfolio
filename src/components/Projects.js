import React, { useState } from 'react';
import { 
  FaMoneyBillWave, FaClock, FaUtensils, 
  FaExternalLinkAlt, FaGithub, FaTimes, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
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
    setCurrentImageSrc(currentProject.screenshots[nextIndex]);
  };

  const prevImage = () => {
    if (!currentProject || !currentProject.screenshots) return;
    
    const prevIndex = currentImageIndex === 0 ? currentProject.screenshots.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setCurrentImageSrc(currentProject.screenshots[prevIndex]);
  };

  const projects = [
    {
      id: 1,
      title: 'FundFlow',
      description: 'Plateforme de crowdfunding pour projets communautaires avec système de paiement intégré Flutterwave.',
      technologies: ['Laravel', 'Tailwind CSS', 'Flutterwave', 'MySQL'],
      icon: FaMoneyBillWave,
      stack: 'Full Stack Laravel',
      screenshots: [
        '/screenshots/fund1.png',
        '/screenshots/fund2.png',
        '/screenshots/fund3.png',
        '/screenshots/fund4.png',
        '/screenshots/fund5.png'
      ]
    },
    {
      id: 2,
      title: 'E-commerce de montres',
      description: 'Site e-commerce moderne avec système de commande et notification e-mail automatisée.',
      technologies: ['React', 'Laravel', 'MySQL', 'Email API'],
      icon: FaClock,
      stack: 'React + Laravel',
      screenshots: [
        '/screenshots/mdp1.png',
        '/screenshots/mdp2.png',
        '/screenshots/mdp3.png',
        '/screenshots/mdp4.png'
      ]
    },
    {
      id: 3,
      title: 'FoodHub',
      description: 'Plateforme de vente de nourriture avec gestion des commandes et livraison.',
      technologies: ['React', 'Laravel', 'MySQL', 'Real-time'],
      icon: FaUtensils,
      stack: 'React + Laravel',
      screenshots: [
        '/screenshots/food1.png',
        '/screenshots/food2.png',
        '/screenshots/food3.png',
        '/screenshots/food4.png',
        '/screenshots/food5.png'
      ]
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
          
          <div className="projects-grid">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="project-image">
                    <div className="project-icon">
                      <IconComponent />
                    </div>
                    <div className="project-stack">
                      {project.stack}
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-technologies">
                      {project.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="project-screenshots">
                      <h4 className="screenshots-title">
                        Captures d'écran du projet ({project.screenshots.length} images)
                      </h4>
                      <div className="screenshots-grid">
                        {project.screenshots.map((screenshot, idx) => {
                          const errorKey = `${project.id}-${idx}`;
                          const hasError = imageErrors[errorKey];
                          
                          return (
                            <div 
                              key={idx} 
                              className="screenshot-item"
                              data-index={`${idx + 1}`}
                              title={`Cliquez pour agrandir - ${project.title} - Capture ${idx + 1}`}
                              onClick={() => !hasError && openModal(screenshot, project.title, idx, project)}
                            >
                              {!hasError ? (
                                <img 
                                  src={screenshot} 
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
