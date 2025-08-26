import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">À Propos</h2>
          <p className="section-subtitle">Découvrez mon parcours et ma passion</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Qui suis-je ?</h3>
            <p>
              Je suis Christ Ekra, diplômé en Génie Logiciel, passionné par le développement web et la cybersécurité. 
              J'ai déjà travaillé sur plusieurs projets en Laravel, React et Angular, allant d'applications de gestion à des plateformes de crowdfunding.
            </p>
            
            <h3>Mon parcours</h3>
            <p>
              Mon objectif est de me spécialiser en sécurité informatique tout en continuant à créer des solutions modernes 
              et adaptées aux réalités africaines. Je suis constamment en train d'apprendre de nouvelles technologies 
              pour rester à jour avec les dernières tendances.
            </p>
            
            <h3>Ma formation</h3>
            <p>
              Licence en Génie Logiciel obtenue à l'IIPEA (Institut International Polytechnique de l'Eau et de l'Assainissement). 
              Prêt à entamer mon Master 1 en Cybersécurité. Je crois en la création de code propre, maintenable et évolutif. 
              Chaque projet est une opportunité d'apprendre et de s'améliorer.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">Licence</div>
              <div className="stat-label">Génie Logiciel</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6+</div>
              <div className="stat-label">Projets réalisés</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Technologies maîtrisées</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Master 1</div>
              <div className="stat-label">Cybersécurité</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
