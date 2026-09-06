import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Handshake, Zap, Info, Star, Award } from 'lucide-react';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import Spinner from '../../components/Spinner/Spinner';
import './EditionPage.css';

const ICONS = { handshake: Handshake, zap: Zap, info: Info, star: Star, award: Award };

const EditionPage = () => {
  const { slug } = useParams();
  const cacheKey = `/content/editions/slug/${slug}`;
  const cachedEdition = getCached(cacheKey);
  const [edition, setEdition] = useState(cachedEdition !== undefined ? cachedEdition : undefined); // undefined = loading, null = not found
  const [loading, setLoading] = useState(cachedEdition === undefined);

  useEffect(() => {
    if (getCached(cacheKey) !== undefined) return;
    let isMounted = true;
    setLoading(true);
    axiosClient.get(cacheKey)
      .then(({ data }) => {
        setCached(cacheKey, data.data);
        if (isMounted) setEdition(data.data);
      })
      .catch(() => { if (isMounted) setEdition(null); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, [cacheKey]);

  if (loading) return <Spinner />;

  if (!edition) {
    return (
      <div className="edition-page-container">
        <div className="not-found">Cette édition n'est pas disponible.</div>
      </div>
    );
  }

  return (
    <div className="edition-page-container">
      <section className="hero-edition">
        {edition.heroImage && <img src={edition.heroImage} alt={edition.editionLabel} className="hero-background-image" />}
        <div className="hero-color-overlay"></div>
        <div className="hero-overlay-content">
          <h1>GET ENTREPRENEURIAL — {edition.editionLabel}</h1>
          {edition.tagline && (
            <div className="hero-tagline">
              <span className="line"></span>
              <p>{edition.tagline}</p>
              <span className="line"></span>
            </div>
          )}
          {edition.dateVenueText && <p className="date-venue">{edition.dateVenueText}</p>}
        </div>
      </section>

      {edition.stats.length > 0 && (
        <section className="intro-edition">
          <div className="stats-container">
            {edition.stats.map((stat, index) => (
              <div className="stat-box" key={index}>
                <span>{stat.value}</span>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {edition.introCards.length > 0 && (
        <section className="intro-cards-section">
          <div className="section-header"><h2>Plongez au Cœur de l'Événement</h2></div>
          <div className="intro-cards-grid">
            {edition.introCards.map((card, index) => {
              const Icon = ICONS[card.icon] || Info;
              return (
                <div className="intro-card" key={index}>
                  <div className="intro-icon"><Icon size={36} /></div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {edition.gallery.length > 0 && (
        <section className="gallery-section">
          <div className="section-header"><h2>Temps Forts</h2></div>
          <div className="gallery-grid">
            {edition.gallery.map((img, index) => (
              <img key={index} src={img.image} alt={img.alt || `Temps fort ${index + 1}`} loading="lazy" />
            ))}
          </div>
        </section>
      )}

      {edition.testimonials.length > 0 && (
        <section className="testimonials-section">
          <div className="section-header"><h2>Témoignages</h2></div>
          <div className="testimonials-grid">
            {edition.testimonials.map((t, index) => (
              <div className="testimonial-card" key={index}>
                <p>« {t.quote} »</p>
                <div className="author-info">
                  {t.image && <img src={t.image} alt={t.name} />}
                  <strong>{t.name}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {edition.partnerLogos.length > 0 && (
        <section className="partner-logos-section">
          <div className="section-header"><h2>Nos Précieux Alliés</h2></div>
          <div className="partner-logos-grid">
            {edition.partnerLogos.map((logo, index) => (
              <img key={index} src={logo.image} alt={logo.alt || `Partenaire ${index + 1}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default EditionPage;
