import React from 'react';
import { 
  FaLaravel, FaReact, FaAngular, FaPhp, FaJs, 
  FaHtml5, FaCss3Alt, FaDatabase, FaGitAlt, 
  FaDocker, FaGithub, FaShieldAlt 
} from 'react-icons/fa';
import { SiC, SiMysql, SiTailwindcss, SiBootstrap } from 'react-icons/si';
import { DiDotnet } from 'react-icons/di';
import './Skills.css';

const Skills = () => {
  const skills = [
    { name: 'Laravel', level: 90, category: 'Backend', icon: FaLaravel },
    { name: 'React', level: 85, category: 'Frontend', icon: FaReact },
    { name: 'Angular', level: 80, category: 'Frontend', icon: FaAngular },
    { name: 'PHP', level: 90, category: 'Backend', icon: FaPhp },
    { name: 'JavaScript', level: 85, category: 'Frontend', icon: FaJs },
    { name: 'C#', level: 60, category: 'Backend', icon: DiDotnet },
    { name: 'C', level: 55, category: 'Backend', icon: SiC },
    { name: 'HTML/CSS', level: 90, category: 'Frontend', icon: FaHtml5 },
    { name: 'MySQL', level: 85, category: 'Database', icon: SiMysql },
    { name: 'Tailwind CSS', level: 80, category: 'Frontend', icon: SiTailwindcss },
    { name: 'Bootstrap', level: 85, category: 'Frontend', icon: SiBootstrap },
    { name: 'Git', level: 90, category: 'Tools', icon: FaGitAlt },
    { name: 'Docker', level: 75, category: 'Tools', icon: FaDocker },
    { name: 'GitHub Actions', level: 70, category: 'Tools', icon: FaGithub },
    { name: 'JWT/OAuth', level: 75, category: 'Sécurité', icon: FaShieldAlt }
  ];

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Sécurité'];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="section-header">
          <h2 className="section-title">Compétences</h2>
          <p className="section-subtitle">Mes technologies et outils préférés</p>
        </div>
        
        <div className="skills-content">
          {categories.map(category => (
            <div key={category} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="skills-grid">
                {skills
                  .filter(skill => skill.category === category)
                  .map(skill => {
                    const IconComponent = skill.icon;
                    return (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-header">
                          <div className="skill-info">
                            <IconComponent className="skill-icon" />
                            <span className="skill-name">{skill.name}</span>
                          </div>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
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
