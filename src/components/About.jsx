import { useState } from 'react';

const About = () => {
  const [shushCount, setShushCount] = useState(0);

  const handleLoudNoise = () => {
    setShushCount(prev => prev + 1);
  };

  return (
    <div className="about-view glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#3498db' }}>
        About The Archives 📚
      </h1>
      
      <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '40px', lineHeight: '1.6' }}>
        This application was built with React, Vite, and a dangerously low amount of sleep. 
        It interfaces with the Open Library API because physical books are heavy and buying them is expensive.
      </p>

      {/* Developer Profile Card */}
      <div className="developer-profile" style={{ 
        background: 'rgba(0,0,0,0.2)', 
        padding: '25px', 
        borderRadius: '15px', 
        marginBottom: '40px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ marginTop: 0 }}>Meet the Developer</h2>
        <p style={{ fontSize: '1.1rem' }}><strong>Rostislav</strong> — <em>Chief Debugging Officer</em></p>
      </div>

      <div className="interactive-joke" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>Library Rules</h3>
        <button 
          onClick={handleLoudNoise}
          style={{
            background: shushCount > 4 ? '#e74c3c' : 'rgba(52, 152, 219, 0.7)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '12px 24px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
          }}
        >
          Make a Loud Noise 📢
        </button>
        
        <div style={{ minHeight: '50px', marginTop: '15px' }}>
          {shushCount > 0 && shushCount < 5 && (
            <p style={{ fontStyle: 'italic', color: '#f1c40f', fontSize: '1.1rem' }}>
              "Shhh! This is a library!" <br/>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(You have been shushed {shushCount} times)</span>
            </p>
          )}
          {shushCount >= 5 && (
            <p style={{ fontWeight: 'bold', color: '#e74c3c', fontSize: '1.2rem', animation: 'shake 0.5s' }}>
              😡 THE LIBRARIAN HAS KICKED YOU OUT. 
              <br/>
              <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'white' }}>(Refresh the page to apologize).</span>
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default About;