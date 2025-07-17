// src/components/Header.js
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path ? { fontWeight: '400', textDecoration: 'underline' } : {};

  return (
    <header style={{
      position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #ddd',
      padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000
    }}>
      <div style={{float:"left"}}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>WisdomWithin</h2>
        <div style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
          Built for Seekers, Powered by AI, Grounded in Hindu Wisdom
        </div>
      </div>

      <nav className="navMenu" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={linkClass('/')}>Home</Link>
        <Link to="/quiz" style={linkClass('/quiz')}>Features</Link>
        <Link to="/pricing" style={linkClass('/pricing')}>Pricing</Link>
        <Link to="/ask" style={linkClass('/ask')}>Ask</Link>
        <SignedOut>
          <SignInButton>
            <button style={{
              marginLeft: '1rem', padding: '0.4rem 1rem', borderRadius: 4,
              border: '1px solid #0070f3', background: '#0070f3', color: 'white', cursor: 'pointer'
            }}>Log In / Sign Up</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
