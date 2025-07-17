// src/pages/Quiz.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();

  const emotions = [
    "Anxiety or Fear",
    "Anger or Frustration",
    "Sadness or Loneliness",
    "Jealousy or Comparison",
    "Overthinking or Indecision",
    "Feeling Lost or Lacking Purpose"
  ];

  const practices = [
    "Meditation",
    "Listening to Talks",
    "Watching Videos",
    "Mantra Chanting",
    "Breathwork",
    "Journaling"
  ];

  const energies = [
    "Ganesha (New Beginnings)",
    "Hanuman (Strength & Devotion)",
    "Krishna (Strategy & Love)",
    "Durga (Protection & Power)",
    "Shiva (Inner Stillness)",
    "Lakshmi (Prosperity & Grace)",
    "Saraswati (Wisdom & Speech)"
  ];

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedPractices, setSelectedPractices] = useState([]);
  const [selectedEnergies, setSelectedEnergies] = useState([]);
  const [guruEnergy, setGuruEnergy] = useState("");

  const togglePractice = (practice) => {
    setSelectedPractices(prev =>
      prev.includes(practice) ? prev.filter(p => p !== practice) : [...prev, practice]
    );
  };

  const toggleEnergy = (energy) => {
    setSelectedEnergies(prev =>
      prev.includes(energy) ? prev.filter(e => e !== energy) : [...prev, energy]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just navigate to pricing (you can save quiz data later)
    navigate('/pricing');
  };

  return (
    <main style={{  }}>
    <section style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Your Journey, Your Way</h2>
      <p>Understanding your inner patterns allows us to personalize your guidance further.</p>

      <form onSubmit={handleSubmit}>
        {/* Emotional Tendencies */}
        <fieldset style={{ marginBottom: '1.5rem' }}>
          <legend><strong>Select the emotion you most wish to overcome:</strong></legend>
          {emotions.map(em => (
            <label key={em} style={{ display: 'block', margin: '0.3rem 0' }}>
              <input
                type="radio"
                name="emotion"
                value={em}
                checked={selectedEmotion === em}
                onChange={() => setSelectedEmotion(em)}
                required
              /> {em}
            </label>
          ))}
        </fieldset>

        {/* Preferred Practice Formats */}
        <fieldset style={{ marginBottom: '1.5rem' }}>
          <legend><strong>Preferred Practice Formats (select all that apply):</strong></legend>
          {practices.map(practice => (
            <label key={practice} style={{ display: 'block', margin: '0.3rem 0' }}>
              <input
                type="checkbox"
                value={practice}
                checked={selectedPractices.includes(practice)}
                onChange={() => togglePractice(practice)}
              /> {practice}
            </label>
          ))}
        </fieldset>

        {/* Energies You Resonate With */}
        <fieldset style={{ marginBottom: '1.5rem' }}>
          <legend><strong>Energies You Resonate With (select all that apply):</strong></legend>
          {energies.map(energy => (
            <label key={energy} style={{ display: 'block', margin: '0.3rem 0' }}>
              <input
                type="checkbox"
                value={energy}
                checked={selectedEnergies.includes(energy)}
                onChange={() => toggleEnergy(energy)}
              /> {energy}
            </label>
          ))}
          <label style={{ display: 'block', margin: '0.5rem 0' }}>
            Your Guru or Other Energy (optional): <br />
            <input
              type="text"
              value={guruEnergy}
              onChange={e => setGuruEnergy(e.target.value)}
              placeholder="Enter here"
              style={{ width: '100%', padding: '0.3rem', marginTop: '0.3rem' }}
            />
          </label>
        </fieldset>

        <button type="submit" style={{
          backgroundColor: '#0070f3', color: 'white', border: 'none',
          padding: '0.8rem 1.5rem', borderRadius: 6, cursor: 'pointer',
          fontSize: '1rem'
        }}>
          Continue to Pricing
        </button>
      </form>
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
