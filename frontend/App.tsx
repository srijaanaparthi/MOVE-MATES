import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "@/components/Header";
import { TopBanner } from "@/components/TopBanner";
import LandingPage from "@/pages/LandingPage";
import Home from "@/pages/Home";
import StudyCircles from "@/pages/StudyCircles";
import PeerLearning from "@/pages/PeerLearning";
import TutorBooking from "@/pages/TutorBooking";
import SignIn from "@/pages/SignIn";
import LogIn from "@/pages/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <>
            <TopBanner />
            <Header />
            <div className="px-4 py-4 max-w-screen-xl mx-auto w-full">
              <Home />
            </div>
          </>
        } />
        <Route path="/circles" element={
          <>
            <TopBanner />
            <Header />
            <div className="px-4 py-4 max-w-screen-xl mx-auto w-full">
              <StudyCircles />
            </div>
          </>
        } />
        <Route path="/peer" element={
          <>
            <TopBanner />
            <Header />
            <div className="px-4 py-4 max-w-screen-xl mx-auto w-full">
              <PeerLearning />
            </div>
          </>
        } />
        <Route path="/booking" element={
          <>
            <TopBanner />
            <Header />
            <div className="px-4 py-4 max-w-screen-xl mx-auto w-full">
              <TutorBooking />
            </div>
          </>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
