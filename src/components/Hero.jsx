// Hero.jsx
import React from 'react';
import contemplating from '../assets/img/Contemplating-bro.png';

const Hero = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header id="hero" className="hero-section">
            <div className="container">
                <div className="grid-2">
                    <div className="hero-text">
                        <h5>Una pausa con sentido</h5>
                        <h1>
                            Tomate un momento para desconectarte del ruido digital y reconectar con vos mismo.
                        </h1>
                        <p>Disponible para Android</p>
                        <button onClick={() => scrollToSection('download')} className="btn-primary">
                            Descubrí la app
                        </button>
                    </div>
                    <div className="hero-visual">
                        <img
                            src={contemplating}
                            alt="Contemplating-bro"
                            className="hero-img"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
