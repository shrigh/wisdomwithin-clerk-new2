import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import Quiz from "./pages/Quiz";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import "./App.css";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsconditions" element={<TermsConditions />} />
          <Route path="/ask" element={
            <>
              <SignedIn><AskQuestion /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
