// src/pages/Home.js
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main style={{ margin: '0 auto' }}>
      {/* Hero Section */}
      <section className="bnrCnt" style={{
        textAlign: 'center',
        padding: '4rem 1rem',
        background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80) no-repeat center/cover',
        color: 'white',
        borderRadius: 0,
        boxShadow: '0 4px 20px rgb(0 0 0 / 0.3)',
        marginBottom: '3rem'
      }}>
        <h1 style={{fontSize: '2.8rem', marginBottom: '1rem', marginTop: '2rem', textShadow: '1px 1px 4px rgba(0,0,0,0.7)', display:"inline-block", width:'50%' }}>
          Overcome Life’s Obstacles with Timeless Hindu Wisdom
        </h1>
        <p style={{ fontSize: '1.3rem', maxWidth: 500, margin: '0 auto 2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
          Get personalized answers rooted in the Vedas, Upanishads, Gita, Puranas and more.
        </p>
        <button
          onClick={() => navigate('/quiz')}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgb(0 112 243 / 0.5)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#005bb5'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#0070f3'}
        >
          Ask Your First Question
        </button>
      </section>

      {/* How It Works Section */}
      <section className="howPowerCnt" style={{ marginBottom: '3rem', padding: '0 1rem' }}>
        <h2 className="h2Head">
          How PowerWithin Works
        </h2>
        <div className="wrapPointer">
          <div  className="wrapPointerCnt">Ask your real-life question</div>
          <div  className="wrapPointerCnt wrapPointerCntMid">We personalize your answer based on your preferences</div>
          <div  className="wrapPointerCnt">Receive tailored wisdom: stories, mantras, daily practices</div>
        </div>
      </section>

      <footer className="footerWrap">
        <div>© 2025 PowerWithin. All rights reserved.</div>
        <div className="footerCnt">
          <a href="#" >Terms & Conditions</a>
          <a href="#" className="pP">Privacy Policy</a>
        </div>
      </footer>
    </main>
  );
}
