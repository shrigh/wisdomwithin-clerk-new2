// src/pages/Pricing.js
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <main style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Choose Your Path</h2>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
        marginTop: '1.5rem'
      }}>
        {/* Free Plan */}
        <div style={{
          border: '1px solid #ccc', borderRadius: 8, padding: '1rem',
          backgroundColor: '#f9f9f9', textAlign:'center'        }}>
          <h3>Free Plan</h3>
          <p></p>
          <button onClick={() => navigate('/ask')} style={{
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: 5,
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}>
            Ask Your Question
          </button>
        </div>

        

        
      </div>
    </main>
  );
}
