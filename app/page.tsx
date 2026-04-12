"use client";
import React from "react";
import portfolioData from "../profile.json";

import MeridianNav from "./components/sidebar";
import MeridianHero from "./components/hero";
import MeridianAbout from "./components/about";
import MeridianEducation from "./components/education";
import MeridianExperience from "./components/experience";
import MeridianProjects from "./components/projects";
import MeridianSkills from "./components/skills";
import MeridianCommunity from "./components/community";
import MeridianContact from "./components/contact";

export default function DeployedPortfolio() {
  const data = portfolioData;

  if (!data) return (
    <div style={{
      minHeight: "100vh", background: "#0d0d0d",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontSize: "10px", color: "#444440", letterSpacing: "0.3em", textTransform: "uppercase" }}>
        Loading…
      </span>
    </div>
  );

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 72px; }
        ::placeholder { color: #333330; }
        @media (max-width: 1023px) {
          section { padding-left: 2rem !important; padding-right: 2rem !important; }
        }
      `}</style>

      <MeridianNav data={data} />

      <MeridianHero data={data} />
      <MeridianAbout data={data} />
      <MeridianEducation data={data} />
      <MeridianExperience data={data} />
      <MeridianProjects data={data} />
      <MeridianSkills data={data} />
      <MeridianCommunity data={data} />
      <MeridianContact data={data} />
    </div>
  );
}
