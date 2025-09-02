import React, { useState, useEffect } from 'react';
import './section1.css';
import family from '../../assets/images/family.JPG';
import edition from '../../assets/images/3éme.png';

// Importez toutes les icônes nécessaires
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';

// Importations pour les animations
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Section1 = () => {
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date('2025-10-22') - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

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
        <video autoPlay loop muted className="background-video">
          <source src="/gete.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="video-overlay"></div>

        <div className="hero-content">
          <div className="date-location">
            <span className="day">22</span>
            <div className="month-year">
              <span className="month">OCT</span>
              <span className="year">2025</span>
            </div>
            <span className="location">UTICA</span>
          </div>
          <h1>
            <span className="title-get">GET</span>
            <span className="title-entrepreneurial"> ENTREPRENEURIAL</span>
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
            <a href="https://www.instagram.com/ensijunior/" className="social-link instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.facebook.com/ENSI.Junior.Entreprise" className="social-link facebook" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/company/ensi-junior-entreprise/posts/?feedView=all" className="social-link linkedin" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </section>

      <section className="scroll-content">
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
                  <div className="countdown-label">Days</div>
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
                  <div className="countdown-label">Hours</div>
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
                  <div className="countdown-label">Seconds</div>
                </div>
              </>
            );
          })()}
        </div>

        <div className="about-section" ref={aboutRef}>
          <div className="about-content">
            <div className={`about-text ${aboutInView ? 'visible' : ''}`}>
              <h2>Get Entrepreneurial</h2>
              <h3>Plus qu'un évènement.</h3>
              <p>
                Pour sa 3ᵉ édition, Get Entrepreneurial affirme son rôle de
                catalyseur stratégique au cœur de l’économie tunisienne. Il
                connecte startups, investisseurs, institutions et grandes
                entreprises autour d’une vision commune :
                -stimuler l’innovation, créer des ponts durables entre les
                acteurs clés, et faire rayonner la Tunisie à l’international.
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