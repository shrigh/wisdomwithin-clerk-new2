import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import Quiz from "./pages/Quiz";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import "./App.css";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// 2 days in milliseconds
const MAX_SESSION_DURATION = 2 * 24 * 60 * 60 * 1000;

function AutoLogoutHandler() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (!isSignedIn) {
      localStorage.removeItem("loginTimestamp");
      return;
    }

    const storedTime = localStorage.getItem("loginTimestamp");
    if (!storedTime) {
      localStorage.setItem("loginTimestamp", Date.now().toString());
    }

    const interval = setInterval(() => {
      const loginTime = parseInt(localStorage.getItem("loginTimestamp"));
      const elapsed = Date.now() - loginTime;

      if (elapsed > MAX_SESSION_DURATION) {
        clearInterval(interval);
        signOut().then(() => {
          localStorage.removeItem("loginTimestamp");
        });
      }
    }, 60 * 1000); // check every 1 minute (not every second)

    return () => clearInterval(interval);
  }, [isSignedIn]);

  return null;
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <AutoLogoutHandler /> {/* Auto logout after 2 days */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsconditions" element={<TermsConditions />} />
          <Route
            path="/ask"
            element={
              <>
                <SignedIn>
                  <AskQuestion />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
