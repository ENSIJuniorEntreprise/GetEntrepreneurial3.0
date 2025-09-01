import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Collaboration.css'
import collaborationTitle from "../../assets/images/collaboration-title.png"
import shakingHands from "../../assets/images/shakinghand.png"
import arrowLeft from "../../assets/images/arrow-left.png"
import arrowRight from "../../assets/images/arrow-right.png"
import carousel1 from "../../assets/images/carousel1.png"
import carousel2 from "../../assets/images/carousel2.png"
import carousel3 from "../../assets/images/carousel3.png"
import partenaires from "../../assets/images/partenaires.png"
import buildings from "../../assets/images/buildings.png"
import managers from "../../assets/images/managers.png"
import whiteRArrow from "../../assets/images/white-right-arrow.png"
import whiteLArrow from "../../assets/images/white-left-arrow.png"
import { useState } from 'react';


const PartenaireData = [
  { image: carousel1, grade: "gold" },
  { image: carousel2, grade: "platinium" },
  { image: carousel3, grade: "platinium" },
  { image: carousel1, grade: "gold" },
  { image: carousel2, grade: "platinium" },
  { image: carousel3, grade: "platinium" }
]
const SponsorData = [
  { image: managers },
  { image: buildings },
  { image: managers },
  { image: buildings },
  { image: managers },
  { image: buildings },
  { image: managers },
]
const ExposantData = [
  {
    image: carousel1,
    title: "Blockchain",
    name: "Consensys",
    summary: "développant des solutions décentralisées pour favoriser la transparence, la sécurité et l’innovation dans les échanges numériques."
  },
  {
    image: carousel1,
    title: "Intelligence Artificiell",
    name: 'Open Ai',
    summary: "Entreprise spécialisée dans les modèles d’IA avancés pour l’innovation et l’automatisation."
  },
  {
    image: carousel1,
    title: "Blockchain",
    name: "Consensys",
    summary: "développant des solutions décentralisées pour favoriser la transparence, la sécurité et l’innovation dans les échanges numériques."
  },
  {
    image: carousel1,
    title: "Intelligence Artificiell",
    name: 'Open Ai',
    summary: "Entreprise spécialisée dans les modèles d’IA avancés pour l’innovation et l’automatisation."
  },
  {
    image: carousel1,
    title: "Blockchain",
    name: "Consensys",
    summary: "développant des solutions décentralisées pour favoriser la transparence, la sécurité et l’innovation dans les échanges numériques."
  },
  {
    image: carousel1,
    title: "Intelligence Artificiell",
    name: 'Open Ai',
    summary: "Entreprise spécialisée dans les modèles d’IA avancés pour l’innovation et l’automatisation."
  },
  {
    image: carousel1,
    title: "Blockchain",
    name: "Consensys",
    summary: "développant des solutions décentralisées pour favoriser la transparence, la sécurité et l’innovation dans les échanges numériques."
  },
  {
    image: carousel1,
    title: "Intelligence Artificiell",
    name: 'Open Ai',
    summary: "Entreprise spécialisée dans les modèles d’IA avancés pour l’innovation et l’automatisation."
  },
]

const Collaboration = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  const cardsToShow = 3;
  const maxIndex = SponsorData.length > cardsToShow ? SponsorData.length - cardsToShow : 0;
  const maxIndex2 = PartenaireData.length > cardsToShow ? PartenaireData.length - cardsToShow : 0;
  const handleNext = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  const handleNext2 = () => setCurrentIndex2(prev => (prev >= maxIndex2 ? 0 : prev + 1));
  const handlePrev2 = () => setCurrentIndex2(prev => (prev <= 0 ? maxIndex2 : prev - 1));
  return (
    <>
      <section className='titre'>
        <img src={collaborationTitle} />
        <p>Construire l’avenir ensemble grâce à des partenariats stratégiques, des sponsors innovants et </p><p>des expositions dynamiques qui stimulent le progrès technologique et la croissance des affaires.</p>
      </section>
      <section className='sponsors'>
        <img src={shakingHands} />
        <p>
          <span className='black'>Nos </span> <span className='orange'> Sponsors</span>
        </p>
        <p>Nous sommes fiers de collaborer avec des leaders du secteur qui partagent notre vision de l’innovation et de
          <br />l’excellence technologique. Leur soutien rend GET E possible et contribue à façonner l’avenir de la technologie.</p>
        <div className='arrows'>
          <img src={arrowLeft} className='arrow' onClick={handlePrev} />
          <img src={arrowRight} className='arrow' onClick={handleNext}/>
        </div>
        <div className='cards'>
          {SponsorData.slice(currentIndex,currentIndex+3).map((card, index) => (
            <>
              <div className='card'>
                <img className='image' src={card.image} />
                <p className='sponsor-grade'>{card.grade} sponsor{index}</p>

              </div>
            </>
          ))}
        </div>
      </section>
      <section className='partenaires'>
        <img src={partenaires} />
        <p>
          <span className='orange'>Partenaires </span> <span className='black'> Strategiques</span>
        </p>
        <p>
          Nos partenariats représentent une synergie d’expertises, de ressources et d’une vision commune. Ensemble, <br />nous créons un écosystème où l’innovation prospère et où se nouent des connexions porteuses de sens.
        </p>
        <div className='main'>
          <img src={whiteLArrow} className='arrow' onClick={handlePrev2}/>
          <div className='cards'>
            {PartenaireData.slice(currentIndex2,currentIndex2 + cardsToShow).map(card => (
              <>
                <div className='card'>
                  <img className='image' src={card.image} />
                  <p>managers</p>
                  <button>Media partner</button>

                </div>
              </>
            ))}
          </div>
          <img src={whiteRArrow} className='arrow' onClick={handleNext2}/>
        </div>

      </section>
      <section className='exposants'>

        <img src={shakingHands} />
        <p>
          <span className='black'>Nos </span> <span className='orange'> Exposants</span>
        </p>
        <p>
          Découvrez des technologies révolutionnaires et des solutions innovantes présentées par des entreprises et des <br />start-up de premier plan. Nos exposants incarnent l’avant-garde du progrès technologique dans divers secteurs.
        </p>
        <div className='cards'>

          {ExposantData.map(exposant => (
            <>
              <div className='card-exposant'>
                <img src={exposant.image} />
                <span className='title'>{exposant.title}</span>
                <span className='name'>{exposant.name}</span>
                <p>{exposant.summary}</p>
              </div>

            </>
          ))}


        </div>
      </section>

    </>
  );
};

export default Collaboration;