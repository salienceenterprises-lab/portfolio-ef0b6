"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const Y = "#e8f030";

export default function MeridianEducation({ data }) {
  const items = data?.education;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="education" style={{
      background: "#0d0d0d",
      padding: "8rem 5rem",
      position: "relative", overflow: "hidden",
      borderTop: "1px solid #1e1e1e",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .mer-edu-section { padding: 4rem 1.5rem !important; }
          .mer-edu-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", top: "-2rem", right: "3rem",
        fontSize: "260px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.03)",
        pointerEvents: "none", userSelect: "none",
      }}>02</div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
      >
        <div style={{ width: "32px", height: "3px", background: Y }} />
        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.3em", color: Y }}>
          Education
        </span>
      </motion.div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {items.map((edu, i) => {
          const degree      = edu.degree      || edu.field       || edu.qualification || edu.program || edu.title || "";
          const institution = edu.institution || edu.school      || edu.university    || "";
          const period      = edu.period      || edu.duration    || edu.years         || edu.year    || edu.graduationYear || "";
          const location    = edu.location    || "";
          const grade       = edu.grade       || edu.gpa         || edu.result        || "";
          const description = edu.description || "";
          const achievements = Array.isArray(edu.achievements) ? edu.achievements.filter(Boolean) : [];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="mer-edu-row"
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "3rem",
                padding: "3rem 0",
                borderBottom: "1px solid #1e1e1e",
                position: "relative",
              }}
            >
              {/* Index number */}
              <div style={{ paddingTop: "4px" }}>
                <span style={{
                  fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                  fontWeight: 900, color: Y, lineHeight: 1,
                  letterSpacing: "-0.05em", display: "block",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div>
                <div style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", gap: "2rem",
                  marginBottom: "8px", flexWrap: "wrap",
                }}>
                  <h3 style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                    fontWeight: 700, color: "#f0ede8",
                    margin: 0, letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                  }}>
                    {degree}
                  </h3>
                  {period && (
                    <span style={{
                      fontSize: "10px", fontWeight: 600,
                      color: "#444440", letterSpacing: "0.1em",
                      flexShrink: 0, paddingTop: "4px",
                      fontVariantNumeric: "tabular-nums",
                    }}>
                      {period}
                    </span>
                  )}
                </div>

                {institution && (
                  <p style={{ fontSize: "13px", fontWeight: 600, color: Y, opacity: 0.7, margin: "0 0 6px" }}>
                    {institution}
                  </p>
                )}

                {location && (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#444440", marginBottom: "8px" }}>
                    <FaMapMarkerAlt size={9} />
                    {location}
                  </div>
                )}

                {grade && (
                  <span style={{
                    display: "inline-block", marginBottom: "10px",
                    fontSize: "10px", fontWeight: 700, color: Y,
                    border: `1px solid ${Y}44`,
                    padding: "3px 12px", letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}>
                    {grade}
                  </span>
                )}

                {description && (
                  <p style={{
                    fontSize: "13px", color: "rgba(240,237,232,0.45)",
                    lineHeight: 1.75, margin: "0 0 10px",
                  }}>
                    {description}
                  </p>
                )}

                {achievements.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                    {achievements.map((a, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "13px", color: "rgba(240,237,232,0.45)", lineHeight: 1.7 }}>
                        <span style={{ width: "14px", height: "2px", background: Y, opacity: 0.4, flexShrink: 0, marginTop: "10px" }} />
                        {a}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
