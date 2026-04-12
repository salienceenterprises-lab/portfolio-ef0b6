"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const Y = "#e8f030";
const R = "#ff3d55";

const CARD_ACCENTS = [Y, R, "#4af5ff", "#ff8c42", "#b47cff"];

export default function MeridianCommunity({ data }) {
  const items = data?.community || data?.volunteering || data?.involvement || [];
  if (!items.length) return null;

  return (
    <section id="community" style={{
      background: "#0d0d0d",
      padding: "8rem 5rem",
      position: "relative", overflow: "hidden",
      borderTop: "1px solid #1e1e1e",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .mer-comm-section { padding: 4rem 1.5rem !important; }
          .mer-comm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", top: "-2rem", right: "3rem",
        fontSize: "260px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.03)",
        pointerEvents: "none", userSelect: "none",
      }}>06</div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
      >
        <div style={{ width: "32px", height: "3px", background: Y }} />
        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.3em", color: Y }}>
          Community &amp; Impact
        </span>
      </motion.div>

      {/* Cards grid */}
      <div className="mer-comm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
        {items.map((item, i) => {
          const accent      = CARD_ACCENTS[i % CARD_ACCENTS.length];
          const title       = item.title       || item.name       || item.organization || "";
          const roleTag     = item.role        || item.position   || item.type         || "";
          const org         = item.organization || item.company   || item.employer     || "";
          const description = item.description  || item.impact    || "";
          const period      = item.year        || item.date       || item.duration     || item.period || item.years || "";
          const link        = item.link        || item.url        || item.website      || "";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div style={{
                background: "#111111",
                border: "1px solid #2a2a2a",
                padding: "2.2rem",
                height: "100%", boxSizing: "border-box",
                position: "relative",
                transition: "border-color 0.2s ease",
                overflow: "hidden",
                display: "flex", flexDirection: "column",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#2a2a2a"}>
                {/* Accent top bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: accent }} />

                {/* Role tag + period */}
                {(roleTag || period) && (
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginBottom: "1.4rem", flexWrap: "wrap", gap: "0.5rem",
                  }}>
                    {roleTag && (
                      <span style={{
                        fontSize: "8.5px", fontWeight: 800,
                        textTransform: "uppercase", letterSpacing: "0.2em",
                        color: accent,
                        border: `1px solid ${accent}44`,
                        padding: "3px 10px",
                      }}>
                        {roleTag}
                      </span>
                    )}
                    {period && (
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#444440", letterSpacing: "0.08em" }}>
                        {period}
                      </span>
                    )}
                  </div>
                )}

                <h3 style={{
                  fontSize: "16px", fontWeight: 700, color: "#f0ede8",
                  margin: "0 0 6px", letterSpacing: "-0.015em",
                  textTransform: "uppercase",
                }}>
                  {title}
                </h3>

                {org && org !== title && (
                  <p style={{ fontSize: "12px", fontWeight: 600, color: accent, opacity: 0.6, margin: "0 0 10px" }}>
                    {org}
                  </p>
                )}

                {description && (
                  <p style={{
                    fontSize: "13px", color: "rgba(240,237,232,0.45)",
                    lineHeight: 1.7, margin: "0", flex: 1,
                  }}>
                    {description}
                  </p>
                )}

                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      marginTop: "1rem", fontSize: "9px", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.2em",
                      color: accent, opacity: 0.6, textDecoration: "none",
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "0.6"}>
                    View <FaExternalLinkAlt size={9} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
