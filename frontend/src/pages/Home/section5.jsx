import React, { useState } from 'react';
import './section5.css';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaTimes } from 'react-icons/fa';

// Assurez-vous que les chemins vers vos images sont corrects
import speakerImg1 from '../../assets/images/espace.JPG';
import speakerImg2 from '../../assets/images/espace.JPG';
import speakerImg3 from '../../assets/images/espace.JPG';
import speakerImg4 from '../../assets/images/espace.JPG';
import speakerImg5 from '../../assets/images/espace.JPG';
import speakerImg6 from '../../assets/images/espace.JPG';
import speakerImg7 from '../../assets/images/espace.JPG';
import speakerImg8 from '../../assets/images/espace.JPG';

const speakersData = [
  { name: 'Amine MEZGHICH', title: 'CEO Smart IT', image: speakerImg1, linkedin: '#' },
  { name: 'Jane Doe', title: 'Lead Designer, TechCorp', image: speakerImg2, linkedin: '#' },
  { name: 'John Smith', title: 'AI Specialist, Innovate Inc.', image: speakerImg3, linkedin: '#' },
  { name: 'Emily White', title: 'Marketing Guru, Growth Co.', image: speakerImg4, linkedin: '#' },
  { name: 'Michael Brown', title: 'Founder, Future Ventures', image: speakerImg5, linkedin: '#' },
  { name: 'Sarah Green', title: 'CTO, Dev Solutions', image: speakerImg6, linkedin: '#' },
  { name: 'David Black', title: 'CEO, Creative Minds', image: speakerImg7, linkedin: '#' },
  { name: 'Extra Speaker', title: 'Expert in Everything', image: speakerImg8, linkedin: '#' },
];

const Section5 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className={`speakers-section ${inView ? 'visible' : ''}`} ref={ref}>
      <div className="speakers-header">
        <h2>À la rencontre de <span className="text-orange">Nos Conférenciers</span></h2>
      </div>

      <div className="gallery-container">
        <div className="gallery">
          {speakersData.map((speaker, index) => (
            <span key={index} style={{ '--i': index + 1 }}>
              <img src={speaker.image} alt={speaker.name} />
              <div className="gallery-speaker-info">
                <h3>{speaker.name}</h3>
                <p>{speaker.title}</p>
                <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <FaLinkedin />
                </a>
              </div>
            </span>
          ))}
        </div>
      </div>

      <div className="see-all-container">
        <button className="see-all-button" onClick={() => setIsModalOpen(true)}>
          See all Speakers
        </button>
      </div>

      <div className={`speakers-modal ${isModalOpen ? 'open' : ''}`}>
        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}><FaTimes /></button>
        <div className="modal-content">
          <h2>Nos Conférenciers</h2>
          <div className="speakers-grid">
            {speakersData.map((speaker, index) => (
              <div className="grid-speaker-card" key={index}>
                <img src={speaker.image} alt={speaker.name} />
                <div className="grid-speaker-info">
                  <h3>{speaker.name}</h3>
                  <p>{speaker.title}</p>
                   <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;