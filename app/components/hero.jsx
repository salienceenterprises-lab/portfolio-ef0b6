"use client";
import React from "react";
import { motion } from "framer-motion";

const Y = "#e8f030";
const R = "#ff3d55";

export default function MeridianHero({ data }) {
  const hasPhoto = !!data?.heroImageBase64;
  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;
  const nameParts = (data?.name || "Your Name").split(" ");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <section id="hero" style={{
      minHeight: "100vh", background: "#0d0d0d",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "stretch",
    }}>
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes blink-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @media (max-width: 767px) {
          .mer-hero-grid { grid-template-columns: 1fr !important; }
          .mer-hero-photo { display: none !important; }
          .mer-hero-text { padding: 3rem 1.5rem 3rem !important; }
        }
      `}</style>

      {/* Top ticker bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "36px",
        background: Y, overflow: "hidden",
        display: "flex", alignItems: "center", zIndex: 10,
      }}>
        <div style={{
          display: "flex", gap: "3rem",
          whiteSpace: "nowrap",
          animation: "ticker 18s linear infinite",
          fontSize: "10px", fontWeight: 800,
          letterSpacing: "0.25em", textTransform: "uppercase",
          color: "#0d0d0d",
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>
              {data?.title || "Developer"} &nbsp;·&nbsp; {data?.name || "Portfolio"} &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="mer-hero-grid" style={{
        display: "grid",
        gridTemplateColumns: hasPhoto ? "1fr 420px" : "1fr",
        width: "100%",
        paddingTop: "36px",
      }}>
        {/* Left: text content */}
        <div className="mer-hero-text" style={{
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end",
          padding: "5rem 5rem 4rem",
          position: "relative",
        }}>
          {/* Ghost section number */}
          <div style={{
            position: "absolute", top: "4rem", right: "3rem",
            fontSize: "220px", fontWeight: 900, lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            pointerEvents: "none", userSelect: "none",
          }}>00</div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "9px",
              marginBottom: "3rem",
              width: "fit-content",
            }}
          >
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: Y, animation: "blink-dot 2s infinite",
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.22em", color: "rgba(240,237,232,0.5)",
            }}>
              Available for work
            </span>
          </motion.div>

          {/* Name — stacked, last word in yellow */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            style={{ margin: "0 0 2.5rem", lineHeight: 0.88 }}
          >
            {nameParts.map((word, i) => (
              <span key={i} style={{
                display: "block",
                fontSize: "clamp(4rem, 10vw, 9.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                textTransform: "uppercase",
                color: i === nameParts.length - 1 ? Y : "#f0ede8",
              }}>
                {word}
              </span>
            ))}
          </motion.h1>

          {/* Bio excerpt */}
          {(data?.sloganHeroSection || data?.bio) && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                fontSize: "15px", color: "rgba(240,237,232,0.45)",
                lineHeight: 1.8, maxWidth: "520px", fontWeight: 300,
                margin: "0 0 3rem",
                borderLeft: `2px solid ${Y}44`,
                paddingLeft: "1.5rem",
              }}
            >
              {data?.sloganHeroSection || data?.bio?.slice(0, 160) + "…"}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
          >
            <button
              onClick={() => scrollTo("contact")}
              style={{
                background: Y, color: "#0d0d0d",
                border: "none", padding: "14px 36px",
                fontSize: "10px", fontWeight: 900,
                textTransform: "uppercase", letterSpacing: "0.22em",
                cursor: "pointer",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              Get in Touch
            </button>

            <button
              onClick={() => scrollTo("projects")}
              style={{
                background: "none", color: "#f0ede8",
                border: "1px solid rgba(255,255,255,0.18)", padding: "14px 36px",
                fontSize: "10px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.22em",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = Y; e.currentTarget.style.color = Y; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "#f0ede8"; }}
            >
              View Work
            </button>

            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  color: "rgba(240,237,232,0.4)", fontSize: "10px",
                  fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em",
                  textDecoration: "none", transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = Y}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(240,237,232,0.4)"}
              >
                Résumé ↓
              </a>
            )}
          </motion.div>
        </div>

        {/* Right: photo panel */}
        {hasPhoto && (
          <motion.div className="mer-hero-photo"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: "relative", overflow: "hidden",
              borderLeft: `3px solid ${Y}`,
            }}
          >
            <img
              src={data.heroImageBase64}
              alt={data.name}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                display: "block",
                filter: "grayscale(20%)",
              }}
            />
            {/* Yellow corner accent */}
            <div style={{
              position: "absolute", bottom: 0, left: 0,
              width: "100%", height: "4px",
              background: `linear-gradient(90deg, ${Y}, transparent)`,
            }} />
          </motion.div>
        )}
      </div>

      {/* Bottom left: scroll cue */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "5rem",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <div style={{ width: "30px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
        <span style={{
          fontSize: "9px", fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.28em", color: "rgba(255,255,255,0.25)",
        }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
