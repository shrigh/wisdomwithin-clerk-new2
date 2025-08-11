// src/pages/TermsConditions.js
import { useNavigate } from "react-router-dom";

export default function TermsConditions() {
  const navigate = useNavigate();

  return (
    <main style={{ margin: '0 auto' }}>
      <section>
        <div className="TCContainer">
        <h1>Terms & Conditions</h1>
      <p>Last updated: August 6, 2025</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using My Eternal Guide, you agree to abide by these terms and conditions.
        If you do not agree, please do not use the platform.
      </p>

      <h2>2. Use of the Platform</h2>
      <p>
        This platform offers spiritual content based on Indian scriptures, AI models,
        and personal preferences. The content is meant for personal reflection only.
      </p>

      <h2>3. Not Medical or Professional Advice</h2>
      <p>
        My Eternal Guide does not offer medical, psychological, or legal advice. All content
        is for spiritual and educational purposes only.
      </p>

      <h2>4. User Responsibilities</h2>
      <ul>
        <li>You agree not to misuse the service or content.</li>
        <li>You may not share or republish responses without permission.</li>
        <li>You must not impersonate others or submit harmful content.</li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        All content, structure, and branding on My Eternal Guide are owned by the creators
        unless otherwise noted.
      </p>

      <h2>6. Termination</h2>
      <p>
        We reserve the right to terminate accounts or restrict access if users
        violate these terms.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We may revise these terms at any time. Continued use means acceptance
        of the new terms.
      </p>

      <h2>8. Contact Us</h2>
      <p>Email: test@test.com</p>
        
      </div>
    </section>
    <footer className="footerWrap">
        <div>© 2025 My Eternal Guide. All rights reserved.</div>
        <div className="footerCnt">
          <a href="/termsconditions" >Terms & Conditions</a>
          <a href="/privacypolicy" className="pP">Privacy Policy</a>
        </div>
      </footer>
    </main>
  );
}
