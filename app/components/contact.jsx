"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";

const Y = "#e8f030";
const R = "#ff3d55";

export default function MeridianContact({ data }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const WEB3FORMS_KEY = data?.web3forms_key ?? "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const r = await res.json();
      setStatus(r.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "#111111",
    border: "1px solid",
    borderColor: focused === field ? Y : "#2a2a2a",
    color: "#f0ede8",
    fontSize: "14px",
    padding: "14px 16px",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  });

  const socials = [
    data?.github   && { icon: <FaGithub size={18}/>,  href: data.github,             label: "GitHub" },
    data?.linkedin && { icon: <FaLinkedin size={18}/>, href: data.linkedin,           label: "LinkedIn" },
    data?.email    && { icon: <FaEnvelope size={18}/>, href: `mailto:${data.email}`,  label: "Email" },
  ].filter(Boolean);

  return (
    <section id="contact" style={{
      background: "#111111",
      position: "relative", overflow: "hidden",
      borderTop: "1px solid #1e1e1e",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .mer-contact-inner { padding: 4rem 1.5rem 5rem !important; }
          .mer-contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
      {/* Top yellow bar */}
      <div style={{ height: "5px", background: Y, width: "100%" }} />

      <div className="mer-contact-inner" style={{ padding: "8rem 5rem 9rem", position: "relative" }}>
        {/* Ghost watermark */}
        <div style={{
          position: "absolute", top: "-2rem", right: "3rem",
          fontSize: "260px", fontWeight: 900, lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          pointerEvents: "none", userSelect: "none",
        }}>07</div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3.5rem" }}
        >
          <div style={{ width: "32px", height: "3px", background: Y }} />
          <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.3em", color: Y }}>
            Contact
          </span>
        </motion.div>

        {/* Big heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          style={{
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 900, letterSpacing: "-0.05em",
            lineHeight: 0.88, textTransform: "uppercase",
            color: "#f0ede8", margin: "0 0 6rem",
          }}
        >
          Let's Build<br />
          <span style={{ color: Y }}>Something.</span>
        </motion.h2>

        <div className="mer-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p style={{
              fontSize: "15px", color: "rgba(240,237,232,0.5)",
              lineHeight: 1.8, maxWidth: "340px",
              margin: "0 0 3rem", fontWeight: 300,
            }}>
              Open to new projects, full-time roles, and interesting collaborations. Let's make it happen.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "3rem" }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "44px", height: "44px",
                    border: "1px solid #2a2a2a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#666660", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = Y; e.currentTarget.style.color = Y; e.currentTarget.style.background = `${Y}10`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#666660"; e.currentTarget.style.background = "transparent"; }}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Direct email */}
            {data?.email && (
              <a href={`mailto:${data.email}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "12px",
                  fontSize: "13px", fontWeight: 600,
                  color: "#f0ede8", textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = Y}
                onMouseLeave={(e) => e.currentTarget.style.color = "#f0ede8"}>
                <FaArrowRight size={12} style={{ color: Y }} />
                {data.email}
              </a>
            )}
          </motion.div>

          {/* Right: form (only when web3forms key is configured) */}
          {WEB3FORMS_KEY && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {status === "sent" ? (
              <div style={{
                border: `2px solid ${Y}`,
                padding: "3rem",
                textAlign: "center",
                background: `${Y}08`,
              }}>
                <div style={{
                  fontSize: "3rem", marginBottom: "1rem",
                  color: Y,
                }}>✓</div>
                <h3 style={{ color: "#f0ede8", fontSize: "20px", fontWeight: 800, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                  Message Sent.
                </h3>
                <p style={{ color: "#666660", fontSize: "13px" }}>
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <input
                  type="text" placeholder="Your Name" required
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  style={inputStyle("name")}
                />
                <input
                  type="email" placeholder="Email Address" required
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  style={inputStyle("email")}
                />
                <textarea
                  rows={5} placeholder="Tell me about your project…" required
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle("message"), resize: "none" }}
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    background: Y, color: "#0d0d0d",
                    border: "none", padding: "15px 40px",
                    fontSize: "10px", fontWeight: 900,
                    textTransform: "uppercase", letterSpacing: "0.25em",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.65 : 1,
                    transition: "opacity 0.2s ease",
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = status === "sending" ? "0.65" : "1"; }}
                >
                  {status === "sending" ? "Sending…" : <>Send Message <FaArrowRight size={10} /></>}
                </button>
                {status === "error" && (
                  <p style={{ fontSize: "12px", color: R, margin: 0 }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
          )}
        </div>

        {/* Bottom copyright strip */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "6rem", paddingTop: "2rem",
          borderTop: "1px solid #1e1e1e",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontSize: "10px", color: "#333330", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} {data?.name} — All rights reserved
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy Policy", "Accessibility"].map((link) => (
              <span key={link} style={{ fontSize: "9px", color: "#333330", letterSpacing: "0.08em", cursor: "default" }}>
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
