import { useState } from "react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (path) =>
    location.pathname === path ? { fontWeight: "600", textDecoration: "underline" } : {};

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
    <h2>WisdomWithin</h2>
  </Link>
        <div className="tagline">Built for Seekers, Powered by AI, Grounded in Hindu Wisdom</div>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <nav className={`navMenu ${menuOpen ? "open" : ""}`}>
        <Link to="/" style={linkClass("/")} onClick={closeMenu}>Home</Link>
        <Link to="/quiz" style={linkClass("/quiz")} onClick={closeMenu}>Features</Link>
        <Link to="/pricing" style={linkClass("/pricing")} onClick={closeMenu}>Pricing</Link>
        <Link to="/ask" style={linkClass("/ask")} onClick={closeMenu}>Ask</Link>
        <SignedOut>
          <SignInButton>
            <button className="loginBtn" onClick={closeMenu}>Log In / Sign Up</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
