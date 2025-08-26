import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', ''

  useEffect(() => {
    emailjs.init("w_Dnohw_ZKYRcoObo");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Tous les champs sont obligatoires');
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        portfolio_name: 'Christ Ekra - Portfolio',
        date: new Date().toLocaleDateString('fr-FR'),
        time: new Date().toLocaleTimeString('fr-FR')
      };

      console.log('Tentative d\'envoi avec les paramètres:', templateParams);

      const response = await emailjs.send(
        'service_tx0rv3q',
        'template_wjuqlmh',
        templateParams
      );

      console.log('Réponse EmailJS reçue:', response);

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Statut de réponse non-200:', response.status);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur détaillée lors de l\'envoi:', error);
      console.error('Type d\'erreur:', error.constructor.name);
      console.error('Message d\'erreur:', error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">N'hésitez pas à me contacter pour vos projets</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Parlons de votre projet</h3>
            <p>
              Je suis disponible pour discuter de vos projets web, que ce soit pour du développement, 
              de la maintenance ou des améliorations. N'hésitez pas à me contacter !
            </p>
            
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>chtistekra@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h4>Téléphone</h4>
                  <p>+225 07 14 42 50 34</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h4>Localisation</h4>
                  <p>Abidjan, Côte d'Ivoire</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <FaDownload />
                </div>
                <div className="contact-details">
                  <h4>CV</h4>
                  <a 
                    href="/cv.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download="cv.pdf"
                    style={{ color: '#3b82f6', textDecoration: 'none' }}
                  >
                    Télécharger mon CV
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Sujet *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
            
            {submitStatus === 'success' && (
              <div className="status-message success">
                <FaEnvelope />
                <p>Message envoyé avec succès ! Je vous répondrai bientôt.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="status-message error">
                <FaEnvelope />
                <p>Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
