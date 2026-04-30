import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Christ <span>Ekra</span></h3>
            <p>Développeur Full Stack spécialisé Laravel, React et Angular. Je construis des applications web modernes et performantes.</p>
            <div className="social-links">
              <a href="mailto:chtistekra@gmail.com" className="social-link" title="Email" aria-label="Email">
                <FaEnvelope />
              </a>
              <a
                href="https://www.linkedin.com/in/christ-ekra-399841307"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/christekra"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="GitHub"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Compétences</h4>
            <ul>
              <li>Frontend</li>
              <li>Backend</li>
              <li>Bases de données</li>
              <li>DevOps</li>
              <li>Cybersécurité</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Technologies</h4>
            <ul>
              <li>Laravel & PHP</li>
              <li>React & Angular</li>
              <li>MySQL & PostgreSQL</li>
              <li>Git & Docker</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:chtistekra@gmail.com">chtistekra@gmail.com</a></li>
              <li>Abidjan, Côte d'Ivoire</li>
              <li>Disponible pour projets</li>
              <li>Freelance & CDI</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Christ Ekra — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
