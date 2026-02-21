import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    bill: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("✅ Thank you! We will contact you within 48 hours.");
      setFormData({ name: "", email: "", phone: "", city: "", message: "" });
    } else {
      alert("❌ Something went wrong.");
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Get Exclusive Solar & Backup Power Quotes</h1>
          <p>Compare top installers in your area. Free & no obligation.</p>
          <a href="#lead-form" className="cta-button">Get My Quotes</a>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="form-section">
        <form onSubmit={handleSubmit}>
          <h2>Claim Your Solar Quote Today</h2>
          <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          <input name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
          <input name="city" placeholder="City" required value={formData.city} onChange={handleChange} />
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
              <span style={{ fontSize: '18px', marginRight: '6px' }}>R</span>
              <input
                name="bill"
                placeholder="Monthly Electricity Bill"
                required
                value={formData.bill}
                onChange={handleChange}
                type="number"
                min="0"
                style={{ flex: 1 }}
              />
            </div>
          <textarea name="message" placeholder="Tell us what you need (optional)" value={formData.message} onChange={handleChange} />
          <button type="submit">Get My Quotes</button>
        </form>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Verified solar installers near you</li>
          <li>✅ Fast response, secure leads</li>
          <li>✅ Transparent pricing & invoices</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="card">
            <p>"Got 3 quotes in one day! Excellent service."</p>
            <span>- Thabo, Johannesburg</span>
          </div>
          <div className="card">
            <p>"Professional installers and clear pricing."</p>
            <span>- Lerato, Cape Town</span>
          </div>
        </div>
      </section>
    </main>
  );
}
