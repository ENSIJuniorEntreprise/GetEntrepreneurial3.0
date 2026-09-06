import React, { useState, useEffect } from 'react';
import './Collaboration.css'; // Le CSS est inchangé
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import Spinner from '../../components/Spinner/Spinner';

// --- Logos existants ---
import ooredooLogo from '../../assets/images/oreedo-.png';
import villageLogo from '../../assets/images/villagee.png';
import daamLogo from '../../assets/images/DAAM-.png';
import atiiLogo from '../../assets/images/atiii.png';
import hotelLaicoLogo from '../../assets/images/hotell.png';
import sepicmLogo from '../../assets/images/sepcmm.png';
import biasLogo from '../../assets/images/BIASS.png';
import honorisLogo from '../../assets/images/honoo.png';
import smartCapitalLogo from '../../assets/images/smartcapital-logo.png';
import tunisianStartupsLogo from '../../assets/images/Tunisian startups.png';
import bidLogo from '../../assets/images/BID.png';
import umaLogo from '../../assets/images/umaa.png';
import conectLogo from '../../assets/images/CONECT (2).png';
import anetiLogo from '../../assets/images/Anettti.png';
import apiiLogo from '../../assets/images/apiii.png';
import slrDarkLogo from '../../assets/images/SLRdark.png';
import lapresseLogo from '../../assets/images/lapresse.png';
import tachghilLogo from '../../assets/images/tachghill.png';
import insatPressLogo from '../../assets/images/insat_press.png';
import asteelflashLogo from '../../assets/images/cdcc.png';
import ctaImage from '../../assets/images/stand.jpeg';

const FALLBACK_SPONSORS = [
  { category: 'Gold', image: asteelflashLogo, name: 'Asteelflash', link: 'https://www.cdc.tn/fr' },
  { category: 'Gold', image: ooredooLogo, name: 'Ooredoo', link: 'https://www.ooredoo.tn/' },
  { category: 'Gold', image: villageLogo, name: 'The Dot (Village by CA)', link: 'https://www.startupvillage.tn/en/' },

  { category: 'Silver', image: daamLogo, name: 'DAAM', link: 'https://www.daam.tn/' },
  { category: 'Silver', image: atiiLogo, name: 'ATII', link: 'https://www.atii.tn/' },
  { category: 'Silver', image: hotelLaicoLogo, name: 'Laico Hotel', link: '' },
  { category: 'Silver', image: sepicmLogo, name: 'SEPCM', link: '' },

  { category: 'Nos Alliés', image: biasLogo, name: 'BIAS', link: 'https://bias.com.tn/fr' },
  { category: 'Nos Alliés', image: honorisLogo, name: 'Honoris United Universities', link: 'https://honoris.net/our-institutions/tunisia/' },
  { category: 'Nos Alliés', image: smartCapitalLogo, name: 'Smart Capital', link: 'https://www.smartcapital.tn/' },
  { category: 'Nos Alliés', image: tunisianStartupsLogo, name: 'Tunisian Startups', link: 'https://startup.gov.tn/' },
  { category: 'Nos Alliés', image: bidLogo, name: 'BID', link: 'https://bidata-consulting.tn/' },

  { category: 'Institutions', image: umaLogo, name: 'UMA', link: 'https://uma.rnu.tn/fr' },
  { category: 'Institutions', image: conectLogo, name: 'CONECT', link: 'https://www.conect.org.tn/' },
  { category: 'Institutions', image: anetiLogo, name: 'ANETI', link: 'https://www.emploi.nat.tn/fo/Fr/global.php' },
  { category: 'Institutions', image: apiiLogo, name: 'APII', link: 'https://www.tunisieindustrie.nat.tn/FR/doc.asp?docid=753&mcat=22&mrub=178' },
  { category: 'Institutions', image: slrDarkLogo, name: 'SLR', link: 'https://www.slrconsulting.com/' },
  { category: 'Institutions', image: lapresseLogo, name: 'La Presse', link: 'https://lapresse.tn/' },
  { category: 'Institutions', image: tachghilLogo, name: "Ministère de l'Emploi", link: 'https://www.emploi.gov.tn/fr/' },
  { category: 'Institutions', image: insatPressLogo, name: 'INSAT Presse', link: '' },
];

const FALLBACK_CTA = {
  ctaImage,
  ctaTitle: 'Rejoignez les partenaires de GET E 3.0',
  ctaText: "À travers Get Entrepreneurial 3.0, vous bénéficiez d'une visibilité stratégique: renforcez votre image de marque et créez des connexions durables avec des startups, investisseurs, institutions et acteurs clés de l'innovation en Tunisie.",
  ctaLinks: [
    { label: 'Devenir Partenaire', href: '/exposant', isDownload: false },
    { label: 'Dossier de collaboration', href: '/Dossierpartenariat.pdf', isDownload: true },
  ],
};

const deriveCta = (siteContent) =>
  siteContent.collaborationPage && siteContent.collaborationPage.ctaTitle
    ? { ...FALLBACK_CTA, ...siteContent.collaborationPage }
    : FALLBACK_CTA;

// Groupe les sponsors par catégorie, en conservant l'ordre de première apparition
const groupByCategory = (sponsors) => {
  const groups = [];
  const index = {};
  sponsors.forEach((sponsor) => {
    const category = sponsor.category || 'Partenaires';
    if (!(category in index)) {
      index[category] = groups.length;
      groups.push({ category, items: [] });
    }
    groups[index[category]].items.push(sponsor);
  });
  return groups;
};

const PartnerGrid = ({ partners }) => (
  <div className="partners-grid">
    {partners.map((partner, index) => (
      <a
        key={index}
        href={partner.link || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="partner-card-link"
      >
        <div className="partner-card">
          <img src={partner.image || partner.logoUrl} alt={`Logo de ${partner.name}`} />
        </div>
      </a>
    ))}
  </div>
);

const Collaboration = () => {
  const cachedSponsors = getCached('/content/sponsors');
  const cachedSite = getCached('/content/site');
  const [sponsors, setSponsors] = useState(
    cachedSponsors ? (cachedSponsors.length > 0 ? cachedSponsors : FALLBACK_SPONSORS) : null
  );
  const [cta, setCta] = useState(cachedSite ? deriveCta(cachedSite) : null);

  useEffect(() => {
    let isMounted = true;

    if (!getCached('/content/sponsors')) {
      axiosClient.get('/content/sponsors')
        .then(({ data }) => {
          setCached('/content/sponsors', data.data);
          if (isMounted) setSponsors(data.data.length > 0 ? data.data : FALLBACK_SPONSORS);
        })
        .catch(() => { if (isMounted) setSponsors(FALLBACK_SPONSORS); });
    }

    if (!getCached('/content/site')) {
      axiosClient.get('/content/site')
        .then(({ data }) => {
          setCached('/content/site', data.data);
          if (isMounted) setCta(deriveCta(data.data));
        })
        .catch(() => { if (isMounted) setCta(FALLBACK_CTA); });
    }

    return () => { isMounted = false; };
  }, []);

  if (!sponsors || !cta) return <Spinner />;

  const groups = groupByCategory(sponsors);

  return (
    <div className="collaboration-page">

      <header className="collab-header">
        <h2>Nos <span className="highlight">Partenaires</span></h2>
        <p>Ensemble, nous créons un écosystème où l'innovation prospère</p>
      </header>

      {groups.map((group) => (
        <section className="collab-section partners-category" key={group.category}>
          <h3 className="category-title">{group.category}</h3>
          <PartnerGrid partners={group.items} />
        </section>
      ))}

      <section className="collab-section become-partner-cta">
        <div className="cta-card">
          <div className="cta-image">
            <img src={cta.ctaImage} alt="Partenaires discutant lors d'un événement" />
          </div>
          <div className="cta-content">
            <h3>{cta.ctaTitle}</h3>
            <p>{cta.ctaText}</p>
            <div className="cta-buttons">
              {cta.ctaLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`cta-btn ${index === 0 ? 'primary' : 'secondary'}`}
                  {...(link.isDownload ? { download: link.label } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Collaboration;
