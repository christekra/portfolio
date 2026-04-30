import React from 'react';
import {
  FaLaravel, FaReact, FaAngular, FaPhp, FaJs,
  FaHtml5, FaGitAlt,
  FaDocker, FaGithub, FaShieldAlt, FaSearch, FaInfinity
} from 'react-icons/fa';
import {
  SiC, SiMysql, SiPostgresql, SiMongodb, SiRedis,
  SiTailwindcss, SiBootstrap, SiFlutter
} from 'react-icons/si';
import { DiDotnet } from 'react-icons/di';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Skills.css';

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const skills = [
    { name: 'Laravel', level: 90, category: 'Backend', icon: FaLaravel, experience: 'Expert' },
    { name: 'Laravel Sanctum & Passport', level: 88, category: 'Backend', icon: FaShieldAlt, experience: 'Expert' },
    { name: 'Laravel Livewire', level: 85, category: 'Backend', icon: FaLaravel, experience: 'Avancé' },
    { name: 'React', level: 85, category: 'Frontend', icon: FaReact, experience: 'Avancé' },
    { name: 'Inertia.js', level: 82, category: 'Frontend', icon: FaInfinity, experience: 'Avancé' },
    { name: 'Angular', level: 80, category: 'Frontend', icon: FaAngular, experience: 'Avancé' },
    { name: 'PHP', level: 90, category: 'Backend', icon: FaPhp, experience: 'Expert' },
    { name: 'JavaScript', level: 85, category: 'Frontend', icon: FaJs, experience: 'Avancé' },
    { name: 'C#', level: 60, category: 'Backend', icon: DiDotnet, experience: 'Intermédiaire' },
    { name: 'C', level: 55, category: 'Backend', icon: SiC, experience: 'Intermédiaire' },
    { name: 'HTML/CSS', level: 90, category: 'Frontend', icon: FaHtml5, experience: 'Expert' },
    { name: 'MySQL', level: 85, category: 'Database', icon: SiMysql, experience: 'Avancé' },
    { name: 'PostgreSQL', level: 80, category: 'Database', icon: SiPostgresql, experience: 'Avancé' },
    { name: 'MongoDB', level: 70, category: 'Database', icon: SiMongodb, experience: 'Intermédiaire' },
    { name: 'Redis', level: 65, category: 'Database', icon: SiRedis, experience: 'Intermédiaire' },
    { name: 'Tailwind CSS', level: 80, category: 'Frontend', icon: SiTailwindcss, experience: 'Avancé' },
    { name: 'Bootstrap', level: 85, category: 'Frontend', icon: SiBootstrap, experience: 'Avancé' },
    { name: 'Git', level: 90, category: 'Tools', icon: FaGitAlt, experience: 'Expert' },
    { name: 'GitHub', level: 90, category: 'Tools', icon: FaGithub, experience: 'Expert' },
    { name: 'Docker', level: 75, category: 'Tools', icon: FaDocker, experience: 'Avancé' },
    { name: 'GitHub Actions (CI/CD)', level: 75, category: 'Tools', icon: FaGithub, experience: 'Avancé' },
    { name: 'SEO & Optimisation', level: 80, category: 'Tools', icon: FaSearch, experience: 'Avancé' },
    { name: 'JWT/OAuth', level: 75, category: 'Sécurité', icon: FaShieldAlt, experience: 'Avancé' },
    { name: 'Flutter', level: 78, category: 'Mobile', icon: SiFlutter, experience: 'Avancé' },
    { name: 'React Native', level: 80, category: 'Mobile', icon: FaReact, experience: 'Avancé' }
  ];

  const categories = [
    { name: 'Frontend', icon: '🎨', description: 'Technologies de l\'interface utilisateur' },
    { name: 'Backend', icon: '⚙️', description: 'Technologies serveur et API' },
    { name: 'Database', icon: '💾', description: 'Gestion et optimisation des données' },
    { name: 'Tools', icon: '🛠️', description: 'Outils de développement et DevOps' },
    { name: 'Sécurité', icon: '🔒', description: 'Sécurité et authentification' },
    { name: 'Mobile', icon: '📱', description: 'Applications mobiles et cross-platform' }
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="section-header">
          <span className="section-label">Stack technique</span>
          <h2 className="section-title">Compétences</h2>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            Technologies et outils que j'utilise pour créer des applications modernes
          </p>
        </div>
        
        <div ref={ref} className={`skills-content ${isVisible ? 'animate-in' : ''}`}>
          {categories.map((category, catIndex) => (
            <div key={category.name} className="category-section" style={{ animationDelay: `${catIndex * 0.1}s` }}>
              <div className="category-header">
                <div className="category-icon">
                  <span className="category-emoji">{category.icon}</span>
                </div>
                <div className="category-info">
                  <h3 className="category-title">{category.name}</h3>
                  <span className="category-count">
                    {skills.filter(skill => skill.category === category.name).length} technologies
                  </span>
                </div>
              </div>
              <div className="skills-list">
                {skills
                  .filter(skill => skill.category === category.name)
                  .map((skill, skillIndex) => {
                    const IconComponent = skill.icon;
                    return (
                      <div 
                        key={skill.name} 
                        className="skill-item"
                        style={{ animationDelay: `${(catIndex * 0.1) + (skillIndex * 0.05)}s` }}
                      >
                        <div className="skill-main">
                          <div className="skill-icon-wrapper">
                            <IconComponent className="skill-icon" />
                          </div>
                          <div className="skill-details">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-experience">{skill.experience}</span>
                          </div>
                          <div className="skill-percentage">
                            <span className="percentage-value">{skill.level}%</span>
                          </div>
                        </div>
                        <div className="skill-bar-container">
                          <div className="skill-bar">
                            <div 
                              className={`skill-progress ${isVisible ? 'animate-progress' : ''}`}
                              style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                            >
                              <div className="progress-shine"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
