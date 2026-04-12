"use client";
import React from "react";
import { motion } from "framer-motion";

const Y = "#e8f030";

export default function MeridianSkills({ data }) {
  const skills = data?.skills;
  if (!skills || !Array.isArray(skills) || skills.length === 0) return null;

  // Normalize: handle array of category objects OR flat string array
  const groups = (() => {
    if (typeof skills[0] === "object" && skills[0] !== null && (skills[0].items || skills[0].category || skills[0].skills || skills[0].name)) {
      return skills.map((g) => ({
        category: g.category || g.name || "Skills",
        items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
      })).filter((g) => g.items.length > 0);
    }
    return null; // flat list
  })();

  return (
    <section id="skills" style={{
      background: "#111111",
      padding: "8rem 5rem",
      position: "relative", overflow: "hidden",
      borderTop: "1px solid #1e1e1e",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .mer-skills-section { padding: 4rem 1.5rem !important; }
          .mer-skills-row { grid-template-columns: 1fr !important; gap: 1rem !important; padding: 1.5rem 0 !important; }
        }
      `}</style>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", top: "-2rem", right: "3rem",
        fontSize: "260px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.03)",
        pointerEvents: "none", userSelect: "none",
      }}>05</div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
      >
        <div style={{ width: "32px", height: "3px", background: Y }} />
        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.3em", color: Y }}>
          Skills
        </span>
      </motion.div>

      {groups ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {groups.map((group, gi) => (
            <motion.div
              key={gi}
              className="mer-skills-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.07 }}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "3rem", alignItems: "start",
                padding: "2.5rem 0",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              <div style={{ paddingTop: "3px" }}>
                <span style={{
                  fontSize: "10px", fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: "0.22em",
                  color: Y, opacity: 0.6,
                }}>
                  {group.category}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.items.filter(Boolean).map((skill, i) => {
                  const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                  return (
                    <span key={i} style={{
                      fontSize: "10px", fontWeight: 700,
                      padding: "6px 15px",
                      border: `1px solid #2a2a2a`,
                      color: "#888885",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = Y; e.currentTarget.style.color = "#0d0d0d"; e.currentTarget.style.borderColor = Y; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#888885"; e.currentTarget.style.borderColor = "#2a2a2a"; }}>
                      {label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.map((skill, i) => {
              const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
              return (
                <span key={i} style={{
                  fontSize: "10px", fontWeight: 700,
                  padding: "7px 18px",
                  background: i % 7 === 0 ? Y : "transparent",
                  border: `1px solid ${i % 7 === 0 ? Y : "#2a2a2a"}`,
                  color: i % 7 === 0 ? "#0d0d0d" : "#888885",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = Y; e.currentTarget.style.color = "#0d0d0d"; e.currentTarget.style.borderColor = Y; }}
                onMouseLeave={(e) => {
                  const orig = i % 7 === 0;
                  e.currentTarget.style.background = orig ? Y : "transparent";
                  e.currentTarget.style.color = orig ? "#0d0d0d" : "#888885";
                  e.currentTarget.style.borderColor = orig ? Y : "#2a2a2a";
                }}>
                  {label}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </section>
  );
}
