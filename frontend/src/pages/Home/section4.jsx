import React, { useState, useEffect } from 'react';
import './section4.css';
import { useInView } from 'react-intersection-observer';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import Spinner from '../../components/Spinner/Spinner';

// Assurez-vous que le chemin vers vos images est correct
import b2bImage from '../../assets/images/B2Bcom.png';
import b2cImage from '../../assets/images/BtoCcomp.jpg';
import b2sImage from '../../assets/images/BtoScomp.jpg';

const FALLBACK_AXES = [
  {
    image: b2bImage,
    titleLine1: 'Business',
    titleLine2: 'To Business',
    backText: "L'événement propose des ateliers, des sessions de networking et des panels pour favoriser la rencontre entre startups et grandes entreprises, afin de développer des partenariats stratégiques durables. Les participants auront l'opportunité d'explorer des technologies innovantes et des solutions permettant d'améliorer l'efficacité opérationnelle. L'objectif est de permettre aux entreprises d'accéder à des innovations et de créer des collaborations qui soutiendront leur croissance.",
    ctaLabel: "S'ABONNER",
    ctaHref: '/inscription',
  },
  {
    image: b2cImage,
    titleLine1: 'Business',
    titleLine2: 'To Client',
    backText: "Des stands d'exposition, des démonstrations en direct et des opportunités d'acquisition de clients sont proposés pour permettre aux startups et entreprises de rencontrer directement leur clientèle cible. C'est l'occasion idéale de tester vos produits, de recueillir des retours instantanés et de fidéliser de nouveaux clients. Les participants peuvent ainsi mieux comprendre les besoins du marché, ajuster leurs offres en temps réel et renforcer leur présence auprès de leur public.",
    ctaLabel: "S'ABONNER",
    ctaHref: '/inscription',
  },
  {
    image: b2sImage,
    titleLine1: 'Business',
    titleLine2: 'To Stakeholders',
    backText: "Des sessions privées de pitching avec des investisseurs et des tables rondes avec des décideurs politiques sont proposées, offrant ainsi aux entrepreneurs l'opportunité de se connecter avec des investisseurs, des représentants du gouvernement et des influenceurs du secteur. C'est une occasion clé pour établir des relations cruciales en matière de financement, de réglementation et de croissance. Ces échanges permettent d'influencer les futurs cadres légaux.",
    ctaLabel: "S'ABONNER",
    ctaHref: '/inscription',
  },
];

// Met en évidence la première lettre de chaque mot, comme dans le design d'origine
const renderHighlightedLine = (text) => {
  const words = text.split(' ');
  return words.map((word, i) => (
    <React.Fragment key={i}>
      <span className="text-orange">{word.charAt(0)}</span>{word.slice(1)}{i < words.length - 1 ? ' ' : ''}
    </React.Fragment>
  ));
};

const Section4 = () => {
  const [axesData, setAxesData] = useState(() => getCached('/content/axes') || null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (getCached('/content/axes')) return;
    let isMounted = true;
    axiosClient.get('/content/axes')
      .then(({ data }) => {
        const resolved = data.data.length > 0 ? data.data : FALLBACK_AXES;
        setCached('/content/axes', resolved);
        if (isMounted) setAxesData(resolved);
      })
      .catch(() => {
        if (isMounted) setAxesData(FALLBACK_AXES);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <section className={`axes-section ${inView ? 'visible' : ''}`} ref={ref}>
      <div className="axes-title-group">
        <h2>GET ENTREPRENEURIAL</h2>
        <div className="axes-subtitle">
          <span className="line"></span>
          <h3>Trois Axes, Une Destination</h3>
          <span className="line"></span>
        </div>
      </div>

      <div className="axes-cards-container">
        {!axesData && <Spinner />}
        {axesData && axesData.map((axis, index) => (
          <div className="flip-card" key={axis._id || index}>
            <div className="flip-card-inner">
              <div className="flip-card-front" style={{ backgroundImage: `url(${axis.image})` }}>
                <div className="card-title-content">
                  <div className="title-decorator-line"></div>
                  <h4>{renderHighlightedLine(axis.titleLine1)}</h4>
                  <h4>{renderHighlightedLine(axis.titleLine2)}</h4>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="card-back-content">
                  <p>{axis.backText}</p>
                  <a href={axis.ctaHref} className="subscribe-button">{axis.ctaLabel}</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section4;
