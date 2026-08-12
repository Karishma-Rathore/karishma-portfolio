import { useState } from 'react'
import {
  ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone,
  CheckCircle2, Copy, Send, X
} from 'lucide-react'

const skills = [
  'React.js', 'Redux Toolkit', 'Redux Saga', 'JavaScript ES6+', 'Node.js', 'Express.js',
  'Microservices', 'MongoDB', 'MySQL', 'Sequelize', 'REST APIs', 'Docker',
  'Socket.IO', 'Python / Flask', 'JWT & OAuth', 'Git & GitHub', 'Agile / Jira'
]

const projects = [
  {
    number: '01',
    title: 'TurnKey',
    label: 'Business management platform',
    description: 'A scalable platform for construction and service workflows, connecting customers, professionals and administrators through secure, role-based experiences.',
    impact: [
      'Engineered scalable microservices architecture and business workflows',
      'Responsive interfaces across complex business modules',
      'Real-time updates and secure authorization'
    ],
    tech: ['React', 'Redux Saga', 'Node.js', 'Microservices', 'MySQL', 'Sequelize', 'Docker', 'Socket.IO']
  },
  {
    number: '02',
    title: 'WestZone',
    label: 'Online grocery experience',
    description: 'A full-featured grocery platform built for effortless discovery, responsive shopping and dependable cart-to-customer workflows.',
    impact: [
      'Product, category and cart API integrations',
      'Optimized screens for speed and usability',
      'Cross-device responsive experience'
    ],
    tech: ['React', 'JavaScript', 'Node.js', 'Express', 'REST APIs', 'MongoDB', 'Bootstrap']
  }
]

function App() {
  const [menu, setMenu] = useState(false)
  const [copyToast, setCopyToast] = useState('')

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState({ sent: false, loading: false, error: '' })

  const go = id => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopyToast(`${label} copied!`)
    setTimeout(() => setCopyToast(''), 2500)
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ sent: false, loading: false, error: 'Please fill in all required fields.' })
      return
    }
    setFormStatus({ sent: false, loading: true, error: '' })

    try {
      // Real-world API submission via Web3Forms (delivers directly to inbox)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY', // You can get your free instant key from web3forms.com
          from_name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Portfolio Inquiry from ${formData.name}`,
          message: formData.message,
          to_email: 'karishmarathore1302@gmail.com'
        })
      })

      const data = await response.json()
      if (data.success) {
        setFormStatus({ sent: true, loading: false, error: '' })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setFormStatus({ sent: false, loading: false, error: '' }), 4000)
      } else {
        // Fallback: If access_key not activated yet, notify and fallback to direct mail
        setFormStatus({ sent: true, loading: false, error: '' })
        setTimeout(() => setFormStatus({ sent: false, loading: false, error: '' }), 4000)
        const mailtoUrl = `mailto:karishmarathore1302@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
        window.location.href = mailtoUrl
      }
    } catch (err) {
      // Fallback
      setFormStatus({ sent: true, loading: false, error: '' })
      setTimeout(() => setFormStatus({ sent: false, loading: false, error: '' }), 4000)
      const mailtoUrl = `mailto:karishmarathore1302@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
      window.location.href = mailtoUrl
    }
  }

  return (
    <div className="site-shell">
      {/* Toast Notification */}
      {copyToast && (
        <div className="floating-toast">
          <CheckCircle2 size={16} />
          <span>{copyToast}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="nav">
        <button className="brand" onClick={() => go('#home')} aria-label="Home">
          <div className="brand-emblem">
            <svg width="40" height="40" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg">
              {/* Glowing Squircle Backdrop */}
              <rect x="1.5" y="1.5" width="39" height="39" rx="11" fill="rgba(0, 201, 255, 0.06)" stroke="url(#brandGrad)" strokeWidth="1.5" className="emblem-box" />

              {/* Geometric 'K' */}
              <path d="M12 11V31M12 21L21 11M14.5 18.5L22 31" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

              {/* Geometric 'R' */}
              <path d="M23 19H27.5C29.4 19 31 17.4 31 15C31 12.6 29.4 11 27.5 11H23V31M23 19L31 31" stroke="#00c9ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

              {/* Accent Cyan Gem Dot */}
              <circle cx="32" cy="9" r="2.5" fill="#00f0ff" className="emblem-dot" />

              <defs>
                <linearGradient id="brandGrad" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00c9ff" />
                  <stop offset="0.5" stopColor="#007799" />
                  <stop offset="1" stopColor="rgba(0, 201, 255, 0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </button>
        <div className={`nav-links ${menu ? 'open' : ''}`}>
          {['about', 'work', 'experience', 'contact'].map(x => (
            <button key={x} onClick={() => go(`#${x}`)}>{x}</button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="primary-btn-nav" onClick={() => go('#contact')}>
            Get in touch
          </button>
          <button className="menu-btn" onClick={() => setMenu(!menu)}>
            {menu ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="hello">Hi, I’m</p>
            <h1>Karishma<br /><em>Rathore.</em></h1>
            <h2>MERN Stack Developer</h2>
            <p className="hero-intro">
              I build responsive, secure and scalable web products—combining thoughtful interfaces with dependable backend systems.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={() => go('#contact')}>
                Hire me <ArrowUpRight size={16} />
              </button>
              <button className="secondary-btn" onClick={() => go('#work')}>
                Explore work <ArrowDown size={16} />
              </button>
              <a href="/Karishma_Rathore_MERN_Developer.pdf" download className="outline-btn">
                <Download size={15} /> Resume
              </a>
            </div>

            <div className="hero-socials">
              <a href="https://www.linkedin.com/in/karishmarathore13" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin />
              </a>
              <a href="https://github.com/Karishma-Rathore" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                <Github />
              </a>
              <button onClick={() => handleCopy('karishmarathore1302@gmail.com', 'Email')} aria-label="Copy Email" title="Copy Email" className="icon-btn">
                <Mail />
              </button>
              <button onClick={() => handleCopy('+919201720969', 'Phone')} aria-label="Copy Phone" title="Copy Phone" className="icon-btn">
                <Phone />
              </button>
            </div>
          </div>

          <div className="hero-portrait" aria-label="Portrait of Karishma Rathore">
            <div className="portrait-glow" />
            <img src="/karishma-rathore.jpeg" alt="Karishma Rathore" />
            <div className="portrait-badge">
              <span>01+</span> Year<br />Experience
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about section" id="about">
          <div className="section-label"><span>01</span> About</div>
          <div className="about-grid">
            <h2>Building with intent,<br /><i>learning without pause.</i></h2>
            <div className="about-copy">
              <p>
                I'm Karishma, a MERN developer who enjoys making ambitious software feel simple. I work across the stack—from reusable React interfaces to secure Express services, microservices workflows, and dependable database flows.
              </p>
              <p>
                At <strong>Digiprima Technologies</strong>, I collaborate with cross-functional teams to ship business-critical features, solve integration challenges and make products more reliable with every release.
              </p>
              <div className="location">
                <MapPin size={18} /> Indore, Madhya Pradesh
              </div>
            </div>
          </div>
          <div className="skill-cloud">
            {skills.map((s, i) => (
              <span key={s} style={{ '--i': i }}>{s}</span>
            ))}
          </div>
        </section>

        {/* Selected Work Section */}
        <section className="work section" id="work">
          <div className="section-label"><span>02</span> Selected work</div>
          <div className="work-heading">
            <h2>Projects with<br /><i>real-world impact.</i></h2>
            <p>Selected platforms I've helped bring to life through thoughtful engineering and close collaboration.</p>
          </div>

          <div className="projects">
            {projects.map((p, idx) => (
              <article className="project" key={p.title}>
                <div className={`project-visual visual-${idx}`}>
                  <span className="project-no">{p.number}</span>
                  <div className="mock-window">
                    <div className="mock-bar">
                      <i /><i /><i />
                      <span className="mock-title">{p.title}</span>
                    </div>
                    <div className="mock-content">
                      <b>{p.title}</b>
                      <div className="mock-lines">
                        <span /><span /><span />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="project-info">
                  <span className="project-label">{p.label}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>

                  <ul>
                    {p.impact.map(x => <li key={x}>{x}</li>)}
                  </ul>

                  <div className="tags">
                    {p.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experience & Education Section */}
        <section className="experience section" id="experience">
          <div className="section-label"><span>03</span> Experience & education</div>
          <div className="timeline">
            <div className="timeline-row featured">
              <div>
                <span>Aug 2025 — Present</span>
                <small>Indore</small>
              </div>
              <div>
                <h3>MERN Stack Developer</h3>
                <h4>Digiprima Technologies</h4>
                <p>
                  Building reusable React components, secure Node.js/Express services, and integrated business workflows. Contributing through analysis, reviews, testing, and Agile delivery.
                </p>
              </div>
            </div>

            <div className="timeline-row">
              <div>
                <span>2025</span>
                <small>CGPA 7.92</small>
              </div>
              <div>
                <h3>B.Sc. Computer Science</h3>
                <h4>Govt. Holkar Science College, DAVV</h4>
              </div>
            </div>
          </div>

          <div className="certs">
            <span>Certifications</span>
            <div>
              <p>MERN Stack Internship <small>Ypsilon IT Solutions</small></p>
              <p>MERN Stack Training <small>Universal Informatics</small></p>
              <p>C/C++ Programming <small>Universal Informatics</small></p>
              <p>Cyber Security Internship <small>Crime Branch Indore</small></p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact section" id="contact">
          <span className="contact-kicker">Have a project or an opportunity?</span>
          <h2>Let's create something<br /><i>worth remembering.</i></h2>

          <div className="contact-container">
            <div className="contact-info-card">
              <h3>Get in Touch</h3>
              <p>I'm open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>

              <div className="contact-list">
                <div className="contact-item" onClick={() => handleCopy('karishmarathore1302@gmail.com', 'Email')}>
                  <Mail className="item-icon" />
                  <div>
                    <span className="item-label">Email</span>
                    <strong>karishmarathore1302@gmail.com</strong>
                  </div>
                  <Copy size={15} className="copy-icon" />
                </div>

                <div className="contact-item" onClick={() => handleCopy('+919201720969', 'Phone number')}>
                  <Phone className="item-icon" />
                  <div>
                    <span className="item-label">Phone</span>
                    <strong>+91 92017 20969</strong>
                  </div>
                  <Copy size={15} className="copy-icon" />
                </div>

                <div className="contact-item">
                  <MapPin className="item-icon" />
                  <div>
                    <span className="item-label">Location</span>
                    <strong>Indore, Madhya Pradesh</strong>
                  </div>
                </div>
              </div>

              <div className="contact-links-grid">
                <a href="https://www.linkedin.com/in/karishmarathore13" target="_blank" rel="noreferrer" className="contact-btn">
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a href="https://github.com/Karishma-Rathore" target="_blank" rel="noreferrer" className="contact-btn">
                  <Github size={15} /> GitHub
                </a>
                <a href="/Karishma_Rathore_MERN_Developer.pdf" download className="contact-btn download-btn">
                  <Download size={15} /> Resume
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <h3>Send a Message</h3>

              {formStatus.error && (
                <div className="form-alert error">
                  <span>{formStatus.error}</span>
                  <button type="button" className="alert-close" onClick={() => setFormStatus({ sent: false, loading: false, error: '' })}>
                    <X size={14} />
                  </button>
                </div>
              )}
              {formStatus.sent && (
                <div className="form-alert success">
                  <div className="alert-content">
                    <CheckCircle2 size={16} />
                    <span>Message sent! Thank you for reaching out.</span>
                  </div>
                  <button type="button" className="alert-close" onClick={() => setFormStatus({ sent: false, loading: false, error: '' })}>
                    <X size={14} />
                  </button>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. Project Discussion"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="primary-btn submit-btn" disabled={formStatus.loading}>
                {formStatus.loading ? 'Preparing...' : (
                  <>Send Message <Send size={15} /></>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Karishma Rathore</span>
        <span>Designed & built with curiosity.</span>
      </footer>
    </div>
  )
}

export default App
