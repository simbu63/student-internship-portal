import { useState } from "react";
import "./App.css";

const internships = [
  {
    id: 1,
    title: "Web Development Intern",
    company: "Tech Solutions",
    duration: "3 Months",
    location: "Remote",
    description: "Build modern websites using React, HTML, CSS and JavaScript."
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataWorks",
    duration: "2 Months",
    location: "Hybrid",
    description: "Explore data analysis, Python and machine learning."
  },
  {
    id: 3,
    title: "Java Developer Intern",
    company: "CodeTech",
    duration: "3 Months",
    location: "On-site",
    description: "Learn Java programming and software development."
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    company: "Creative Studio",
    duration: "2 Months",
    location: "Remote",
    description: "Design user-friendly interfaces and digital experiences."
  }
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNumber: "",
    internship: ""
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const apiUrl = (
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      ).replace(/\/$/, "");

      const response = await fetch(`${apiUrl}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Application failed.");
      }

      setMessage("Application submitted successfully!");

      setForm({
        name: "",
        email: "",
        rollNumber: "",
        internship: ""
      });
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the backend. Please check the server."
          : error.message
      );
    }
  }

  return (
    <div className="portal">
      <nav className="navbar">
        <a href="#home" className="logo">InternConnect</a>

        <div className="nav-links">
          <a href="#internships">Internships</a>
          <a href="#apply">Apply Now</a>
        </div>
      </nav>

      <header className="hero" id="home">
        <div className="hero-content">
          <span className="badge">YOUR FUTURE STARTS HERE</span>

          <h1>
            Find Your Dream
            <br />
            <span>Internship.</span>
          </h1>

          <p>
            Discover exciting opportunities, develop new skills,
            and take the next step towards your dream career.
          </p>

          <a href="#internships" className="primary-button">
            Explore Internships →
          </a>

          <div className="hero-stats">
            <div>
              <strong>4+</strong>
              <span>Opportunities</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Career Focused</span>
            </div>
            <div>
              <strong>Easy</strong>
              <span>Application</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="art-circle">
            <div className="art-card">
              <span className="art-icon">💼</span>
              <h3>Your Career</h3>
              <p>Starts with one opportunity.</p>
              <div className="art-line"></div>
              <div className="art-line short"></div>
              <span className="art-check">✓ Ready to grow</span>
            </div>
            <span className="floating-icon">🚀</span>
            <span className="floating-star">✦</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section id="internships" className="internships-section">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE OPPORTUNITIES</span>
              <h2>Available Internships</h2>
              <p>Find the right opportunity to start your career.</p>
            </div>
            <span className="count-badge">
              {internships.length} opportunities
            </span>
          </div>

          <div className="internship-grid">
            {internships.map((item) => (
              <article className="internship-card" key={item.id}>
                <div className="card-top">
                  <div className="company-icon">
                    {item.id === 1 ? "⌘" :
                     item.id === 2 ? "◈" :
                     item.id === 3 ? "J" : "✳"}
                  </div>
                  <span className="open-badge">Open</span>
                </div>

                <h3>{item.title}</h3>
                <p className="company-name">{item.company}</p>
                <p className="card-description">{item.description}</p>

                <div className="card-meta">
                  <span>◷ {item.duration}</span>
                  <span>⌖ {item.location}</span>
                </div>

                <button
                  className="outline-button"
                  onClick={() => setSelected(item)}
                >
                  View Details <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div
              className="details-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="close-button"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                ×
              </button>

              <span className="section-label">INTERNSHIP DETAILS</span>
              <h2>{selected.title}</h2>
              <p className="company-name">{selected.company}</p>
              <p>{selected.description}</p>

              <div className="card-meta">
                <span>◷ {selected.duration}</span>
                <span>⌖ {selected.location}</span>
              </div>

              <button
                className="primary-button"
                onClick={() => {
                  setForm({ ...form, internship: selected.title });
                  setSelected(null);
                  document.getElementById("apply").scrollIntoView({
                    behavior: "smooth"
                  });
                }}
              >
                Apply for This Internship →
              </button>
            </div>
          </div>
        )}

        <section id="apply" className="application-section">
          <div className="application-info">
            <span className="section-label">TAKE THE NEXT STEP</span>
            <h2>Start Your Journey</h2>
            <p>
              Complete your application to take the first step towards
              a valuable internship experience.
            </p>

            <div className="benefit-item">
              <span>✓</span>
              Simple and quick application
            </div>

            <div className="benefit-item">
              <span>✓</span>
              Multiple internship opportunities
            </div>

            <div className="benefit-item">
              <span>✓</span>
              Application details stored in MongoDB
            </div>

            <div className="contact-card">
              <span className="contact-icon">✉</span>
              <div>
                <strong>Ready to begin?</strong>
                <p>Submit your details using the form.</p>
              </div>
            </div>
          </div>

          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <div>
                <span className="section-label">APPLICATION FORM</span>
                <h3>Student Details</h3>
              </div>
              <span className="form-icon">📝</span>
            </div>

            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              minLength={2}
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="rollNumber">Roll Number</label>
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              placeholder="Enter your roll number"
              value={form.rollNumber}
              onChange={handleChange}
              required
            />

            <label htmlFor="internship">Choose Internship</label>
            <select
              id="internship"
              name="internship"
              value={form.internship}
              onChange={handleChange}
              required
            >
              <option value="">Select an internship</option>
              {internships.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>

            <button type="submit" className="submit-button">
              Submit Application <span>→</span>
            </button>

            {message && (
              <p
                className={`form-message ${
                  message.includes("successfully") ? "success" : "error"
                }`}
                role="status"
              >
                {message}
              </p>
            )}

            <p className="privacy-note">
              Your application will be sent to the portal backend.
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="footer-logo">InternConnect</a>
        <p>Connecting students with opportunities.</p>
        <div className="footer-divider"></div>
        <span>© 2026 Student Internship Portal. All rights reserved.</span>
      </footer>
    </div>
  );
}