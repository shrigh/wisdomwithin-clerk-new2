// src/pages/PrivacyPolicy.js
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <main style={{ margin: '0 auto' }}>
      <section>
        <div className="privacyContainer">
        <h1>Privacy Policy</h1>
        <p>Last updated: August 6, 2025</p>

        <p>
          At My Eternal Guide, your privacy is very important to us. This policy
          outlines what information we collect, how we use it, and how we protect
          it.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>Personal information: email, name, login info (via Clerk)</li>
          <li>Question data: questions you ask and selected preferences</li>
          <li>Usage data: analytics, feature usage (non-personal)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To generate personalized spiritual responses</li>
          <li>To improve the platform and its wisdom delivery</li>
          <li>To ensure account security and access control</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>
          We use secure methods to store data and do not share your personal
          information with third parties. Clerk manages user authentication.
        </p>

        <h2>4. Your Rights</h2>
        <p>
          You may request to view, edit, or delete your data at any time by
          contacting us or via your account settings.
        </p>

        <h2>5. Contact Us</h2>
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
