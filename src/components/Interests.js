import React from 'react';
import { 
  FaShieldAlt, FaCode, FaPalette, FaBook, FaMusic 
} from 'react-icons/fa';
import './Interests.css';

const Interests = () => {
  const interests = [
    {
      icon: FaShieldAlt,
      title: 'Sécurité informatique',
      description: 'Passionné par la cybersécurité et la protection des données'
    },
    {
      icon: FaCode,
      title: 'Développement web moderne',
      description: 'Création d\'applications web performantes et innovantes'
    },
    {
      icon: FaPalette,
      title: 'UI/UX design',
      description: 'Conception d\'interfaces utilisateur intuitives et esthétiques'
    },
    {
      icon: FaBook,
      title: 'Lecture & veille technologique',
      description: 'Rester à jour avec les dernières tendances technologiques'
    },
    {
      icon: FaMusic,
      title: 'Musique',
      description: 'Membre de la chorale "La Voix des Anges"'
    }
  ];

  return (
    <section id="interests" className="interests">
      <div className="interests-container">
        <div className="section-header">
          <h2 className="section-title">Centres d'intérêt</h2>
          <p className="section-subtitle">Découvrez mes passions et activités</p>
        </div>
        
        <div className="interests-grid">
          {interests.map((interest, index) => {
            const IconComponent = interest.icon;
            return (
              <div key={index} className="interest-card">
                <div className="interest-icon">
                  <IconComponent />
                </div>
                <h3 className="interest-title">{interest.title}</h3>
                <p className="interest-description">{interest.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Interests;
