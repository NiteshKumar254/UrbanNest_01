import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      {/* Contact Form */}
      <div>
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          Have a question or feedback? Fill out the form below and we’ll get back to you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-3 rounded-xl"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border p-3 rounded-xl"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full border p-3 rounded-xl"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full border p-3 rounded-xl"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info + Map */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <MapPin className="text-blue-600" />
          <p>Bhopal, India</p>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="text-blue-600" />
          <p>+91 98765 43210</p>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="text-blue-600" />
          <p>support@urbannest.com</p>
        </div>

        {/* Google Maps */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12..."
          width="100%"
          height="250"
          className="rounded-xl shadow"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
