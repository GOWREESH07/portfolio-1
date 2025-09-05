import React, { useRef, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDatabase, FaHtml5, FaCss3Alt, FaLinkedin, FaGithub
} from "react-icons/fa";
import { SiTypescript, SiMongodb, SiRedux, SiDocker } from "react-icons/si";
import "./App.css";

/* ---------- Data ---------- */
const skills = [
  { name: "React", icon: <FaReact color="#61dafb" size={40} /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178c6" size={40} /> },
  { name: "Redux", icon: <SiRedux color="#764abc" size={40} /> },
  { name: "Node.js", icon: <FaNodeJs color="#8cc84b" size={40} /> },
  { name: "MongoDB", icon: <SiMongodb color="#4db33d" size={40} /> },
  { name: "Docker", icon: <SiDocker color="#2496ed" size={40} /> },
  { name: "Python", icon: <FaPython color="#3776ab" size={40} /> },
  { name: "SQL", icon: <FaDatabase color="#f59e0b" size={40} /> },
  { name: "HTML5", icon: <FaHtml5 color="#e34c26" size={40} /> },
  { name: "CSS3", icon: <FaCss3Alt color="#264de4" size={40} /> },
  { name: "Git", icon: <FaGitAlt color="#f34f29" size={40} /> },
];

const projects = [
  { title: "CodeCanvas Studio", desc: "Realtime collaborative whiteboard with draggable React widgets and live previews.", img: "/project1.png" },
  { title: "PulseBoard Analytics", desc: "Modular KPI dashboard with CSV ingestion, theming, and role permissions.", img: "/project2.png" },
  { title: "Nimbus Tasks", desc: "Offline-first Kanban PWA with keyboard nav and optimistic sync.", img: "/project3.png" },
  { title: "Saffron Recipes", desc: "Remix recipes via flavor graph and pantry-based substitutions.", img: "/project4.png" },
  { title: "TrailMate", desc: "Route planner with elevation, GPX imports, and sharing.", img: "/project5.png" },
];

/* ---------- Components ---------- */

/* Viewport progress bar */
function ProgressBar() {
  const { scrollYProgress } = useScroll(); // viewport tracking only
  return <motion.div className="progress-bar" style={{ scaleY: scrollYProgress }} />;
}

/* First page: About as text-only with big type, plus intro and socials */
function SectionAboutFirst() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const y1 = useTransform(scrollYProgress, [0,1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0,1], [0, -120]);

  return (
    <section id="about" ref={ref} className="page">
      <motion.div className="hero-bg hero-layer-1" style={{ y: y1 }} />
      <motion.div className="hero-bg hero-layer-2" style={{ y: y2 }} />

      <div className="page-inner about-first">
        {/* Intro side */}
        <div className="about-intro">
          <motion.h1
            className="display"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <span className="brand">MUTHU KUMARAN</span>
            <br />
            Builds useful software
          </motion.h1>
          <motion.p className="lead" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Front‑end focused engineer crafting interactive, accessible, and performant web apps.
          </motion.p>

          <div className="hero-links">
            <a href="#skills" className="btn">Skills</a>
            <a href="#projects" className="btn ghost">Projects</a>
            <a href="#contact" className="btn ghost">Contact</a>
          </div>
          <div className="socials">
            <a href="https://linkedin.com/in/yourprofile" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
            <a href="https://github.com/yourusername" aria-label="GitHub"><FaGithub size={22} /></a>
          </div>
        </div>

        {/* Profile image side */}
        <motion.div
          className="about-image-wrap"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={process.env.PUBLIC_URL + "/about.png"}
            alt="Profile"
            className="about-hero-image"
          />
        </motion.div>
      </div>
    </section>
  );
}

function SectionSkills() {
  return (
    <section id="skills" className="page">
      <div className="page-inner">
        <h2 className="display-sm">Skills & Tools</h2>
        <p className="lead">Hover to reveal focus areas; click to pin details.</p>

        <div className="skill-grid-lg">
          {skills.map((s, idx) => (
            <motion.button
              key={s.name}
              className="skill-tile"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="icon">{s.icon}</div>
              <div className="label">{s.name}</div>
              <motion.div className="hint" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                Proficiency: Intermediate–Advanced
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionProjects() {
  return (
    <section id="projects" className="page">
      <div className="page-inner">
        <h2 className="display-sm">Projects</h2>
        <p className="lead">Five selected projects with images; click to expand details.</p>

        <div className="cards-row">
          {projects.map((p, i) => (
            <motion.details
              key={p.title}
              className="project-card-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08 }}
            >
              <summary>
                <span className="project-title">{p.title}</span>
                <span className="chev">▾</span>
              </summary>
              <div className="project-media">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="project-body">
                <p>{p.desc}</p>
                <ul className="bullets">
                  <li>Tech: React, TypeScript, Node, MongoDB</li>
                  <li>Focus: UX, reliability, performance</li>
                </ul>
                <a className="btn small" href="#" onClick={(e)=>e.preventDefault()}>Case Study</a>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionContact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const mailtoHref = useMemo(() => {
    const to = "youremail@example.com";
    const subject = encodeURIComponent(values.subject || "Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [values]);

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  return (
    <section id="contact" className="page">
      <div className="page-inner">
        <h2 className="display-sm">Contact</h2>
        <p className="lead">Open to full‑time roles and internships.</p>

        <motion.form
          className="contact-form"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          onSubmit={(e) => { e.preventDefault(); window.location.href = mailtoHref; }}
        >
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={values.name} onChange={onChange} placeholder="Your full name" required />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={values.email} onChange={onChange} placeholder="you@example.com" required />
          </div>
          <div className="form-row">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" value={values.subject} onChange={onChange} placeholder="Hiring inquiry, collaboration..." />
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={values.message} onChange={onChange} placeholder="Write a short message..." />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">Send Email</button>
            <a className="btn ghost" href={mailtoHref}>Open in Email App</a>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ProgressBar />
      <main className="snap-container">
        <SectionAboutFirst />
        <SectionSkills />
        <SectionProjects />
        <SectionContact />
      </main>
    </>
  );
}
