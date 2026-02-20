import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Globe, Mail, MessageCircle } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <div className="countdown-box">
        <span className="countdown-val">{timeLeft.days}</span>
        <span className="countdown-label">Hari</span>
      </div>
      <div className="countdown-box">
        <span className="countdown-val">{timeLeft.hours}</span>
        <span className="countdown-label">Jam</span>
      </div>
      <div className="countdown-box">
        <span className="countdown-val">{timeLeft.minutes}</span>
        <span className="countdown-label">Menit</span>
      </div>
      <div className="countdown-box">
        <span className="countdown-val">{timeLeft.seconds}</span>
        <span className="countdown-label">Detik</span>
      </div>
    </div>
  );
};


// New Component for Random Gold Particles
const GoldParticles = () => {
  // Generate random particles
  // Generate random particles only once
  const particles = React.useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1 + 'px',
      duration: Math.random() * 5 + 5 + 's', // 5-10s duration
      delay: Math.random() * 5 + 's',
    }));
  }, []);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="gold-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const targetDate = new Date("February 24, 2026 16:00:00").getTime();
  const [rsvpData, setRsvpData] = useState({ name: '', attendance: 'Hadir' });
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) setGuestName(to);
  }, []);

  const handleRSVP = (e) => {
    e.preventDefault();
    const message = `Halo, saya ${rsvpData.name}. Saya mengonfirmasi bahwa saya ${rsvpData.attendance} pada acara Dies Natalis ke-15 SMK Mitra Industri MM2100.`;
    const encodedMessage = encodeURIComponent(message);

    // Store submitted data and show confirmation
    setSubmittedData({ ...rsvpData });
    setIsSubmitted(true);

    window.open(`https://wa.me/6281316052316?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-maroon-gradient min-h-screen relative">
      {/* Music Player - Persistent */}
      <MusicPlayer />

      {/* Splash Cover */}
      <div className={`splash-container ${isOpen ? 'hide' : ''}`}>
        <div className="rays-bg" />
        <div className="mandala-bg" />
        <GoldParticles />
        <div className="mandala-bg" />
        <GoldParticles />
        <div className="frame-overlay" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md px-6"
        >
          <img
            src="/logo.png"
            alt="Logo SMK"
            className="logo-small mx-auto mb-8 school-logo"
          />
          <h1 className="text-gold font-script text-6xl mb-2 text-shimmer">Dies Natalis ke-15</h1>
          <p className="text-sm tracking-widest opacity-70 mb-10">SMK Mitra Industri MM2100</p>

          <div className="guest-name-box">
            <p className="text-xs uppercase tracking-[0.3em] font-light mb-2">Kepada Yth. Bapak/Ibu/Sdr/i</p>
            <h3 className="text-2xl text-gold font-serif italic">{guestName || 'Tamu Undangan'}</h3>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              window.scrollTo(0, 0);
            }}
            className="btn-gold mt-10 btn-pulse"
          >
            BUKA UNDANGAN
          </button>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 py-20 px-6 relative overflow-hidden`}>
        <div className="rays-bg" />
        <div className="mandala-bg-top" />
        <GoldParticles />

        {/* New Frame Overlay */}
        <div className="frame-overlay" />

        <div className="max-w-2xl mx-auto relative text-center" style={{ zIndex: 20 }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-10 flex justify-center"
          >
            <img
              src="/logo.png"
              alt="Logo SMK"
              className="logo-medium school-logo"
              style={{ objectFit: 'contain' }}
            />
          </motion.div>

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-gold font-script text-8xl mb-4 text-shimmer" style={{ lineHeight: '1' }}>
              Dies Natalis ke-15
            </h1>
            <h2 className="text-gold tracking-20 text-2xl font-light mb-6">
              SMK Mitra Industri MM2100
            </h2>
          </motion.div>

          <div className="divider-gold" />

          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="my-8"
          >
            <p className="text-gold tracking-30 font-semibold text-2xl mb-6">16.00 WIB</p>
            <div className="flex justify-center items-center gap-6">
              <span className="text-xl text-gold-light" style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.4)', paddingBottom: '0.25rem' }}>SELASA</span>
              <span className="text-7xl font-bold text-gold">24</span>
              <span className="text-xl text-gold-light" style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.4)', paddingBottom: '0.25rem' }}>FEBRUARI</span>
            </div>
            <p className="text-4xl text-gold mt-6 font-light tracking-20">2026</p>
          </motion.div>

          <div className="divider-gold" />

          {/* Countdown */}
          <Countdown targetDate={targetDate} />

          {/* Motto / Theme */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gold-light font-serif italic text-base mb-6 tracking-widest uppercase"
            style={{ lineHeight: '1.4' }}
          >
            "To Be Number One to the Next Level by Man Jadda Wajada and Agile"
          </motion.p>

          <div className="divider-gold" />

          {/* Location Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="my-8"
          >
            <h3 className="text-gold tracking-40 uppercase text-sm mb-6">Tempat</h3>
            <p className="text-light font-light text-xs mb-8 mx-auto" style={{ maxWidth: '400px', lineHeight: '1.4', opacity: 0.8 }}>
              SMK Mitra Industri MM2100<br />
              Kawasan Industri MM2100, Jl. Kalimantan Blok DD 1-1, Jl. Kalimantan,<br />
              Danau Indah, Kec. Cikarang Barat, Kabupaten Bekasi, Jawa Barat 17530
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=SMK+Mitra+Industri+MM2100"
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              Lihat Lokasi
            </a>
          </motion.div>

          {/* Contact/RSVP */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="card-rsvp"
          >
            <p className="text-gold text-xs tracking-40 uppercase mb-4">Konfirmasi Kehadiran</p>

            <form onSubmit={handleRSVP} className="rsvp-form">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Masukkan nama Anda"
                  required
                  value={rsvpData.name}
                  onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kehadiran</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="attendance"
                      value="Hadir"
                      checked={rsvpData.attendance === 'Hadir'}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                    />
                    <span>Hadir</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="attendance"
                      value="Tidak Hadir"
                      checked={rsvpData.attendance === 'Tidak Hadir'}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                    />
                    <span>Tidak Hadir</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-gold" style={{ marginTop: '1rem', width: '100%' }}>
                KIRIM KONFIRMASI (WA)
              </button>
            </form>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rsvp-confirmation"
                >
                  <div className="confirmation-header">
                    <span className="check-icon">✓</span>
                    <h4>Konfirmasi Terkirim</h4>
                  </div>
                  <div className="confirmation-content">
                    <p>Terima kasih <strong>{submittedData.name}</strong>,</p>
                    <p>Kami telah mencatat kehadiran Anda sebagai: <strong>{submittedData.attendance}</strong></p>
                    <p className="noteText">Pesan konfirmasi juga telah diarahkan ke WhatsApp Panitia.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


          </motion.div>

          <footer className="mt-32">
            <div className="social-links">
              <a href="https://www.instagram.com/mitra_industri/" target="_blank" rel="noreferrer" className="social-icon">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@SMKMitraIndustriMMOfficial" target="_blank" rel="noreferrer" className="social-icon">
                <Youtube size={20} />
              </a>
              <a href="https://smkind-mm2100.sch.id/" target="_blank" rel="noreferrer" className="social-icon">
                <Globe size={20} />
              </a>
            </div>
            <p className="mt-8 text-xs tracking-50 font-light" style={{ opacity: 0.3 }}>
              SMK Mitra Industri MM2100 • Anniversary 15
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
