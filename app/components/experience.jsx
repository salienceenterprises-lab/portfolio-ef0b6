"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const Y = "#e8f030";
const R = "#ff3d55";

export default function MeridianExperience({ data }) {
  const items = data?.experience;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="experience" style={{
      background: "#111111",
      padding: "8rem 5rem",
      position: "relative", overflow: "hidden",
      borderTop: "1px solid #1e1e1e",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .mer-exp-section { padding: 4rem 1.5rem !important; }
          .mer-exp-header { flex-direction: column !important; align-items: flex-start !important; gap: 0.75rem !important; }
        }
      `}</style>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", top: "-2rem", right: "3rem",
        fontSize: "260px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.03)",
        pointerEvents: "none", userSelect: "none",
      }}>03</div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
      >
        <div style={{ width: "32px", height: "3px", background: Y }} />
        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.3em", color: Y }}>
          Experience
        </span>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((exp, i) => {
          const role     = exp.role     || exp.title    || exp.position     || "";
          const company  = exp.company  || exp.employer || exp.organization || "";
          const period   = exp.period   || exp.duration || exp.years        || exp.startDate || "";
          const location = exp.location || "";

          const rawBullets =
            Array.isArray(exp.highlights)       ? exp.highlights :
            Array.isArray(exp.responsibilities) ? exp.responsibilities :
            Array.isArray(exp.bullets)          ? exp.bullets : [];
          const bullets = rawBullets.filter(Boolean);
          const description = exp.description || "";

          const stack =
            Array.isArray(exp.stack)        ? exp.stack :
            Array.isArray(exp.technologies) ? exp.technologies :
            Array.isArray(exp.tags)         ? exp.tags :
            Array.isArray(exp.tech)         ? exp.tech : [];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              style={{ padding: "3rem 0", borderBottom: "1px solid #1e1e1e" }}
            >
              {/* Header */}
              <div className="mer-exp-header" style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", gap: "2rem",
                marginBottom: "1.2rem", flexWrap: "wrap",
              }}>
                <div>
                  <h3 style={{
                    fontSize: "clamp(1.2rem, 2.2vw, 1.9rem)",
                    fontWeight: 800, color: "#f0ede8",
                    margin: "0 0 8px", letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                  }}>
                    {role}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <div style={{ width: "6px", height: "6px", background: Y, flexShrink: 0 }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: Y, opacity: 0.8 }}>
                      {company}
                    </span>
                    {location && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#444440" }}>
                        <FaMapMarkerAlt size={9} /> {location}
                      </span>
                    )}
                  </div>
                </div>

                {period && (
                  <div style={{
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    padding: "6px 16px",
                    fontSize: "10px", fontWeight: 700,
                    color: "#666660", letterSpacing: "0.1em",
                    flexShrink: 0,
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    {period}
                  </div>
                )}
              </div>

              {description && (
                <p style={{
                  fontSize: "14px", color: "rgba(240,237,232,0.5)",
                  lineHeight: 1.8, margin: "0 0 1.2rem", fontWeight: 300,
                  maxWidth: "820px",
                }}>
                  {description}
                </p>
              )}

              {bullets.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1.2rem" }}>
                  {bullets.map((b, j) => (
                    <div key={j} style={{
                      display: "flex", alignItems: "flex-start", gap: "14px",
                      fontSize: "13px", color: "rgba(240,237,232,0.5)", lineHeight: 1.7,
                    }}>
                      <span style={{
                        width: "16px", height: "2px", background: Y,
                        opacity: 0.4, flexShrink: 0, marginTop: "10px",
                      }} />
                      {b}
                    </div>
                  ))}
                </div>
              )}

              {stack.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "1rem" }}>
                  {stack.filter(Boolean).map((t, j) => {
                    const label = typeof t === "string" ? t : t?.name || String(t);
                    return (
                      <span key={j} style={{
                        fontSize: "9.5px", fontWeight: 700,
                        padding: "4px 12px",
                        background: "transparent",
                        border: `1px solid ${Y}33`,
                        color: Y, opacity: 0.7,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = Y; e.currentTarget.style.color = "#0d0d0d"; e.currentTarget.style.opacity = "1"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = Y; e.currentTarget.style.opacity = "0.7"; }}>
                        {label}
                      </span>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
