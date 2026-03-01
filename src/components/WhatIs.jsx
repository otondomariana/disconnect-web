// WhatIs.jsx
import React from 'react';
import meditation from '../assets/img/Meditation-bro.png';

const WhatIs = () => {
    return (
        <section id="what-is" className="bg-soft section-padding">
            <div className="container">
                <div className="grid-2">
                    <div className="visual">
                        <img
                            src={meditation}
                            alt="Meditation"
                            className="responsive-img"
                        />
                    </div>
                    <div className="content">
                        <h2>Qué es Disconnect</h2>
                        <p className="lead-text">
                            Disconnect es una app que te propone desafíos diarios de desconexión digital
                            y un espacio para escribir tus reflexiones personales.
                        </p>
                        <p className="highlight-text">
                            No bloquea, no controla, no te mide. Te acompaña a reconectar.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatIs;
