"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Y = "#e8f030";
const R = "#ff3d55";

export default function MeridianAbout({ data }) {
  if (!data) return null;

  const infoItems = [
    { label: "Location", value: data.location,  link: null },
    { label: "Email",    value: data.email,     link: `mailto:${data.email}` },
    { label: "GitHub",   value: data.github ? "@" + data.github.split("/").pop() : null, link: data.github },
    { label: "LinkedIn", value: data.linkedin ? "LinkedIn" : null, link: data.linkedin },
    { label: "Website",  value: data.website,   link: data.website },
  ].filter((r) => r.value);

  return (
    <section id="about" className="mer-about-section" style={{
      background: "#111111",
      padding: "8rem 5rem",
      position: "relative", overflow: "hidden",
      borderTop: "1px solid #1e1e1e",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .mer-about-section { padding: 4rem 1.5rem !important; }
          .mer-about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
      {/* Ghost "01" watermark */}
      <div style={{
        position: "absolute", top: "-2rem", right: "3rem",
        fontSize: "260px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.03)",
        pointerEvents: "none", userSelect: "none",
      }}>01</div>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
      >
        <div style={{ width: "32px", height: "3px", background: Y }} />
        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.3em", color: Y }}>
          About
        </span>
      </motion.div>

      {/* Display heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        style={{
          fontSize: "clamp(2.8rem, 6vw, 6rem)",
          fontWeight: 900, letterSpacing: "-0.05em",
          lineHeight: 0.88, textTransform: "uppercase",
          color: "#f0ede8", margin: "0 0 5rem",
        }}
      >
        Who I<br />
        <span style={{ color: Y }}>Am.</span>
      </motion.h2>

      {/* Bio + contact */}
      <div className="mer-about-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "6rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
            fontWeight: 300, lineHeight: 1.85,
            color: "rgba(240,237,232,0.65)",
            marginBottom: "4rem",
          }}>
            {data.bio}
          </p>

          {data.skills?.length > 0 && (() => {
            const flatSkills = data.skills.flatMap((s) =>
              typeof s === "object" && s !== null && (s.items || s.skills)
                ? (s.items || s.skills)
                : [s]
            );
            return (
            <div>
              <p style={{
                fontSize: "9px", textTransform: "uppercase",
                letterSpacing: "0.3em", color: "#444440", marginBottom: "1.2rem",
                fontWeight: 700,
              }}>
                // Core Technologies
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {flatSkills.slice(0, 14).map((skill, i) => {
                  const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                  return (
                  <span key={i} style={{
                    fontSize: "10px", fontWeight: 700,
                    padding: "5px 14px",
                    background: i % 5 === 0 ? Y : "transparent",
                    border: `1px solid ${i % 5 === 0 ? Y : "#2a2a2a"}`,
                    color: i % 5 === 0 ? "#0d0d0d" : "#888885",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = Y; e.currentTarget.style.color = "#0d0d0d"; e.currentTarget.style.borderColor = Y; }}
                  onMouseLeave={(e) => {
                    const orig = i % 5 === 0;
                    e.currentTarget.style.background = orig ? Y : "transparent";
                    e.currentTarget.style.color = orig ? "#0d0d0d" : "#888885";
                    e.currentTarget.style.borderColor = orig ? Y : "#2a2a2a";
                  }}>
                    {label}
                  </span>
                  );
                })}
              </div>
            </div>
            );
          })()}
        </motion.div>

        {/* Contact panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            border: "1px solid #2a2a2a",
            padding: "2rem",
            background: "#141414",
            height: "fit-content",
          }}
        >
          <p style={{
            fontSize: "9px", fontWeight: 800, textTransform: "uppercase",
            letterSpacing: "0.3em", color: Y, marginBottom: "1.8rem",
          }}>
            Connect
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {infoItems.map((row, i) => (
              <div key={i} style={{
                padding: "11px 0",
                borderBottom: "1px solid #1e1e1e",
              }}>
                <p style={{
                  fontSize: "8px", textTransform: "uppercase",
                  letterSpacing: "0.2em", color: "#444440", margin: "0 0 3px", fontWeight: 700,
                }}>{row.label}</p>
                {row.link ? (
                  <a href={row.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "12px", color: "#f0ede8", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = Y}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#f0ede8"}>
                    {row.value}
                  </a>
                ) : (
                  <span style={{ fontSize: "12px", color: "#f0ede8" }}>{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
