import React, { useState, useEffect } from 'react';
import './edition12.css';

// --- Importations d'images ---
import heroBackground from "../../assets/images/edition12.png";
import galleryImage1 from '../../assets/images/003comp.png';
import galleryImage2 from '../../assets/images/015comp.png';
import galleryImage3 from '../../assets/images/296comp.png';
import galleryImage4 from '../../assets/images/167comp.png';
import galleryImage5 from '../../assets/images/073comp.png';

// --- Importez les images pour les témoignages ---
import testimonialImage1 from '../../assets/images/imen.png'; 
import testimonialImage2 from '../../assets/images/saws.png';
import testimonialImage4 from '../../assets/images/IMENcomp.png';

// Importations d'icônes
import { Handshake, Zap, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { ImQuotesLeft } from "react-icons/im";


// --- Données pour la page ---
const statsData = [
    { value: "+10", label: "Sponsors" },
    { value: "+90%", label: "Taux de Satisfaction" },
    { value: "+250", label: "Participants" }
];

const introData = [
    { icon: <Handshake size={40} />, title: "Valeurs", text: "Encourager l'esprit entrepreneurial et l'innovation." },
    { icon: <Zap size={40} />, title: "Thématique", text: "Transformer les idées en actions concrètes et durables." },
    { icon: <Info size={40} />, title: "Information", text: "Réunir des participants de divers horizons pour l'échange." }
];

// --- Données pour les témoignages ---
const testimonialsData = [
    {
        name: "Imen LOUATI",
        quote: "Un très beaux panel, qualité des échange, partage d'expérience et valeurs et beaucoup d'apprentissage. Un événement réussi à tous les niveaux. Merci ENSI Junior Entreprise",
        image: testimonialImage1
    },
    {
        name: "Sawssen HAJ AMOR",
        quote: "Bravo ENSI Junior Entreprise pour cet événement parfaitement organisé ! Votre énergie et votre professionnalisme ont vraiment fait la différence. Ce fut un plaisir de partager ce moment avec vous.",
        image: testimonialImage2
    },
    {
        name: "Imen BEN JEMIAA",
        quote: "Bravo à toute l'équipe pour votre engagement et pour avoir su rassembler des experts autour de discussions essentielles pour l'avenir.",
        image: testimonialImage4
    }
];


// Composant pour l'animation des chiffres
const AnimatedStat = ({ endValue }) => {
    const [count, setCount] = useState(0);
    const duration = 2000;

    const numericValue = parseInt(endValue.replace(/[^0-9]/g, ''), 10);
    const prefix = endValue.startsWith('+') ? '+' : '';
    const suffix = endValue.endsWith('%') ? '%' : '';

    useEffect(() => {
        const startTime = Date.now();
        const animateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentCount = Math.floor(progress * numericValue);
            setCount(currentCount);
            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };
        requestAnimationFrame(animateCount);
    }, [numericValue]);

    return (
        <span className="stat-value">{`${prefix}${count}${suffix}`}</span>
    );
};


const Edition12 = () => {
    // --- Carrousel Images ---
    const [currentCarousel, setCurrentCarousel] = useState(0);
    const carouselImages = [galleryImage1, galleryImage2, galleryImage3, galleryImage4, galleryImage5];
    const totalImages = carouselImages.length;
    
    const getSlideClass = (index) => {
        const diff = (index - currentCarousel + totalImages) % totalImages;
        if (diff === 0) return 'carousel-slide active';
        if (diff === 1) return 'carousel-slide next';
        if (diff === totalImages - 1) return 'carousel-slide prev';
        if (diff === 2) return 'carousel-slide far-next';
        if (diff === totalImages - 2) return 'carousel-slide far-prev';
        return 'carousel-slide';
    };

    const handleNext = () => {
        setCurrentCarousel(prev => (prev + 1) % totalImages);
    };

    const handlePrev = () => {
        setCurrentCarousel(prev => (prev - 1 + totalImages) % totalImages);
    };

    useEffect(() => {
        const interval = setInterval(handleNext, 4000);
        return () => clearInterval(interval);
    }, []);

    // --- Carrousel Témoignages ---
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const totalTestimonials = testimonialsData.length;

    const handleNextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % totalTestimonials);
    };

    const handlePrevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
    };

    return (
        <div className="legacy-page">

            {/* --- Section Hero --- */}
            <header className="legacy-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1><span className="highlight">Découvrez </span> <span className="highlight">GET E</span>NTREPRENEURIAL
</h1>
                    <div className="hero-tagline">
            <span className="line"></span>
            <p>Innovation et Entrepreneuriat pour un Avenir Durable</p>
            <span className="line"></span>  
          </div>
                </div>
            </header>

            {/* --- Section Intro --- */}
            <section className="legacy-section intro-section">
                <div className="section-header">
                    <h2>GET ENTREPRENEURIAL</h2>
                    <p>Plongez au Cœur de l'Événement</p>
                </div>
                <div className="intro-grid">
                    {introData.map((item, index) => (
                        <div key={index} className="intro-card">
                            <div className="intro-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Section Carrousel Images --- */}
            <section className="carousel-section">
                <div className="carousel-container">
                    <button className="carousel-btn left" onClick={handlePrev}><ArrowLeft /></button>
                    <div className="carousel-track">
                        {carouselImages.map((image, index) => (
                            <div key={index} className={getSlideClass(index)}>
                                <img src={image} alt={`Entrepreneurial event ${index + 1}`} loading="lazy"/>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-btn right" onClick={handleNext}><ArrowRight /></button>
                </div>
            </section>
            
            {/* --- Section Témoignages --- */}
            <section className="testimonials-section">
                <div className="testimonials-header">
                    <h2 className="testimonials-title">Témoignages</h2>
                    <div className="header-subtitle">
                        <span className="line"></span>
                        <p>Ce qu'ils pensent de nous</p>
                        <span className="line"></span>
                    </div>
                </div>

                <div className="testimonials-carousel">
                    <button className="testimonial-btn left" onClick={handlePrevTestimonial}>
                        <ArrowLeft />
                    </button>

                    <div className="testimonial-slide">
                        <div className="testimonial-item">
                            <ImQuotesLeft className="testimonial-quote-icon" />
                            <p className="testimonial-quote">« {testimonialsData[currentTestimonial].quote} »</p>
                            <div className="author-info">
                                <img 
                                    src={testimonialsData[currentTestimonial].image} 
                                    alt={testimonialsData[currentTestimonial].name} 
                                    className="testimonial-author-image" 
                                />
                                <p className="testimonial-author">{testimonialsData[currentTestimonial].name}</p>
                            </div>
                        </div>
                    </div>

                    <button className="testimonial-btn right" onClick={handleNextTestimonial}>
                        <ArrowRight />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Edition12;
