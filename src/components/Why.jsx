import React from 'react';
import { FaLeaf, FaPen, FaBan, FaUsers } from 'react-icons/fa';

const Why = () => {
    return (
        <section id="why" className="section-padding">
            <div className="container">
                <h2>Porque desconectarse también es conectar</h2>
                <div className="grid-4">

                    <div className="card feature-card">
                        <FaLeaf className="card-icon" />
                        <h3>Bienestar</h3>
                        <p>Desafíos diarios para cuidar tu salud digital.</p>
                    </div>

                    <div className="card feature-card">
                        <FaPen className="card-icon" />
                        <h3>Reflexión</h3>
                        <p>Registro personal de tus momentos offline.</p>
                    </div>

                    <div className="card feature-card">
                        <FaBan className="card-icon" />
                        <h3>Sin Ruido</h3>
                        <p>Sin likes, sin scroll infinito, sin presión social.</p>
                    </div>

                    <div className="card feature-card">
                        <FaUsers className="card-icon" />
                        <h3>Comunidad</h3>
                        <p>Un espacio introspectivo y respetuoso.</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Why;
