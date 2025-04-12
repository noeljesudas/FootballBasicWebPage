"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Solutions", id: "solutions" },
  { label: "Why It Matters", id: "why" },
  { label: "Join", id: "join" },
  { label: "Contact", id: "contact" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showModal, setShowModal] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionOffsets = navItems.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, offset: Infinity };
        const rect = el.getBoundingClientRect();
        return { id, offset: Math.abs(rect.top) };
      });

      const closestSection = sectionOffsets.reduce(
        (prev, curr) => (curr.offset < prev.offset ? curr : prev),
        { id: "home", offset: Infinity }
      );

      setActiveSection(closestSection.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen text-white font-sans overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
        className={`fixed w-full top-0 z-50 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-black/90 py-3 shadow-md" : "bg-black/70 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => scrollToSection("home")}
        className="flex items-center space-x-3 cursor-pointer"
      >
        <img src="/logo.png" alt="Company Logo" className="h-10 w-10 rounded-full object-cover shadow-md" />
        <span className="text-2xl font-extrabold tracking-wide text-white-400">
    Analytics in Football
      </span>
      </motion.div>

          <ul className="flex space-x-6 text-sm font-medium text-white/90">
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative group cursor-pointer ${
                  activeSection === item.id ? "text-yellow-400" : ""
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <span className="transition-colors duration-300">
                  {item.label}
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-yellow-400 transition-all duration-300 ease-in-out rounded-full ${
                    activeSection === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex flex-col justify-center items-center text-center px-6 pt-20 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/football-ground.jpg)',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          className="bg-black/60 p-10 rounded-2xl shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Revolutionizing Football with AI
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mt-4 max-w-2xl mx-auto text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Empowering grassroots and professional leagues with real-time match
            insights and referee support.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Button className="mt-8 px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-green-400 to-blue-600 shadow-lg hover:scale-105 transition-transform duration-300">
              Explore Our Solutions
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Solutions Section */}
      <section
        id="solutions"
        className="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-center"
      >
        <motion.h2
          className="text-4xl font-bold text-white-400 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Our AI Models
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {[
            {
              title: "MAANVI",
              desc: "MAANVI (Motion Artificial Analysis N Visual Inference) delivers precision match and player analytics to empower Tier 1 and lower leagues.",
              img: "/maanvi.jpg",
            },
            {
              title: "VISION+",
              desc: "VISION+ provides real-time foul and decision detection under 5 seconds—bridging the flaws of traditional VAR.",
              img: "/Vision+.jpg",
            },
          ].map((model, index) => (
            <motion.div
              key={model.title}
              className="relative bg-cover bg-center bg-no-repeat rounded-xl shadow-2xl overflow-hidden hover:scale-105 transition-all duration-500 border border-white/20"
              style={{ backgroundImage: `url(${model.img})` }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div className="bg-black/70 p-8 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-semibold text-white mb-4">
                  {model.title}
                </h3>
                <p className="text-white/80">{model.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Why It Matters Section */}
      <section id="why" className="py-24 px-6 bg-black text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-8"
        >
          Why It Matters
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-white/80 text-lg leading-relaxed"
        >
          Football is more than just a game — it’s a global, billion-dollar industry where every decision can change the outcome.
From scouting to strategy, data now defines the difference between winning and falling behind.
Our AI models bring precision, fairness, and deep insights to every corner of the sport.
We empower clubs to optimize player performance, reduce risk, and outthink the competition.
No longer reserved for the elite, advanced analytics are now accessible to every club, everywhere.
The future of football is data-driven — and we’re here to lead the way.
        </motion.p>
      </section>

      {/* Join Section */}
      <section
        id="join"
        className="py-24 px-6 bg-gradient-to-br from-black to-gray-900 text-center"
      >
        <motion.h2
          className="text-4xl font-bold text-white-400 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Join the Revolution
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto text-white/80 text-lg mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Be part of the future of football analytics — where AI and passion collide. Help us change the game.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Button
            className="px-8 py-4 text-lg font-semibold rounded-full bg-black-400 text-black shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => setShowModal(true)}
          >
            Get Involved
          </Button>
        </motion.div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <motion.div
            className="bg-white text-black rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4">Let’s Connect!</h3>
            <p className="text-gray-700 mb-6">
              Enter your email and we’ll reach out about opportunities to join.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-lg border border-gray-300 focus:outline-yellow-400"
              />
              <Button className="bg-white-400 text-black hover:scale-105">
                Submit
              </Button>
            </form>
            <button
              className="mt-4 text-sm text-gray-500 underline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
        {/* Contact Section */}
        <section id="contact" className="bg-gradient-to-b from-gray-800 to-black text-center py-20 px-6">
        <h2 className="text-4xl font-bold text-white-400 mb-6">Contact Us</h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
          Have questions, feedback, or just want to collaborate with us? Reach out to Drushti Technologies!
        </p>
        <div className="bg-black/60 max-w-lg mx-auto rounded-xl shadow-lg p-8 border border-white/20">
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="bg-white/10 text-white px-4 py-3 rounded-md placeholder-white/60 focus:outline-none" />
            <input type="email" placeholder="Email" className="bg-white/10 text-white px-4 py-3 rounded-md placeholder-white/60 focus:outline-none" />
            <textarea rows={4} placeholder="Your Message" className="bg-white/10 text-white px-4 py-3 rounded-md placeholder-white/60 focus:outline-none" />
            <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform duration-300 text-white font-semibold py-3 rounded-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
