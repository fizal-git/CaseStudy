import { useEffect, useState } from "react";
import Home from "./Home.jsx";
import EnergyHub from "./projects/EnergyHub.jsx";
import ConnectnowAgent from "./projects/ConnectnowAgent.jsx";
import ConnectnowCustomer from "./projects/ConnectnowCustomer.jsx";

/* Hash routes keep this a static site on Vercel — no rewrites needed. */
export const PROJECTS = {
  energyhub: { title: "EnergyHub — UX/UI Case Study", Page: EnergyHub },
  "connectnow-agent": { title: "Connectnow Agent App — UX/UI Case Study", Page: ConnectnowAgent },
  "connectnow-customer": { title: "Connectnow Customer App — UX/UI Case Study", Page: ConnectnowCustomer },
};

function readRoute() {
  const h = window.location.hash.replace(/^#\/?/, "").split(/[?#]/)[0];
  return PROJECTS[h] ? h : "";
}

export default function App() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.title = route ? PROJECTS[route].title : "Mohammed Fizal — Portfolio";
  }, [route]);

  if (!route) return <Home />;
  const { Page } = PROJECTS[route];
  return <Page />;
}
