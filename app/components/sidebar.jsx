"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Y = "#e8f030";   // electric yellow
const R = "#ff3d55";   // hot red

export default function MeridianNav({ data }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const allNavLinks = [
    { label: "About",      href: "#about",      key: "about" },
    { label: "Education",  href: "#education",  key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Projects",   href: "#projects",   key: "projects" },
    { label: "Skills",     href: "#skills",     key: "skills" },
    { label: "Community",  href: "#community",  key: "community" },
    { label: "Contact",    href: "#contact",    key: "email" },
  ];

  const activeLinks = allNavLinks.filter((link) => {
    if (link.label === "About") return true;
    const d = data?.[link.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;

  useEffect(() => {
    const ids = ["hero", ...activeLinks.map((l) => l.href.replace("#", ""))];
    const onScroll = () => {
      const sorted = ids
        .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? Infinity }))
        .filter((s) => s.top !== Infinity)
        .sort((a, b) => a.top - b.top);
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].top - 160) {
          setActiveSection(sorted[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // intentionally not locking body scroll — would interfere with preview page

  const go = (href) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }, 320);
  };

  const socials = [
    data?.github   && { icon: <FaGithub size={16}/>,  href: data.github,               label: "GitHub" },
    data?.linkedin && { icon: <FaLinkedin size={16}/>, href: data.linkedin,             label: "LinkedIn" },
    data?.email    && { icon: <FaEnvelope size={16}/>, href: `mailto:${data.email}`,    label: "Email" },
  ].filter(Boolean);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open navigation"
        style={{
          position: "fixed", bottom: "2rem", right: "2rem",
          width: "54px", height: "54px",
          background: Y, border: "none", cursor: "pointer",
          zIndex: 40,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "5px",
        }}
      >
        <span style={{ width: "22px", height: "2px", background: "#0d0d0d", display: "block" }} />
        <span style={{ width: "16px", height: "2px", background: "#0d0d0d", display: "block", alignSelf: "flex-start", marginLeft: "4px" }} />
        <span style={{ width: "22px", height: "2px", background: "#0d0d0d", display: "block" }} />
      </motion.button>

      {/* ── Drawer overlay + panel ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.75)",
                zIndex: 41,
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
              style={{
                position: "fixed", top: 0, left: 0, bottom: 0,
                width: "min(360px, 85vw)",
                background: "#111111",
                zIndex: 42,
                display: "flex", flexDirection: "column",
                padding: "2.5rem 2.8rem",
                borderRight: `3px solid ${Y}`,
                overflow: "hidden",
              }}
            >
              {/* Top row: name + close */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "3rem",
              }}>
                <button
                  onClick={() => go("#hero")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
                >
                  <span style={{ fontSize: "11px", fontWeight: 400, color: "#666660", letterSpacing: "0.1em" }}>
                    {data?.name || "Portfolio"}
                  </span>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "none", border: "1px solid #2a2a2a",
                    width: "34px", height: "34px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#666660", transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = Y; e.currentTarget.style.color = Y; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#666660"; }}
                >
                  <FaTimes size={12} />
                </button>
              </div>

              {/* Nav links */}
              <nav style={{ flex: 1 }}>
                {activeLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.href}
                      onClick={() => go(link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.06 }}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        background: "none", border: "none", cursor: "pointer",
                        padding: "0.75rem 0",
                        borderBottom: "1px solid #1e1e1e",
                        fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        color: isActive ? Y : "#f0ede8",
                        transition: "color 0.2s ease",
                        textTransform: "uppercase",
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = Y; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#f0ede8"; }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}

                {resumeSource && (
                  <motion.a
                    href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                    download="Resume.pdf"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + activeLinks.length * 0.06 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "10px",
                      marginTop: "1.5rem",
                      fontSize: "11px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.22em",
                      color: Y, textDecoration: "none",
                      border: `1px solid ${Y}44`,
                      padding: "10px 20px",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = `${Y}18`}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    Résumé ↓
                  </motion.a>
                )}
              </nav>

              {/* Bottom: title + socials */}
              <div>
                <div style={{ height: "1px", background: "#2a2a2a", marginBottom: "1.5rem" }} />
                <p style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                  fontWeight: 800, letterSpacing: "-0.03em",
                  color: "#f0ede8", lineHeight: 1, margin: "0 0 1.2rem",
                  textTransform: "uppercase",
                }}>
                  {data?.title || "Developer"}
                </p>
                {socials.length > 0 && (
                  <div style={{ display: "flex", gap: "12px" }}>
                    {socials.map((s, i) => (
                      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                        aria-label={s.label}
                        style={{
                          width: "36px", height: "36px",
                          border: "1px solid #2a2a2a",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#666660", textDecoration: "none",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = Y; e.currentTarget.style.color = Y; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#666660"; }}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
