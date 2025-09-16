import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const email = "support@urbannest.com";
  const phone = "+91 8987155027";

  // 🔹 Office Address
  const officeAddress = "H/No. 128 IBD Raisina, Patel Nagar, Bhopal-462022, MP";

  // 🔹 Google Maps query (lat,long)
  const officeMapQuery = "23.24366719983131, 77.50583635928234";

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-[#413C4D] ">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"
        >
          <div className="md:flex">
            {/* Left: Contact details */}
            <div className="md:w-1/2 p-10 space-y-8">
              <motion.div variants={fadeUp} transition={{ delay: 0.2 }}>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                  Contact Urban Nest
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Have a question, feedback, or want to partner with us? <br />
                  Reach out — we’d love to help!
                </p>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={fadeUp}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 group hover:scale-[1.02] transition"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-md group-hover:shadow-lg transition">
                  <Mail className="w-6 h-6 text-blue-600 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Mail us at</h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-600 hover:underline break-all"
                  >
                    {email}
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                variants={fadeUp}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4 group hover:scale-[1.02] transition"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 shadow-md group-hover:shadow-lg transition">
                  <Phone className="w-6 h-6 text-green-600 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Call / WhatsApp</h3>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-green-600 hover:underline"
                  >
                    {phone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon–Sat, 10:00 — 18:00</p>
                </div>
              </motion.div>

              {/* Office */}
              <motion.div
                variants={fadeUp}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4 group hover:scale-[1.02] transition"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 shadow-md group-hover:shadow-lg transition">
                  <MapPin className="w-6 h-6 text-purple-600 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Office</h3>
                  <address className="not-italic text-gray-600">{officeAddress}</address>
                </div>
              </motion.div>

              {/* Opening hours */}
              <motion.div
                variants={fadeUp}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4 group hover:scale-[1.02] transition"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-md group-hover:shadow-lg transition">
                  <Clock className="w-6 h-6 text-yellow-600 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Office Hours</h3>
                  <ul className="text-gray-600">
                    <li>Mon – Fri: 10:00 AM — 6:00 PM</li>
                    <li>Saturday: 10:00 AM — 2:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right: Map with Address Card above */}
            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.7 }}
              className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col justify-center"
            >
              {/* Address Card */}
              <div className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 mb-5 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-900">Urban Nest Office</h3>
                <p className="text-gray-600 mt-2">{officeAddress}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${officeMapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md hover:shadow-xl"
                >
                  🚗 Get Directions
                </a>
              </div>

              {/* Google Map */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-[1.01]">
                <iframe
                  title="Urban Nest Office Location"
                  src={`https://www.google.com/maps?q=${officeMapQuery}&output=embed`}
                  className="w-full h-80 md:h-[400px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 ring-1 ring-black/10 rounded-2xl pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Small CTA */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.9 }}
          className="text-center mt-10"
        >
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            ⬅ Back to Home
          </a>
        </motion.div>
      </section>
    </main>
  );
}
