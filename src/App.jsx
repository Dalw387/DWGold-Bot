import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav, { Footer } from "./components/Nav.jsx";

export default function App() {
  const loc = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => document.documentElement.classList.toggle("reduce-motion", mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
