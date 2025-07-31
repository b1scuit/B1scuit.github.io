import './App.css'

function App() {
  return (
    <div className="portfolio">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Peter Holt</h1>
          <p className="hero-subtitle">Engineering Lead @ Admiral Money</p>
          <p className="hero-location">Fareham, England, United Kingdom</p>
          <div className="hero-links">
            <a href="mailto:dysvir@gmail.com" className="hero-link">Contact</a>
            <a href="https://www.linkedin.com/in/bnpeterholt" target="_blank" rel="noopener noreferrer" className="hero-link">LinkedIn</a>
            <a href="https://b1scuit.pro" target="_blank" rel="noopener noreferrer" className="hero-link">Website</a>
            <a href="https://github.com/B1scuit" target="_blank" rel="noopener noreferrer" className="hero-link">GitHub</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="section">
          <h2 className="section-title">About</h2>
          <p className="about-text">
            I am the managing director of my company Debuggin Limited where I am excited to provide product solutions to my clients, 
            whether the product is an internal or customer facing solution, I take pride in making peoples lives easier with exciting 
            new ways and applying new technologies to see how it can help drive business and help people!
          </p>
          <p className="about-text">
            To support this further I also am a senior developer at Admiral Money, a finance provider where I enjoy working with a 
            larger team of absolutely amazing developers!
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">Experience</h2>
          <div className="experience-grid">
            <div className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">Engineering Lead</h3>
                <span className="experience-period">Jan 2023 - Present</span>
              </div>
              <p className="experience-company">Admiral Money</p>
              <p className="experience-location">Cardiff, Wales, United Kingdom</p>
            </div>
            
            <div className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">Senior Software Engineer</h3>
                <span className="experience-period">Jan 2022 - Jan 2023</span>
              </div>
              <p className="experience-company">Admiral Money</p>
              <p className="experience-location">United Kingdom</p>
            </div>
            
            <div className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">Managing Director</h3>
                <span className="experience-period">Jun 2021 - Jun 2024</span>
              </div>
              <p className="experience-company">Debuggin Ltd</p>
              <p className="experience-location">Fareham, England, United Kingdom</p>
            </div>
            
            <div className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">Technology Lead</h3>
                <span className="experience-period">Dec 2018 - Jan 2022</span>
              </div>
              <p className="experience-company">DocHQ</p>
              <p className="experience-location">Eastleigh, Hampshire, United Kingdom</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3 className="skill-category-title">Core Skills</h3>
              <div className="skill-tags">
                <span className="skill-tag">Web Development</span>
                <span className="skill-tag">Web Design</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">Software Engineering</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">Languages</h3>
              <div className="skill-tags">
                <span className="skill-tag">English (Native)</span>
                <span className="skill-tag">Russian (Professional)</span>
                <span className="skill-tag">Japanese (Limited)</span>
                <span className="skill-tag">Italian (Elementary)</span>
                <span className="skill-tag">French (Limited)</span>
                <span className="skill-tag">Chinese (Elementary)</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Education & Certifications</h2>
          <div className="education-grid">
            <div className="education-item">
              <h3 className="education-title">Bachelor of Science in Computer Software Engineering</h3>
              <p className="education-school">University of Portsmouth</p>
              <p className="education-period">2016 - 2017</p>
            </div>
            
            <div className="education-item">
              <h3 className="education-title">Foundation Degree in Computer Software Engineering</h3>
              <p className="education-school">University of Sussex</p>
              <p className="education-period">2013 - 2015</p>
            </div>
            
            <div className="education-item">
              <h3 className="education-title">Microsoft Certified Technology Specialist</h3>
              <p className="education-school">ZenOS IT Academy</p>
              <p className="education-period">2009 - 2010</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Achievements</h2>
          <div className="achievements">
            <div className="achievement-item">
              <span className="achievement-badge">🏆</span>
              <span className="achievement-text">World Skills Bronze Medallist</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2024 Peter Holt. All rights reserved.</p>
          <div className="footer-links">
            <a href="tel:+447784830785" className="footer-link">+44 7784 830785</a>
            <a href="mailto:dysvir@gmail.com" className="footer-link">dysvir@gmail.com</a>
            <a href="https://medium.com/@B1scuit" target="_blank" rel="noopener noreferrer" className="footer-link">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
