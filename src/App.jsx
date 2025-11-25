import React from 'react';
import { FaGooglePlay, FaApple, FaLeaf, FaPen, FaBan, FaUsers, FaArrowRight } from 'react-icons/fa';

// Importación de imágenes (Hero, Qué es, Cómo funciona)
import contemplating from './assets/img/Contemplating-bro.png';
import meditation from './assets/img/Meditation-bro.png';
import mobileUser from './assets/img/Mobile-user-bro.png';
import mindfulness from './assets/img/Mindfulness-bro.png';
import imagination from './assets/img/Imagination-bro.png';

// Importación de imágenes para el Blog
import blog1 from './assets/img/blog-1.png';
import blog2 from './assets/img/blog-2.png';
import blog3 from './assets/img/blog-3.png';

function App() {
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      
      {/* 1. Encabezado principal */}
      <header id="hero" style={{ padding: '120px 0 80px' }}>
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
                style={{ width: '100%', height: 'auto', maxWidth: '500px' }} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* 2. QUÉ ES DISCONNECT */}
      <section id="what-is" style={{ backgroundColor: '#f4f6f8' }}>
        <div className="container">
          <div className="grid-2">
             <div className="visual">
              <img 
                src={meditation} 
                alt="Meditation" 
                style={{ width: '100%', height: 'auto', maxWidth: '500px' }} 
              />
             </div>
             <div className="content">
               <h2>Qué es Disconnect</h2>
               <p>
                 Disconnect es una app que te propone desafíos diarios de desconexión digital 
                 y un espacio para escribir tus reflexiones personales.
               </p>
               <p style={{ fontWeight: 500 }}>
                 No bloquea, no controla, no te mide. Te acompaña a reconectar.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. POR QUÉ USARLA */}
      <section id="why">
        <div className="container">
          <h2>Porque desconectarse también es conectar</h2>
          <div className="grid-4">
            
            <div className="card">
              <FaLeaf className="card-icon" />
              <h3>Bienestar</h3>
              <p>Desafíos diarios para cuidar tu salud digital.</p>
            </div>

            <div className="card">
              <FaPen className="card-icon" />
              <h3>Reflexión</h3>
              <p>Registro personal de tus momentos offline.</p>
            </div>

            <div className="card">
              <FaBan className="card-icon" />
              <h3>Sin Ruido</h3>
              <p>Sin likes, sin scroll infinito, sin presión social.</p>
            </div>

            <div className="card">
              <FaUsers className="card-icon" />
              <h3>Comunidad</h3>
              <p>Un espacio introspectivo y respetuoso.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CÓMO FUNCIONA */}
      <section id="how" style={{ backgroundColor: '#f4f6f8' }}>
        <div className="container">
          <h2>Cómo funciona</h2>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            Cada desafío es una invitación a pausar, no una obligación. Vos decidís cuándo y cómo desconectarte.
          </p>
          
          <div className="grid-3">
            
            {/* Paso 1: Elegí tu desafío */}
            <div className="step-item">
              <div className="step-number">1</div>
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src={mobileUser} 
                  alt="Elegí tu desafío" 
                  style={{ width: '100%', maxWidth: '250px', borderRadius: '12px', height: 'auto' }} 
                />
              </div>
              <h3>Elegí tu desafío</h3>
            </div>

            {/* Paso 2: Viví tu momento offline */}
            <div className="step-item">
              <div className="step-number">2</div>
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src={mindfulness} 
                  alt="Viví tu momento" 
                  style={{ width: '100%', maxWidth: '250px', borderRadius: '12px', height: 'auto' }} 
                />
              </div>
              <h3>Viví tu momento</h3>
            </div>

            {/* Paso 3: Reflexioná */}
            <div className="step-item">
              <div className="step-number">3</div>
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src={imagination} 
                  alt="Reflexioná" 
                  style={{ width: '100%', maxWidth: '250px', borderRadius: '12px', height: 'auto' }} 
                />
              </div>
              <h3>Reflexioná</h3>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TESTIMONIOS (Opcional) */}
      <section id="testimonials">
        <div className="container">
          
          {/* NUEVO: Título agregado */}
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

      {/* 6. BLOG EDUCATIVO */}
      <section id="blog" style={{ backgroundColor: '#f4f6f8' }}>
        <div className="container">
          <h2>Aprendé sobre bienestar digital</h2>
          <div className="grid-3" style={{ marginTop: '40px' }}>
            
            {/* Artículo 1 */}
            <article className="card" style={{ cursor: 'pointer' }}>
              <img 
                src={blog1} 
                alt="Desconexión consciente" 
                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '15px' }} 
              />
              <h3>Desconexión consciente</h3>
              <p>¿Qué significa realmente desconectar en la era digital?</p>
              <span style={{ color: '#039ea2', fontWeight: 'bold', fontSize: '0.9rem' }}>Leer más <FaArrowRight style={{ fontSize: '0.7rem' }}/></span>
            </article>

            {/* Artículo 2 */}
            <article className="card" style={{ cursor: 'pointer' }}>
              <img 
                src={blog2} 
                alt="Mejorá tu descanso" 
                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '15px' }} 
              />
              <h3>Mejorá tu descanso</h3>
              <p>Cómo las pantallas afectan tu sueño y qué hacer al respecto.</p>
              <span style={{ color: '#039ea2', fontWeight: 'bold', fontSize: '0.9rem' }}>Leer más <FaArrowRight style={{ fontSize: '0.7rem' }}/></span>
            </article>

            {/* Artículo 3 */}
            <article className="card" style={{ cursor: 'pointer' }}>
              <img 
                src={blog3} 
                alt="El poder de escribir" 
                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '15px' }} 
              />
              <h3>El poder de escribir</h3>
              <p>Por qué procesar tu día en texto ayuda a tu salud mental.</p>
              <span style={{ color: '#039ea2', fontWeight: 'bold', fontSize: '0.9rem' }}>Leer más <FaArrowRight style={{ fontSize: '0.7rem' }}/></span>
            </article>

          </div>
        </div>
      </section>

      {/* 7. DESCARGA LA APP */}
      <section id="download" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Llevá Disconnect con vos</h2>
          <p>Disponible gratis. Sin anuncios, sin distracciones.</p>
          
          <div className="store-buttons">
            <a href="#" className="btn-store">
              <FaGooglePlay size={24} />
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem' }}>DISPONIBLE EN</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Google Play</span>
              </div>
            </a>
            <a href="#" className="btn-store">
              <FaApple size={28} />
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem' }}>PRÓXIMAMENTE</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>App Store</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer>
        <div className="container">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Disconnect</h3>
          <p style={{ fontSize: '0.9rem' }}>Una pausa en lo digital, un espacio para vos.</p>
          
          <div className="footer-links">
            <a href="#">Contacto</a>
            <a href="#">Política de Privacidad</a>
          </div>
          
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            &copy; Mariana Otondo - 2025 Escuela Da Vinci - Seminario Final - Carrera Analista de Sistemas.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;