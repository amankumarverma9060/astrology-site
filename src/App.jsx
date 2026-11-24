
import { Routes, Route } from "react-router-dom";
import KundliMatching from "./pages/KundliMatching";
import Kundli from "./pages/Kundli";
import KundliResult from "./pages/KundliResult";

import {
  Sun,
  Moon,
  Sparkles,
  Star,
  Heart,
  CalendarDays,
  ArrowRight,
  Menu,
  Globe,
  Orbit,
} from "lucide-react";

const rashis = [
  ["♈", "मेष", "Aries"],
  ["♉", "वृषभ", "Taurus"],
  ["♊", "मिथुन", "Gemini"],
  ["♋", "कर्क", "Cancer"],
  ["♌", "सिंह", "Leo"],
  ["♍", "कन्या", "Virgo"],
  ["♎", "तुला", "Libra"],
  ["♏", "वृश्चिक", "Scorpio"],
  ["♐", "धनु", "Sagittarius"],
  ["♑", "मकर", "Capricorn"],
  ["♒", "कुंभ", "Aquarius"],
  ["♓", "मीन", "Pisces"],
];

function ZodiacWheel() {
  const symbols = [
    "♈", "♉", "♊", "♋", "♌", "♍",
    "♎", "♏", "♐", "♑", "♒", "♓",
  ];

  return (
    <div className="wheel-area">
      <div className="wheel-glow"></div>
      <div className="wheel-orbit orbit-one"></div>
      <div className="wheel-orbit orbit-two"></div>

      <div className="zodiac-wheel">
        <div className="wheel-inner">
          <div className="wheel-center">
            <Sun size={43} strokeWidth={1} />
            <span>ॐ</span>
          </div>

          {symbols.map((symbol, index) => (
            <div
              className="wheel-symbol"
              key={symbol}
              style={{ "--angle": `${index * 30}deg` }}
            >
              <span>{symbol}</span>
            </div>
          ))}
        </div>
      </div>

      <span className="wheel-star star-a">✦</span>
      <span className="wheel-star star-b">✧</span>
      <span className="wheel-star star-c">✦</span>
    </div>
  );
}

function AstroLogo() {
  return (
    <div className="astro-logo">
      <div className="astro-logo-icon">
        <Orbit size={32} strokeWidth={1.6} />
        <span>✦</span>
      </div>

      <div className="astro-logo-text">
        <strong>ASTRO WORLD</strong>
        <small>Vishal Dut Verma · ज्योतिष</small>
      </div>
    </div>
  );
}

// HOME PAGE
function HomePage() {
  return (
    <main className="astro-site">

      {/* NAVBAR */}
      <header className="astro-header">
        <a href="/" className="brand">
          <AstroLogo />
        </a>

        <nav className="desktop-nav">
          <a href="/">Home</a>
          <a href="#kundli">Free Kundli</a>
          <a href="#rashifal">Horoscope</a>
          <a href="#services">Astrology Tools</a>
          <a href="#about">About</a>
        </nav>

        <div className="header-actions">
          <button className="language-btn">
            <Globe size={15} />
            हिंदी / English
          </button>

          <button className="mobile-menu" aria-label="Open menu">
            <Menu />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="cosmic-hero">
        <div className="hero-stars"></div>

        <div className="hero-content">
          <div className="eyebrow">
            <Sparkles size={16} />
            THE WISDOM OF VEDIC ASTROLOGY
          </div>

          <h2>
            Welcome to
            <span> Vishal Dut Verma</span>
            <span className="hindi-title">ज्योतिष</span>
          </h2>

          <p className="hero-description">
            Explore the mysteries of the universe and discover
            your cosmic path through the ancient wisdom of
            Vedic Astrology.
          </p>

          <div className="hero-buttons">
            <a href="/kundli" className="primary-btn">
              Explore Your Kundli <ArrowRight size={18} />
            </a>

            <a href="#rashifal" className="secondary-btn">
              Discover Rashifal
            </a>
          </div>

          <div className="hero-note">
            <Star size={14} />
            Discover yourself. Understand your stars.
          </div>
        </div>

        <div className="hero-art">
          <ZodiacWheel />

          <div className="art-caption">
            <span>✦</span> YOUR COSMIC UNIVERSE <span>✦</span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <div></div>
        </div>
      </section>

      {/* RASHI SECTION */}
      <section className="rashi-section" id="rashifal">
        <div className="section-heading">
          <span className="section-label">
            THE TWELVE ZODIAC SIGNS
          </span>

          <h2>
            Explore Your <span>Zodiac Sign</span>
          </h2>

          <p>
            अपनी राशि चुनें और जानें अपने सितारों के बारे में
          </p>
        </div>

        <div className="rashi-grid">
          {rashis.map(([symbol, hindi, english]) => (
            <div className="rashi-card" key={english}>
              <div className="rashi-symbol">{symbol}</div>
              <h3>{hindi}</h3>
              <p>{english}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="section-heading">
          <span className="section-label">
            EXPLORE THE COSMOS
          </span>

          <h2>
            Astrology <span>Services</span>
          </h2>

          <p>
            Discover free astrology tools and Vedic insights.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card" id="kundli">
            <Moon />
            <h3>Free Kundli</h3>
            <p>
              Explore your birth chart and planetary positions.
            </p>
            <a href="/kundli">
              Create Kundli <ArrowRight size={15} />
            </a>
          </div>

          <div className="service-card">
            <Heart />
            <h3>Kundli Matching</h3>
            <p>
              Check compatibility through traditional Vedic matching.
            </p>
            <a href="/kundli-matching">
              Match Kundli <ArrowRight size={15} />
            </a>
          </div>

          <div className="service-card">
            <CalendarDays />
            <h3>Daily Panchang</h3>
            <p>
              Explore Tithi, Nakshatra and daily Panchang.
            </p>
            <a href="#services">
              View Panchang <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="astro-footer" id="about">
        <div className="footer-brand">
          <Sparkles />

          <div>
            <h3>Vishal Dut Verma</h3>
            <p>ज्योतिष</p>
          </div>
        </div>

        <p>Explore the universe. Discover yourself.
          <br /> developed by Aman Kumar Verma
        </p>

        <div className="footer-line"></div>

        <small>
          © 2026 Astro World. All Rights Reserved.
        </small>
      </footer>

    </main>
  );
}

// APP ROUTING
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/kundli" element={<Kundli />} />
      <Route path="/kundli-result" element={<KundliResult />} />
      <Route path="/kundli-matching" element={<KundliMatching />} />
    </Routes>
  );
}

export default App;
