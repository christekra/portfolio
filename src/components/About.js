import React from 'react';
import { FaGraduationCap, FaProjectDiagram, FaCode, FaShieldAlt } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

const About = () => {
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">À PROPOS</h2>
          <p className="section-subtitle">
            Diplômé en Génie Logiciel, je crée des applications web modernes et performantes. 
            Prêt à entamer mon Master 1 en Cybersécurité pour approfondir mes compétences en sécurité informatique.
          </p>
        </div>
        
        <div ref={statsRef} className={`about-stats ${statsVisible ? 'animate-in' : ''}`}>
          <div className="stat-item">
            <div className="stat-icon">
              <FaGraduationCap />
            </div>
            <div className="stat-content">
              <div className="stat-number">Licence</div>
              <div className="stat-label">Génie Logiciel</div>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaProjectDiagram />
            </div>
            <div className="stat-content">
              <div className="stat-number">6+</div>
              <div className="stat-label">Projets Réalisés</div>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaCode />
            </div>
            <div className="stat-content">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies Maîtrisées</div>
            </div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaShieldAlt />
            </div>
            <div className="stat-content">
              <div className="stat-number">Master 1</div>
              <div className="stat-label">Cybersécurité</div>
            </div>
          </div>
        </div>

        <div ref={textRef} className={`about-text ${textVisible ? 'animate-in' : ''}`}>
          <div className="about-description">
            <p>
              Je suis <span className="highlight-text">Christ Ekra</span>, développeur web full stack passionné par la création 
              de solutions innovantes. J'ai travaillé sur plusieurs projets en Laravel, React et Angular, allant d'applications 
              de gestion à des plateformes de crowdfunding.
            </p>
            <p>
              Mon objectif est de me spécialiser en sécurité informatique tout en continuant à créer des solutions modernes 
              et adaptées aux réalités africaines. Je suis constamment en train d'apprendre de nouvelles technologies 
              pour rester à jour avec les dernières tendances.
            </p>
            <p>
              Licence en Génie Logiciel obtenue à l'IIPEA. Je crois en la création de code propre, maintenable et évolutif. 
              Chaque projet est une opportunité d'apprendre et de s'améliorer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
