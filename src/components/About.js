import React from 'react';
import { FaGraduationCap, FaProjectDiagram, FaCode, FaShieldAlt } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

const About = () => {
  const [leftRef, leftVisible] = useScrollAnimation({ threshold: 0.2 });
  const [rightRef, rightVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-inner">

          {/* Left */}
          <div ref={leftRef} className={`about-left ${leftVisible ? 'animate-in' : ''}`}>
            <span className="section-label">À propos</span>
            <h2 className="section-title">Passionné par le code,<br />orienté résultats</h2>
            <div className="about-description">
              <p>
                Je suis <span className="highlight-text">Christ Ekra</span>, développeur web full stack
                basé en Côte d'Ivoire. Je crée des applications web modernes, performantes et adaptées
                aux réalités africaines.
              </p>
              <p>
                Mon expertise couvre Laravel, React et Angular, des plateformes e-commerce aux systèmes
                ERP en passant par les applications de gestion. Chaque projet est une opportunité de
                livrer une solution propre et maintenable.
              </p>
              <p>
                Diplômé en Génie Logiciel à l'IIPEA, je prépare mon Master 1 en Cybersécurité pour
                renforcer mes compétences en sécurité applicative.
              </p>
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className={`about-right ${rightVisible ? 'animate-in' : ''}`}>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-icon"><FaGraduationCap /></div>
                <div className="stat-number">Licence</div>
                <div className="stat-label">Génie Logiciel</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><FaProjectDiagram /></div>
                <div className="stat-number">7+</div>
                <div className="stat-label">Projets réalisés</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><FaCode /></div>
                <div className="stat-number">15+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><FaShieldAlt /></div>
                <div className="stat-number">Master 1</div>
                <div className="stat-label">Cybersécurité</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
