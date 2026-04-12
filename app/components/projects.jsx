"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Y = "#e8f030";
const R = "#ff3d55";

// Bold fallback palettes — intentional color blocking
const FALLBACK = [
  { bg: "#1a1f14", accent: Y,         label: "rgba(232,240,48,0.18)" },
  { bg: "#1f1414", accent: R,         label: "rgba(255,61,85,0.18)"  },
  { bg: "#14161f", accent: "#4af5ff", label: "rgba(74,245,255,0.15)" },
  { bg: "#1c1414", accent: "#ff8c42", label: "rgba(255,140,66,0.15)" },
  { bg: "#14191f", accent: "#b47cff", label: "rgba(180,124,255,0.15)" },
];

function getProjectFields(proj) {
  return {
    title:   proj.title   || proj.name || "",
    desc:    proj.description || "",
    image:   proj.imageBase64 || proj.image || "",
    github:  proj.github  || proj.githubUrl || proj.repo || "",
    live:    proj.demo    || proj.live || proj.url || proj.link || proj.liveUrl || "",
    tags:    Array.isArray(proj.stack)       ? proj.stack :
             Array.isArray(proj.tags)        ? proj.tags :
             Array.isArray(proj.technologies)? proj.technologies :
             Array.isArray(proj.tech)        ? proj.tech : [],
  };
}

export default function MeridianProjects({ data }) {
  const items = data?.projects;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const featured = getProjectFields(items[0]);
  const rest = items.slice(1);

  return (
    <section id="projects" style={{
      background: "#0d0d0d",
      padding: "8rem 5rem",
      position: "relative", overflow: "hidden",
      borderTop: "1px solid #1e1e1e",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .mer-proj-section { padding: 4rem 1.5rem !important; }
          .mer-proj-grid { grid-template-columns: 1fr !important; }
          .mer-proj-caption { flex-direction: column !important; gap: 1rem !important; }
        }
      `}</style>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", top: "-2rem", right: "3rem",
        fontSize: "260px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.03)",
        pointerEvents: "none", userSelect: "none",
      }}>04</div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
      >
        <div style={{ width: "32px", height: "3px", background: Y }} />
        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.3em", color: Y }}>
          Selected Work
        </span>
      </motion.div>

      {/* Featured project */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{ marginBottom: "2.5rem" }}
      >
        <div style={{
          position: "relative", overflow: "hidden",
          border: `1px solid #2a2a2a`,
        }}>
          {/* Image or bold fallback */}
          <div style={{ height: "440px", position: "relative", overflow: "hidden" }}>
            {featured.image ? (
              <img
                src={featured.image}
                alt={featured.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  transition: "transform 0.6s ease",
                  filter: "brightness(0.85)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: FALLBACK[0].bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", background: FALLBACK[0].label }} />
                <span style={{
                  fontSize: "clamp(5rem, 10vw, 10rem)",
                  fontWeight: 900, letterSpacing: "-0.06em",
                  color: FALLBACK[0].accent,
                  opacity: 0.35, position: "relative", zIndex: 1,
                  textTransform: "uppercase",
                }}>
                  {featured.title?.slice(0, 3).toUpperCase() || "WRK"}
                </span>
              </div>
            )}

            {/* Yellow left bar */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: Y }} />

            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)",
              pointerEvents: "none",
            }} />

            {/* Index */}
            <span style={{ position: "absolute", top: "1.5rem", left: "1.8rem", fontSize: "11px", fontWeight: 700, color: Y, letterSpacing: "0.12em" }}>
              01
            </span>
          </div>

          {/* Caption */}
          <div className="mer-proj-caption" style={{
            padding: "1.8rem 2rem",
            background: "#141414",
            borderTop: `1px solid #2a2a2a`,
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: "2rem",
          }}>
            <div>
              <h3 style={{
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                fontWeight: 800, color: "#f0ede8",
                margin: "0 0 6px", letterSpacing: "-0.025em",
                textTransform: "uppercase",
              }}>
                {featured.title || "Untitled"}
              </h3>
              {featured.desc && (
                <p style={{ fontSize: "13px", color: "#555550", lineHeight: 1.6, margin: 0 }}>
                  {featured.desc.slice(0, 130)}{featured.desc.length > 130 ? "…" : ""}
                </p>
              )}
              {featured.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                  {featured.tags.slice(0, 5).filter(Boolean).map((t, j) => {
                    const label = typeof t === "string" ? t : t?.name || String(t);
                    return (
                      <span key={j} style={{
                        fontSize: "9px", fontWeight: 700, padding: "3px 10px",
                        border: `1px solid ${Y}33`, color: Y, opacity: 0.65,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                      }}>{label}</span>
                    );
                  })}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
              {featured.github && (
                <a href={featured.github} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#444440", transition: "color 0.2s", textDecoration: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = Y}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#444440"}>
                  <FaGithub size={18} />
                </a>
              )}
              {featured.live && (
                <a href={featured.live} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#444440", transition: "color 0.2s", textDecoration: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = Y}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#444440"}>
                  <FaExternalLinkAlt size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rest — grid */}
      {rest.length > 0 && (
        <div className="mer-proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2px" }}>
          {rest.map((rawProj, i) => {
            const proj = getProjectFields(rawProj);
            const pal = FALLBACK[(i + 1) % FALLBACK.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div style={{
                  border: "1px solid #2a2a2a",
                  overflow: "hidden",
                  transition: "border-color 0.25s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = Y}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#2a2a2a"}>

                  {/* Image / fallback */}
                  <div style={{ height: "220px", position: "relative", overflow: "hidden" }}>
                    {(proj.imageBase64 || proj.image) ? (
                      <img
                        src={proj.imageBase64 || proj.image}
                        alt={proj.title}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover", display: "block",
                          transition: "transform 0.45s ease",
                          filter: "brightness(0.85)",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%",
                        background: pal.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative",
                      }}>
                        <div style={{ position: "absolute", inset: 0, background: pal.label }} />
                        <span style={{
                          fontSize: "4rem", fontWeight: 900, letterSpacing: "-0.05em",
                          color: pal.accent, opacity: 0.3, textTransform: "uppercase",
                          position: "relative", zIndex: 1,
                        }}>
                          {proj.title?.slice(0, 2).toUpperCase() || "WK"}
                        </span>
                      </div>
                    )}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: pal.accent, opacity: 0.7 }} />
                    <span style={{ position: "absolute", top: "1rem", left: "1.2rem", fontSize: "10px", fontWeight: 700, color: pal.accent, letterSpacing: "0.1em" }}>
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Caption */}
                  <div style={{ padding: "1.4rem 1.6rem", background: "#141414" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "8px" }}>
                      <h3 style={{
                        fontSize: "14px", fontWeight: 800, color: "#f0ede8",
                        margin: 0, letterSpacing: "-0.02em", textTransform: "uppercase",
                      }}>
                        {proj.title || "Untitled"}
                      </h3>
                      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noopener noreferrer"
                            style={{ color: "#444440", transition: "color 0.2s", textDecoration: "none" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = Y}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#444440"}>
                            <FaGithub size={14} />
                          </a>
                        )}
                        {proj.live && (
                          <a href={proj.live} target="_blank" rel="noopener noreferrer"
                            style={{ color: "#444440", transition: "color 0.2s", textDecoration: "none" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = Y}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#444440"}>
                            <FaExternalLinkAlt size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.desc && (
                      <p style={{ fontSize: "11.5px", color: "#555550", lineHeight: 1.6, margin: "0 0 10px" }}>
                        {proj.desc.slice(0, 80)}{proj.desc.length > 80 ? "…" : ""}
                      </p>
                    )}
                    {proj.tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {proj.tags.slice(0, 3).filter(Boolean).map((t, j) => {
                          const label = typeof t === "string" ? t : t?.name || String(t);
                          return (
                            <span key={j} style={{
                              fontSize: "9px", padding: "2px 9px",
                              border: `1px solid ${pal.accent}33`,
                              color: pal.accent, opacity: 0.65,
                              letterSpacing: "0.06em", textTransform: "uppercase",
                            }}>{label}</span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
