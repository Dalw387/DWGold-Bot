import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Work, { Concepts, Project } from "./pages/Work.jsx";
import Services, { Industries, Industry, Service } from "./pages/Services.jsx";
import AI from "./pages/AI.jsx";
import Command from "./pages/Command.jsx";
import Build from "./pages/Build.jsx";
import Ask from "./pages/Ask.jsx";
import Watch, { WatchFilm } from "./pages/Watch.jsx";
import Pricing from "./pages/Pricing.jsx";
import About, { Process } from "./pages/About.jsx";
import Contact, { FAQ, Support, Voice } from "./pages/Contact.jsx";
import Login, { Client } from "./pages/Client.jsx";
import Legal from "./pages/Legal.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./styles/global.css";
import "./styles/chrome.css";
import "./styles/core.css";
import "./styles/home.css";
import "./styles/video.css";
import "./styles/pages.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<Project />} />
          <Route path="concepts" element={<Concepts />} />
          <Route path="showroom" element={<Navigate to="/work" replace />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<Service />} />
          <Route path="industries" element={<Industries />} />
          <Route path="industries/:slug" element={<Industry />} />
          <Route path="ai" element={<AI />} />
          <Route path="ai-agents" element={<Navigate to="/ai" replace />} />
          <Route path="command" element={<Command />} />
          <Route path="build" element={<Build />} />
          <Route path="blueprint" element={<Navigate to="/build" replace />} />
          <Route path="ask" element={<Ask />} />
          <Route path="voice" element={<Voice />} />
          <Route path="watch" element={<Watch />} />
          <Route path="watch/:slug" element={<WatchFilm />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="process" element={<Process />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="support" element={<Support />} />
          <Route path="login" element={<Login />} />
          <Route path="client" element={<Client />} />
          <Route path="legal/privacy" element={<Legal kind="privacy" />} />
          <Route path="legal/cookies" element={<Legal kind="cookies" />} />
          <Route path="legal/terms" element={<Legal kind="terms" />} />
          <Route path="legal/accessibility" element={<Legal kind="accessibility" />} />
          <Route path="privacy" element={<Navigate to="/legal/privacy" replace />} />
          <Route path="cookies" element={<Navigate to="/legal/cookies" replace />} />
          <Route path="terms" element={<Navigate to="/legal/terms" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
