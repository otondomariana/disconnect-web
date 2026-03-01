import React from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

const Download = () => {
    return (
        <section id="download" className="download-section section-padding">
            <div className="container">
                <h2>Llevá Disconnect con vos</h2>
                <p>Disponible gratis. Sin anuncios, sin distracciones.</p>

                <div className="store-buttons">
                    <a href="#" className="btn-store">
                        <FaGooglePlay size={24} />
                        <div>
                            <span className="store-label">DISPONIBLE EN</span>
                            <span className="store-name">Google Play</span>
                        </div>
                    </a>
                    <a href="#" className="btn-store disabled">
                        <FaApple size={28} />
                        <div>
                            <span className="store-label">PRÓXIMAMENTE</span>
                            <span className="store-name">App Store</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Download;
