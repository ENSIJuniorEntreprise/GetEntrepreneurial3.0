import React, { useState, useEffect } from 'react';
import './Inscription.css';
import { FaUsers, FaStar } from 'react-icons/fa';
import { MdStorefront } from 'react-icons/md';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import Spinner from '../../components/Spinner/Spinner';

const FALLBACK_CARDS = {
  participantCard: {
    title: 'Participants',
    text: "Rejoignez plus de 500 professionnels passionnés de technologie pour trois jours d'innovations, de networking et de découvertes qui transformeront votre vision du futur. Explorez les dernières tendances, participez à des ateliers exclusifs et créez des connexions qui feront la différence dans votre carrière.",
    benefits: ['10+ Conférences', '10+ Ateliers', 'Networking premium'],
    ctaLabel: "S'inscrire maintenant",
    ctaHref: '/participant',
  },
  exposantCard: {
    title: 'Exposants',
    text: "Présentez vos innovations à un public qualifié et établissez votre leadership sur le marché technologique. Bénéficiez d'une visibilité exceptionnelle auprès des décideurs de l'industrie et générez des leads de qualité premium qui propulseront votre croissance.",
    benefits: ['Visibilités premium', '10+ Ateliers', 'Networking premium'],
    ctaLabel: 'Devenir exposant',
    ctaHref: '/exposant',
  },
};

const deriveCards = (siteContent) =>
  siteContent.inscriptionPage?.participantCard?.title
    ? { ...FALLBACK_CARDS, ...siteContent.inscriptionPage }
    : FALLBACK_CARDS;

const Inscription = () => {
  const cachedSite = getCached('/content/site');
  const [cards, setCards] = useState(cachedSite ? deriveCards(cachedSite) : null);

  useEffect(() => {
    if (getCached('/content/site')) return;
    let isMounted = true;
    axiosClient.get('/content/site')
      .then(({ data }) => {
        setCached('/content/site', data.data);
        if (isMounted) setCards(deriveCards(data.data));
      })
      .catch(() => {
        if (isMounted) setCards(FALLBACK_CARDS);
      });
    return () => { isMounted = false; };
  }, []);

  if (!cards) return <Spinner />;

  return (
    <div className="inscription-page">
      <header className="inscription-header">
        <h1>
          <span className="text-orange">GET E</span>NTREPRENEURIAL
        </h1>
        <p className="subtitle">
          Le rendez-vous incontournable de l'entrepreneuriat et de l'innovation technologique
        </p>
      </header>

      <main className="inscription-content">
        {/* Carte pour les Participants */}
        <div className="choice-card">
          <div className="card-background"></div>
          <div className="card-overlay"></div>
          <div className="card-content">
            <div className="card-header">
              <div className="card-title">
                <FaUsers className="title-icon" />
                <h2>{cards.participantCard.title}</h2>
              </div>
              <p className="card-description">{cards.participantCard.text}</p>
            </div>
            <div className="card-footer">
              <ul className="card-benefits">
                {cards.participantCard.benefits.map((benefit) => (
                  <li key={benefit}><FaStar className="star-icon" /> {benefit}</li>
                ))}
              </ul>
              <a href={cards.participantCard.ctaHref} className="inscription-button-card">
                <span className="button-text">{cards.participantCard.ctaLabel}</span>
                <span className="button-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Carte pour les Exposants */}
        <div className="choice-card">
          <div className="card-background"></div>
          <div className="card-overlay"></div>
          <div className="card-content">
            <div className="card-header">
              <div className="card-title">
                <MdStorefront className="title-icon" />
                <h2>{cards.exposantCard.title}</h2>
              </div>
              <p className="card-description">{cards.exposantCard.text}</p>
            </div>
            <div className="card-footer">
              <ul className="card-benefits">
                {cards.exposantCard.benefits.map((benefit) => (
                  <li key={benefit}><FaStar className="star-icon" /> {benefit}</li>
                ))}
              </ul>
              <a href={cards.exposantCard.ctaHref} className="inscription-button-card">
                <span className="button-text">{cards.exposantCard.ctaLabel}</span>
                <span className="button-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inscription;
