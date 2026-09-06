import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import Spinner from '../../components/Spinner/Spinner';
import './Contact.css';

const FALLBACK_CONTACT = {
  introTitle: 'Prenez contact avec nous',
  introText: "Nous vous encourageons à partager vos demandes ou préoccupations en remplissant le formulaire afin d'obtenir de plus amples informations.",
  phones: ['+(216) 25 540 762', '+(216) 94 305 094', '+(216) 93 071 049'],
  emails: ['contact.junior.ensi@gmail.com', 'commercial.ensi.junior@gmail.com'],
  address: 'Campus Universitaire، ENSI, Manouba 2010',
};

const deriveContact = (siteContent) =>
  siteContent.contactPage && siteContent.contactPage.phones?.length > 0
    ? { ...FALLBACK_CONTACT, ...siteContent.contactPage }
    : FALLBACK_CONTACT;

const Contact = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const cachedSite = getCached('/content/site');
  const [contactInfo, setContactInfo] = useState(cachedSite ? deriveContact(cachedSite) : null);

  useEffect(() => {
    if (getCached('/content/site')) return;
    let isMounted = true;
    axiosClient.get('/content/site')
      .then(({ data }) => {
        setCached('/content/site', data.data);
        if (isMounted) setContactInfo(deriveContact(data.data));
      })
      .catch(() => {
        if (isMounted) setContactInfo(FALLBACK_CONTACT);
      });
    return () => { isMounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('');
    setIsError(false);

    try {
      const response = await axiosClient.post('/contact', formData);

      setFeedbackMessage(response.data.message || 'Message envoyé avec succès !');
      setFormData({
        prenom: '',
        nom: '',
        email: '',
        sujet: '',
        message: ''
      });

    } catch (error) {
      setIsError(true);
      if (error.response && error.response.data && error.response.data.message) {
        setFeedbackMessage(error.response.data.message);
      } else {
        setFeedbackMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!contactInfo) return <Spinner />;

  return (
    <div className="contact-page">
      <div className="background-overlay"></div>
      <header className="contact-header">
        <div className="header-content">
          <h1><span className="highlight">Contactez</span> Nous</h1>
          <div className="subtitle-container">
            <p>Contactez-nous, nous sommes là pour vous aider et répondre à vos questions.</p>
          </div>
        </div>
      </header>

      <main className="contact-main">
        <div className="contact-info-container">
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-phone-alt"></i></div>
            <h3>Phone</h3>
            {contactInfo.phones.map((phone) => <p key={phone}>Mobile: {phone}</p>)}
          </div>
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-envelope"></i></div>
            <h3>Email</h3>
            {contactInfo.emails.map((email) => <p key={email}>{email}</p>)}
          </div>
          <div className="contact-info-box">
            <div className="icon-container"><i className="fas fa-map-marker-alt"></i></div>
            <h3>Address</h3>
            <p>{contactInfo.address}</p>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-text-content">
            <h2>{contactInfo.introTitle}</h2>
            <p>{contactInfo.introText}</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Adresse e-mail"
                className="full-width"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="sujet"
                placeholder="Sujet"
                className="full-width"
                value={formData.sujet}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-row">
              <textarea
                name="message"
                placeholder="Message..."
                className="full-width"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}>
              </textarea>
            </div>
            <div className="form-row">
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Envoyer'}
              </button>
            </div>
          </form>

          {feedbackMessage && (
            <p className={`feedback-message ${isError ? 'error' : 'success'}`}>
              {feedbackMessage}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contact;
