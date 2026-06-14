import React, { useState } from "react";

/* ============================================================
   CONFIG — Edit everything here. No need to touch the JSX below.
   ============================================================ */
const CONFIG = {
  agency: {
    name: "TalentBridge Staffing",
    logoText: "TB", // shown in the nav badge if no logo image
    tagline: "Workforce solutions, made simple.",
  },

  nav: {
    links: [
      { label: "Industries", href: "#industries" },
      { label: "Why us", href: "#why-us" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "Get in touch",
    ctaHref: "#contact",
  },

  hero: {
    title: "The right people. Right when you need them.",
    subtitle:
      "We connect ambitious companies with exceptional talent across engineering, healthcare, logistics, and beyond — fast.",
    popularLabel: "Popular:",
    popularRoles: ["Software Engineer", "Nurse", "Warehouse Lead", "Accountant"],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    stats: [
      { value: "98%", label: "Placement success rate" },
      { value: "48 hrs", label: "Average time to shortlist" },
    ],
    primaryCta: { label: "Find talent", href: "#contact" },
    secondaryCta: { label: "View industries", href: "#industries" },
  },

  industries: {
    badge: "Industries",
    title: "Specialized staffing across every sector",
    subtitle:
      "Deep industry expertise means we understand the roles, the skills, and the people you need.",
    items: [
      {
        icon: "ti-code",
        title: "Technology",
        description: "Engineers, data scientists, product & design talent.",
        color: "blue",
      },
      {
        icon: "ti-heart",
        title: "Healthcare",
        description: "Nurses, clinicians, and allied health professionals.",
        color: "green",
      },
      {
        icon: "ti-truck",
        title: "Logistics",
        description: "Warehouse, drivers, and supply chain operators.",
        color: "amber",
      },
      {
        icon: "ti-calculator",
        title: "Finance",
        description: "Accountants, analysts, and compliance experts.",
        color: "rose",
      },
      {
        icon: "ti-helmet",
        title: "Construction",
        description: "Skilled trades, site managers, and engineers.",
        color: "blue",
      },
      {
        icon: "ti-shopping-bag",
        title: "Retail",
        description: "Store associates, managers, and seasonal teams.",
        color: "green",
      },
      {
        icon: "ti-school",
        title: "Education",
        description: "Teachers, tutors, and administrative staff.",
        color: "amber",
      },
      {
        icon: "ti-building-factory-2",
        title: "Manufacturing",
        description: "Operators, technicians, and plant supervisors.",
        color: "rose",
      },
    ],
  },

  whyUs: {
    badge: "Why us",
    title: "Built for speed, trusted for quality",
    subtitle: "Three reasons companies and candidates choose us.",
    items: [
      {
        icon: "ti-rocket",
        title: "Fast turnaround",
        description: "Most roles are shortlisted within 48 hours of a confirmed brief.",
      },
      {
        icon: "ti-shield-check",
        title: "Vetted talent",
        description: "Every candidate is screened, reference-checked, and skills-verified.",
      },
      {
        icon: "ti-users",
        title: "Dedicated support",
        description: "A single point of contact who knows your business and your needs.",
      },
    ],
  },

  testimonials: {
    badge: "Testimonials",
    title: "What our clients say",
    items: [
      {
        quote:
          "They filled three critical engineering roles in under a week. The quality of candidates was outstanding.",
        name: "Asha Patel",
        role: "Head of Engineering, NovaTech",
      },
      {
        quote:
          "Reliable, responsive, and they genuinely understand our hiring needs across multiple sites.",
        name: "Marcus Chen",
        role: "Operations Director, Brightline Logistics",
      },
    ],
  },

  contact: {
    badge: "Contact",
    title: "Let's find your next hire",
    subtitle: "Tell us what you need and we'll get back to you within one business day.",
    contactPerson: {
      name: "Priya Sharma",
      role: "Client Relations Manager",
      email: "priya@talentbridge.com",
      phone: "+1 (555) 123-4567",
    },
    address: "123 Market Street, Suite 400, San Francisco, CA 94105",
    formNote:
      "This form is for display only — connect it to a form service (e.g. Formspree, Getform) or your email to receive submissions.",
  },

  footer: {
    copyrightName: "TalentBridge Staffing",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    socials: [
      { icon: "ti-brand-linkedin", href: "#", label: "LinkedIn" },
      { icon: "ti-brand-x", href: "#", label: "X" },
      { icon: "ti-brand-facebook", href: "#", label: "Facebook" },
    ],
  },
};

/* ============================================================
   Color ramps for industry icons (light + dark mode friendly)
   ============================================================ */
const COLOR_RAMPS = {
  blue: { bg: "#dbeafe", fg: "#2563eb" },
  green: { bg: "#dcfce7", fg: "#16a34a" },
  amber: { bg: "#fef3c7", fg: "#d97706" },
  rose: { bg: "#fee2e2", fg: "#e11d48" },
};

/* ============================================================
   Reusable bits
   ============================================================ */
function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function Section({ id, children, alt }) {
  return (
    <section id={id} className={`section${alt ? " section-alt" : ""}`}>
      <div className="container">{children}</div>
    </section>
  );
}

/* ============================================================
   Nav
   ============================================================ */
function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <span className="brand-badge">{CONFIG.agency.logoText}</span>
          <span className="brand-name">{CONFIG.agency.name}</span>
        </a>

        <nav className="nav-links nav-links-desktop">
          {CONFIG.nav.links.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href={CONFIG.nav.ctaHref} className="btn btn-primary btn-sm">
            {CONFIG.nav.ctaLabel}
          </a>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <i className={`ti ${open ? "ti-x" : "ti-menu-2"}`} aria-hidden="true"></i>
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          {CONFIG.nav.links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href={CONFIG.nav.ctaHref}
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            {CONFIG.nav.ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero() {
  const h = CONFIG.hero;
  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="hero-text">
          <h1>{h.title}</h1>
          <p className="hero-subtitle">{h.subtitle}</p>

          <div className="hero-ctas">
            <a href={h.primaryCta.href} className="btn btn-primary">
              {h.primaryCta.label}
            </a>
            <a href={h.secondaryCta.href} className="btn btn-secondary">
              {h.secondaryCta.label}
            </a>
          </div>

          <div className="popular-roles">
            <span className="popular-label">{h.popularLabel}</span>
            {h.popularRoles.map((r) => (
              <span key={r} className="role-pill">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-image-wrap">
          <img src={h.image} alt="Team working together" className="hero-image" />
          <div className="stat-card stat-card-1">
            <i className="ti ti-trending-up" aria-hidden="true"></i>
            <div>
              <div className="stat-value">{h.stats[0].value}</div>
              <div className="stat-label">{h.stats[0].label}</div>
            </div>
          </div>
          <div className="stat-card stat-card-2">
            <i className="ti ti-clock" aria-hidden="true"></i>
            <div>
              <div className="stat-value">{h.stats[1].value}</div>
              <div className="stat-label">{h.stats[1].label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Industries
   ============================================================ */
function Industries() {
  const ind = CONFIG.industries;
  return (
    <Section id="industries">
      <div className="section-head">
        <Badge>{ind.badge}</Badge>
        <h2>{ind.title}</h2>
        <p className="section-subtitle">{ind.subtitle}</p>
      </div>

      <div className="grid grid-4">
        {ind.items.map((item) => {
          const ramp = COLOR_RAMPS[item.color] || COLOR_RAMPS.blue;
          return (
            <div className="card" key={item.title}>
              <div
                className="icon-box"
                style={{ background: ramp.bg, color: ramp.fg }}
              >
                <i className={`ti ${item.icon}`} aria-hidden="true"></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ============================================================
   Why Us
   ============================================================ */
function WhyUs() {
  const w = CONFIG.whyUs;
  return (
    <Section id="why-us" alt>
      <div className="section-head">
        <Badge>{w.badge}</Badge>
        <h2>{w.title}</h2>
        <p className="section-subtitle">{w.subtitle}</p>
      </div>

      <div className="grid grid-3">
        {w.items.map((item) => (
          <div className="card card-center" key={item.title}>
            <div className="icon-box icon-box-lg">
              <i className={`ti ${item.icon}`} aria-hidden="true"></i>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   Testimonials
   ============================================================ */
function Testimonials() {
  const t = CONFIG.testimonials;
  return (
    <Section id="testimonials">
      <div className="section-head">
        <Badge>{t.badge}</Badge>
        <h2>{t.title}</h2>
      </div>

      <div className="grid grid-2">
        {t.items.map((item) => (
          <div className="card quote-card" key={item.name}>
            <i className="ti ti-quote quote-icon" aria-hidden="true"></i>
            <p className="quote-text">{item.quote}</p>
            <div className="quote-author">
              <div className="quote-name">{item.name}</div>
              <div className="quote-role">{item.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   Contact
   ============================================================ */
function Contact() {
  const c = CONFIG.contact;
  return (
    <Section id="contact" alt>
      <div className="section-head">
        <Badge>{c.badge}</Badge>
        <h2>{c.title}</h2>
        <p className="section-subtitle">{c.subtitle}</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info card">
          <h3>{c.contactPerson.name}</h3>
          <p className="contact-role">{c.contactPerson.role}</p>

          <a className="contact-line" href={`mailto:${c.contactPerson.email}`}>
            <i className="ti ti-mail" aria-hidden="true"></i>
            {c.contactPerson.email}
          </a>
          <a className="contact-line" href={`tel:${c.contactPerson.phone}`}>
            <i className="ti ti-phone" aria-hidden="true"></i>
            {c.contactPerson.phone}
          </a>
          <div className="contact-line">
            <i className="ti ti-map-pin" aria-hidden="true"></i>
            {c.address}
          </div>
        </div>

        <form
          className="contact-form card"
          onSubmit={(e) => e.preventDefault()}
        >
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@company.com" required />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us what roles you're looking to fill..."
              required
            ></textarea>
          </label>
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
          <p className="form-note">{c.formNote}</p>
        </form>
      </div>
    </Section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  const f = CONFIG.footer;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-badge">{CONFIG.agency.logoText}</span>
          <span className="brand-name">{CONFIG.agency.name}</span>
        </div>

        <div className="footer-links">
          {f.links.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="footer-socials">
          {f.socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label}>
              <i className={`ti ${s.icon}`} aria-hidden="true"></i>
            </a>
          ))}
        </div>
      </div>
      <div className="container">
        <p className="footer-copy">
          © {year} {f.copyrightName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   App
   ============================================================ */
export default function App() {
  return (
    <div className="page">
      <Nav />
      <Hero />
      <Industries />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
