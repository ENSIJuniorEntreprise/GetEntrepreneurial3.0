import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import './section1.css';
import family from '../../assets/images/familycompressé.jpg';
import edition from '../../assets/images/3éme.png';

// Importez toutes les icônes nécessaires
// --- MODIFICATION ICI : Ajout de l'icône YouTube ---
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';

// Importations pour les animations
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const FALLBACK_EVENT_DATE = '2025-10-22';
const FALLBACK_HERO_VIDEO = '/getecomp.mp4';
const MONTH_LABELS = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOÛT', 'SEP', 'OCT', 'NOV', 'DÉC'];

const deriveEventDate = (settings) => {
  const bigDay = (settings.days || []).find((d) => d.key === 'bigDay');
  return bigDay?.date || FALLBACK_EVENT_DATE;
};
const deriveHeroVideo = (settings) => settings.heroVideoUrl || FALLBACK_HERO_VIDEO;

const Section1 = () => {
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  const cachedSettings = getCached('/content/settings');

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [eventDate, setEventDate] = useState(cachedSettings ? deriveEventDate(cachedSettings) : null);
  const [heroVideoUrl, setHeroVideoUrl] = useState(cachedSettings ? deriveHeroVideo(cachedSettings) : null);
  const [heroReady, setHeroReady] = useState(!!cachedSettings);

  useEffect(() => {
    if (getCached('/content/settings')) return; // déjà en cache, rien à refaire
    let isMounted = true;
    axiosClient.get('/content/settings')
      .then(({ data }) => {
        if (!isMounted) return;
        setCached('/content/settings', data.data);
        setEventDate(deriveEventDate(data.data));
        setHeroVideoUrl(deriveHeroVideo(data.data));
      })
      .catch(() => {
        if (!isMounted) return;
        setEventDate(FALLBACK_EVENT_DATE);
        setHeroVideoUrl(FALLBACK_HERO_VIDEO);
      })
      .finally(() => {
        if (isMounted) setHeroReady(true);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!eventDate) return;
    const calculateTimeLeft = () => {
      const difference = +new Date(eventDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  const eventDateObj = eventDate ? new Date(eventDate) : null;

  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  return (
    <div className="hero-container">
      <section className="hero-fullscreen">
        {heroReady && (
          <video autoPlay loop muted className="background-video">
            <source src={heroVideoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        )}
        <div className="video-overlay"></div>

        <div className="hero-content">
          <div className="date-location">
            {heroReady && (
              <>
                <span className="day1">{eventDateObj.getDate()}</span>
                <div className="month-year">
                  <span className="month">{MONTH_LABELS[eventDateObj.getMonth()]}</span>
                  <span className="year">{eventDateObj.getFullYear()}</span>
                </div>
              </>
            )}
            <span className="location">UTICA</span>
          </div>
          <h1>
            <span className="title-get">GET E</span>
            <span className="title-entrepreneurial">NTREPRENEURIAL</span>
          </h1>
          <div className='image'><img src={edition} alt="3ème édition" /></div>
          <div className="tagline">
            <p>FAIRE DE LA TUNISIE UN HUB <br /> ÉCONOMIQUE POUR</p>
            <p className="highlight-wrapper">
              <span className="highlight">UN AVENIR DURABLE</span>
            </p>
          </div>
        </div>

        <div className={`social-panel ${isSocialsOpen ? 'open' : ''}`}>
          <div className="social-toggle" onClick={() => setIsSocialsOpen(!isSocialsOpen)}>
            <FaArrowRight className="toggle-arrow" />
          </div>
          <div className="social-links-container">
            {/* --- MODIFICATION ICI : Ajout du lien YouTube --- */}
            <a href="https://www.instagram.com/ensijunior/" target="_blank" rel="noopener noreferrer" className="social-link instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.facebook.com/ENSI.Junior.Entreprise" target="_blank" rel="noopener noreferrer" className="social-link facebook" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/company/ensi-junior-entreprise/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-link linkedin" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@ENSIJuniorEntreprise" target="_blank" rel="noopener noreferrer" className="social-link youtube" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </section>

      <section className="scroll-content">
        {/* ... (le reste du code JSX est inchangé) ... */}
        <div className="countdown-container">
          {(() => {
            const radius = 50;
            const circumference = 2 * Math.PI * radius;
            
            const days = timeLeft.days;
            const hoursProgress = (timeLeft.hours / 24) * circumference;
            const minutesProgress = (timeLeft.minutes / 60) * circumference;
            const secondsProgress = (timeLeft.seconds / 60) * circumference;

            return (
              <>
                <div className="countdown-item">
                  <div className="countdown-circle-container">
                    <div className="countdown-value-static">{days}</div>
                  </div>
                  <div className="countdown-label">Jours</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-circle-container">
                    <svg className="progress-ring">
                      <circle className="progress-ring__track" r={radius} cx="60" cy="60" />
                      <circle className="progress-ring__indicator" r={radius} cx="60" cy="60" 
                              style={{ strokeDasharray: circumference, strokeDashoffset: hoursProgress }} />
                    </svg>
                    <div className="countdown-value">{timeLeft.hours}</div>
                  </div>
                  <div className="countdown-label">Heures</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-circle-container">
                    <svg className="progress-ring">
                      <circle className="progress-ring__track" r={radius} cx="60" cy="60" />
                      <circle className="progress-ring__indicator" r={radius} cx="60" cy="60"
                              style={{ strokeDasharray: circumference, strokeDashoffset: minutesProgress }} />
                    </svg>
                    <div className="countdown-value">{timeLeft.minutes}</div>
                  </div>
                  <div className="countdown-label">Minutes</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-circle-container">
                    <svg className="progress-ring">
                      <circle className="progress-ring__track" r={radius} cx="60" cy="60" />
                      <circle className="progress-ring__indicator" r={radius} cx="60" cy="60" 
                              style={{ strokeDasharray: circumference, strokeDashoffset: secondsProgress }} />
                    </svg>
                    <div className="countdown-value">{timeLeft.seconds}</div>
                  </div>
                  <div className="countdown-label">Secondes</div>
                </div>
              </>
            );
          })()}
        </div>

        <div className="about-section" ref={aboutRef}>
          <div className="about-content">
            <div className={`about-text ${aboutInView ? 'visible' : ''}`}>
              <h2>GET ENTREPRENEURIAL</h2>
              <h3>Plus qu'un évènement.</h3>
              <p>
                Get Entrepreneurial se profile à l’horizon comme un projet stratégique à large échelle, sous l’égide de l’ENSI Junior Entreprise, GET E conçu pour catalyser l'innovation et renforcer les synergies entre les acteurs clés public privé et académique  de l'écosystème économique tunisien
              </p>
            </div>
            <div className={`about-image ${aboutInView ? 'visible' : ''}`}>
              <img src={family} alt="Get Entrepreneurial Event" />
            </div>
          </div>
          <div className="stats" ref={statsRef}>
            <div className="stat-item">
              <span className="stat-number">+{statsInView ? <CountUp end={700} duration={2.5} /> : '0'}</span>
              <span className="stat-label">Visiteurs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">+{statsInView ? <CountUp end={15} duration={2.5} /> : '0'}</span>
              <span className="stat-label">Startups Incubées</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">+{statsInView ? <CountUp end={12} duration={2.5} /> : '0'}</span>
              <span className="stat-label">Exposants et Partenaires</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">+{statsInView ? <CountUp end={20} duration={2.5} /> : '0'}</span>
              <span className="stat-label">Experts</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Section1;