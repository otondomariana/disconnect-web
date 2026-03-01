import React from 'react';
import mobileUser from '../assets/img/Mobile-user-bro.png';
import mindfulness from '../assets/img/Mindfulness-bro.png';
import imagination from '../assets/img/Imagination-bro.png';

const HowItWorks = () => {
    return (
        <section id="how" className="bg-soft section-padding">
            <div className="container">
                <h2>Cómo funciona</h2>
                <p className="subtitle">
                    Cada desafío es una invitación a pausar, no una obligación. Vos decidís cuándo y cómo desconectarte.
                </p>

                <div className="grid-3 how-grid">

                    <div className="step-item">
                        <div className="step-number">1</div>
                        <div className="step-img-wrapper">
                            <img
                                src={mobileUser}
                                alt="Elegí tu desafío"
                                className="step-img"
                            />
                        </div>
                        <h3>Elegí tu desafío</h3>
                    </div>

                    <div className="step-item">
                        <div className="step-number">2</div>
                        <div className="step-img-wrapper">
                            <img
                                src={mindfulness}
                                alt="Viví tu momento"
                                className="step-img"
                            />
                        </div>
                        <h3>Viví tu momento</h3>
                    </div>

                    <div className="step-item">
                        <div className="step-number">3</div>
                        <div className="step-img-wrapper">
                            <img
                                src={imagination}
                                alt="Reflexioná"
                                className="step-img"
                            />
                        </div>
                        <h3>Reflexioná</h3>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
