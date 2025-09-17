import React from 'react';
import './Inscription.css';
import { FaUsers, FaStar } from 'react-icons/fa';
import { MdStorefront } from 'react-icons/md';

const Inscription = () => {
  return (
    <div className="inscription-page">
      <header className="inscription-header">
        <h1>
          GET <span className="text-orange">ENTREPRENEURIAL</span>
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
                <h2>Participants</h2>
              </div>
              <p className="card-description">
                Rejoignez plus de 500 professionnels passionnés de technologie pour trois jours
                d'innovations, de networking et de découvertes qui transformeront votre vision
                du futur. Explorez les dernières tendances, participez à des ateliers exclusifs et
                créez des connexions qui feront la différence dans votre carrière.
              </p>
            </div>
            <div className="card-footer">
              <ul className="card-benefits">
                <li><FaStar className="star-icon" /> 10+ Conférences</li>
                <li><FaStar className="star-icon" /> 10+ Ateliers</li>
                <li><FaStar className="star-icon" /> Networking premium</li>
              </ul>
              <a href="/participant" className="inscription-button-card">
                <span className="button-text">S'inscrire maintenant</span>
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
                <h2>Exposants</h2>
              </div>
              <p className="card-description">
                Présentez vos innovations à un public qualifié et établissez votre leadership sur
                le marché technologique. Bénéficiez d'une visibilité exceptionnelle auprès des
                décideurs de l'industrie et générez des leads de qualité premium qui
                propulseront votre croissance.
              </p>
            </div>
            <div className="card-footer">
              <ul className="card-benefits">
                <li><FaStar className="star-icon" /> Visibilités premium</li>
                <li><FaStar className="star-icon" /> 10+ Ateliers</li>
                <li><FaStar className="star-icon" /> Networking premium</li>
              </ul>
              <a href="/exposant" className="inscription-button-card">
                <span className="button-text">Devenir exposant</span>
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