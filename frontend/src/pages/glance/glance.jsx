import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './glance.css'
import shakingHands from "../../assets/images/shakinghand.png"
import arrowLeft from "../../assets/images/arrow-left.png"
import arrowRight from "../../assets/images/arrow-right.png"
import carousel1 from "../../assets/images/carousel1.png"
import carousel2 from "../../assets/images/carousel2.png"
import carousel3 from "../../assets/images/carousel3.png"
import carousel4 from "../../assets/images/getenter.png"
import partenaires from "../../assets/images/partenaires.png"
import buildings from "../../assets/images/buildings.png"
import managers from "../../assets/images/managers.png"
import whiteRArrow from "../../assets/images/white-right-arrow.png"
import whiteLArrow from "../../assets/images/white-left-arrow.png"
import { useState,useEffect } from 'react';
import {ArrowRight,ArrowLeft} from "lucide-react"

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
        summary: "développant des solutions décentralisées pour favoriser la transparence, la sécurité et l'innovation dans les échanges numériques."
    },
    {
        image: carousel1,
        title: "Intelligence Artificiell",
        name: 'Open Ai',
        summary: "Entreprise spécialisée dans les modèles d'IA avancés pour l'innovation et l'automatisation."
    },
    {
        image: carousel1,
        title: "Blockchain",
        name: "Consensys",
        summary: "développant des solutions décentralisées pour favoriser la transparence, la sécurité et l'innovation dans les échanges numériques."
    },
    {
        image: carousel1,
        title: "Intelligence Artificiell",
        name: 'Open Ai',
        summary: "Entreprise spécialisée dans les modèles d'IA avancés pour l'innovation et l'automatisation."
    },
    {
        image: carousel1,
        title: "Blockchain",
        name: "Consensys",
        summary: "développant des solutions décentralisées pour favoriser la transparence, la sécurité et l'innovation dans les échanges numériques."
    },
    {
        image: carousel1,
        title: "Intelligence Artificiell",
        name: 'Open Ai',
        summary: "Entreprise spécialisée dans les modèles d'IA avancés pour l'innovation et l'automatisation."
    },
    {
        image: carousel1,
        title: "Blockchain",
        name: "Consensys",
        summary: "développant des solutions décentralisées pour favoriser la transparence, la sécurité et l'innovation dans les échanges numériques."
    },
    {
        image: carousel1,
        title: "Intelligence Artificiell",
        name: 'Open Ai',
        summary: "Entreprise spécialisée dans les modèles d'IA avancés pour l'innovation et l'automatisation."
    },
]

const Glance = () => {
    const [currentCarousel, setCurrentCarousel] = useState(0);
    const carouselImages = [carousel4,carousel4,carousel4,carousel4,carousel4,carousel4,carousel4,carousel4,carousel4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);

    const totalImages = carouselImages.length;

    const getSlideClass = (index) => {
        const diff = (index - currentCarousel + totalImages) % totalImages;
        
        if (diff === 0) return 'carousel-slide active';
        if (diff === 1 || diff === totalImages - 1) {
            return diff === 1 ? 'carousel-slide next' : 'carousel-slide prev';
        }
        if (diff === 2 || diff === totalImages - 2) {
            return diff === 2 ? 'carousel-slide far-next' : 'carousel-slide far-prev';
        }
        return 'carousel-slide';
    };

    const handleNext = () => {
        setCurrentCarousel(prev => (prev + 1) % totalImages);
    };

    const handlePrev = () => {
        setCurrentCarousel(prev => (prev - 1 + totalImages) % totalImages);
    };

    // Auto-advance carousel every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <section className='titre'>
                <p><span>A glance</span> at Get <br /> Entrepreneurial</p>
            </section>
            <section className='summary'>

                <h1>Get Entrepreneurial </h1>
                <div className="subtitle">
                    <span className="line"></span>
                    <p>Plongez au Cœur de l'Événement</p>
                    <span className="line"></span>
                </div>
                <p className='paragraph'>L'événement Get Entrepreneurial est une initiative inspirante visant à encourager l'esprit entrepreneurial. Il réunit des participants de divers horizons autour d'activités, d'échanges et d'expériences favorisant la créativité, l'innovation et la prise d'initiative. Cet événement met en lumière l'importance de penser différemment, d'oser entreprendre et de saisir les opportunités pour transformer les idées en actions concrètes.</p>
                <div className='box'>
                    <div className='box-content'>
                        <p>+10</p>
                        <span className='line'></span>
                        <p>Sponsors</p>
                    </div>
                    <div className='box-content'>
                        <p>+90%</p>
                        <span className='line'></span>
                        <p>Taux de Satisfaction</p>
                    </div>
                    <div className='box-content'>
                        <p>+250</p>
                        <span className='line'></span>
                        <p>Participants</p>
                    </div>
                </div>

            </section>
            <section className="carousel-section">
                <div className="carousel-container">
                    <button 
                        className="carousel-btn left" 
                        onClick={handlePrev}
                        data-testid="button-carousel-prev"
                    >
                        <ArrowLeft />
                    </button>
                    <div className="carousel-track">
                        {carouselImages.map((image, index) => (
                            <div 
                                key={index} 
                                className={getSlideClass(index)}
                                data-testid={`carousel-slide-${index}`}
                            >
                                <img 
                                    src={image} 
                                    alt={`Entrepreneurial event ${index + 1}`} 
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                    <button 
                        className="carousel-btn right" 
                        onClick={handleNext}
                        data-testid="button-carousel-next"
                    >
                        <ArrowRight />
                    </button>
                </div>
            </section>
            <section className='timeline'>
                <div className='timeline-container'>
                    <div className='timeline-line'></div>
                    <div className='timeline-item first'>
                        <div className='timeline-circle'></div>
                        <div className='timeline-content'>
                            <p>1ère édition : <span className='theme-date'>thematique date</span></p>
                        </div>
                    </div>
                    <div className='timeline-item second'>
                        <div className='timeline-circle'></div>
                        <div className='timeline-content'>
                            <p>2ème édition : <span className='theme-date'>thematique date</span></p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Glance