import React from 'react';

const Testimonials = () => {
    return (
        <section id="testimonials" className="section-padding">
            <div className="container">

                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Testimonios de la comunidad</h2>

                <div className="grid-2">
                    <div className="testimonial-card">
                        <p>"Después de escribir mi primera reflexión me di cuenta de cuánto necesitaba ese silencio."</p>
                    </div>
                    <div className="testimonial-card">
                        <p>"Disconnect me ayudó a frenar sin sentir culpa. Es mi espacio seguro."</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
