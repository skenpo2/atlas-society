import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  CheckCircle2,
  Users,
  ArrowRight,
  X,
  MapPin,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* --- UTILS --- */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* --- ASSETS (Reliable Free Sources) --- */
const ASSETS = {
  // Reliable CDN Video: Dinner Party / Salon Vibe
  heroVideo:
    'https://cdn.coverr.co/videos/coverr-people-eating-dinner-together-5645/1080p.mp4',
  // Fallback image if video fails to load immediately
  heroPoster:
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
};

/* --- DATA: REAL 2026 EVENTS --- */
const EVENTS = [
  {
    name: 'United Nations General Assembly (UNGA 81)',
    location: 'New York City, USA',
    dates: '8 Sep – 14 Sep 2026',
    category: 'policy',
    capacity: 20,
    filled: 14,
  },
  {
    name: 'Martha’s Vineyard Film Festival',
    location: 'Martha’s Vineyard, USA',
    dates: '7 Aug – 15 Aug 2026',
    category: 'culture',
    capacity: 20,
    filled: 18,
  },
  {
    name: 'Art Basel Miami Beach',
    location: 'Miami Beach, USA',
    dates: '3 Dec – 6 Dec 2026',
    category: 'culture',
    capacity: 20,
    filled: 5,
  },
  {
    name: 'GITEX Africa',
    location: 'Marrakech, Morocco',
    dates: '7 Apr – 9 Apr 2026',
    category: 'tech',
    capacity: 20,
    filled: 12,
  },
  {
    name: 'Africa Tech Summit',
    location: 'Nairobi, Kenya',
    dates: '11 Feb – 12 Feb 2026',
    category: 'tech',
    capacity: 20,
    filled: 19,
  },
  {
    name: 'F1® Monaco Grand Prix',
    location: 'Monte Carlo, Monaco',
    dates: '5 Jun – 7 Jun 2026',
    category: 'culture',
    capacity: 12,
    filled: 10,
  },
  {
    name: 'ADIPEC Energy Summit',
    location: 'Abu Dhabi, UAE',
    dates: '2 Nov – 5 Nov 2026',
    category: 'capital',
    capacity: 20,
    filled: 8,
  },
  {
    name: 'G20 Summit',
    location: 'Miami, USA',
    dates: '14 Dec – 15 Dec 2026',
    category: 'policy',
    capacity: 15,
    filled: 15,
  },
];

const COMMUNITY_DOTS = [
  {
    top: '35%',
    left: '22%',
    role: 'Product Manager, Amazon',
    age: '30s',
    city: 'Seattle',
  },
  {
    top: '38%',
    left: '28%',
    role: 'Founder, Fintech',
    age: 'Early 30s',
    city: 'NYC',
  },
  {
    top: '30%',
    left: '48%',
    role: 'Policy Advisor, EU',
    age: '40s',
    city: 'Brussels',
  },
  {
    top: '55%',
    left: '52%',
    role: 'Investor, Energy',
    age: 'Late 30s',
    city: 'Lagos',
  },
  {
    top: '45%',
    left: '65%',
    role: 'Director, Sovereign Fund',
    age: '40s',
    city: 'Riyadh',
  },
  {
    top: '60%',
    left: '80%',
    role: 'Artist, Global',
    age: '30s',
    city: 'Singapore',
  },
  { top: '25%', left: '85%', role: 'VC Partner', age: '40s', city: 'Tokyo' },
];

/* --- COMPONENTS --- */

// 1. Navbar (Responsive)
const Navbar = ({ onOpen }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 text-white pointer-events-none mix-blend-difference">
    <div className="flex flex-col gap-1 pointer-events-auto">
      <span className="text-xs md:text-sm tracking-[0.2em] font-medium uppercase">
        Atlas Society
      </span>
    </div>
    <button
      onClick={onOpen}
      className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest hover:text-white/70 transition-colors pointer-events-auto"
    >
      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-1" />
      <span className="hidden md:inline">2026 Applications Open</span>
      <span className="md:hidden">Apps Open</span>
    </button>
  </nav>
);

// 2. Cinematic Hero (Fixed Video Autoplay)
const Hero = () => {
  // We use a ref to strictly enforce the 'muted' property which browsers require for autoplay
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true; // Crucial for React
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-60 grayscale-[10%] contrast-110"
        >
          {/* Reliable, Fast CDN Link (Dinner/Social Vibe) */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-people-toasting-with-wine-at-a-dinner-party-4505-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient Overlays (adjusted for better visibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-bg)] via-[var(--color-atlas-bg)]/10 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg md:text-2xl font-serif italic text-white/95 leading-relaxed mb-8 drop-shadow-lg">
            A private society curating hosted access to the world’s most
            influential gatherings.
          </p>
          <div className="h-px w-16 bg-white/50" />
        </motion.div>
      </div>
    </section>
  );
};

// 3. The Live Calendar (Responsive Grid)
const Calendar = ({ onRegister }) => {
  return (
    <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-[#050505]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <h2 className="text-xs tracking-[0.2em] uppercase text-zinc-500 mb-2">
            The Atlas Calendar
          </h2>
          <p className="text-xl md:text-2xl font-serif italic text-white">
            2026 Global Convenings
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono uppercase mt-6 md:mt-0">
          <Globe className="w-3 h-3" />
          <span>Real-Time Availability</span>
        </div>
      </div>

      <div className="w-full border-t border-white/10">
        {EVENTS.map((event, i) => (
          <EventRow key={i} event={event} i={i} onRegister={onRegister} />
        ))}
      </div>
    </section>
  );
};

const EventRow = ({ event, i, onRegister }) => {
  // Category Color Logic
  const getCatColor = (cat) => {
    switch (cat) {
      case 'policy':
        return 'bg-zinc-500';
      case 'tech':
        return 'bg-blue-900';
      case 'capital':
        return 'bg-emerald-900';
      case 'culture':
        return 'bg-rose-950';
      default:
        return 'bg-zinc-800';
    }
  };

  const isFull = event.filled >= event.capacity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="group relative grid grid-cols-1 md:grid-cols-12 py-6 border-b border-white/5 hover:bg-white/[0.03] transition-colors gap-4 md:gap-0"
    >
      {/* Desktop: Dot */}
      <div className="hidden md:flex col-span-1 items-center justify-center">
        <div
          className={`w-1.5 h-1.5 rounded-full ${getCatColor(event.category)} animate-pulse`}
        />
      </div>

      {/* Event Name */}
      <div className="col-span-12 md:col-span-4 md:self-center">
        <div className="flex items-center gap-3 md:hidden mb-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${getCatColor(event.category)}`}
          />
          <span className="text-[10px] uppercase text-zinc-500 tracking-wider">
            {event.category}
          </span>
        </div>
        <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
          {event.name}
        </span>
      </div>

      {/* Location */}
      <div className="col-span-6 md:col-span-3 md:self-center">
        <span className="text-xs text-zinc-500 font-mono flex items-center gap-2">
          <MapPin className="w-3 h-3 md:hidden" />
          {event.location}
        </span>
      </div>

      {/* Dates */}
      <div className="col-span-6 md:col-span-2 md:self-center text-right md:text-left">
        <span className="text-xs text-zinc-500 font-mono">{event.dates}</span>
      </div>

      {/* Capacity & Action */}
      <div className="col-span-12 md:col-span-2 flex justify-between md:justify-end items-center gap-6 mt-2 md:mt-0">
        <div className="flex items-center gap-1.5">
          <Users className="w-3 h-3 text-zinc-700" />
          <span className="text-[10px] font-mono text-zinc-600">
            {isFull ? 'WAITLIST' : `${event.capacity - event.filled} SPOTS`}
          </span>
        </div>

        <button
          onClick={onRegister}
          className="md:opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white text-white hover:text-black px-4 py-1.5 text-[10px] uppercase tracking-widest font-medium rounded-sm"
        >
          {isFull ? 'Join Waitlist' : 'Register'}
        </button>
      </div>
    </motion.div>
  );
};

// 4. Narrative Section
const Narrative = () => (
  <section className="py-24 px-6 md:px-12 bg-[#080808]">
    <div className="max-w-3xl mx-auto text-center mb-24">
      <h3 className="text-xs tracking-[0.2em] uppercase text-zinc-600 mb-8">
        Inside an Atlas Experience
      </h3>
      <p className="text-xl md:text-3xl font-serif italic text-zinc-400 leading-relaxed">
        You arrive in a new city. You’re met. <br className="hidden md:block" />
        You’re brought to a private residence already alive with conversation.{' '}
        <br className="hidden md:block" />
        <span className="text-white">
          Breakfasts become briefings. Dinners become introductions.
        </span>{' '}
        <br className="hidden md:block" />
        The summit is the backdrop — not the main event.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto border-t border-white/5 pt-16">
      <div>
        <h4 className="text-lg font-medium text-white mb-6">
          What Atlas Curates
        </h4>
        <p className="text-sm text-zinc-500 leading-loose">
          ATLAS Society curates hosted participation at the world’s most
          influential summits — placing members inside private residences,
          off-stage gatherings, and invitation-only rooms that surround global
          forums. <br />
          <br />
          This is not attendance. It is proximity.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h5 className="text-xs uppercase tracking-widest text-zinc-600 mb-4">
            Inclusions
          </h5>
          <ul className="space-y-3 text-xs text-zinc-400 font-mono">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 mt-0.5 text-zinc-700 shrink-0" />{' '}
              Hosted Residence
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 mt-0.5 text-zinc-700 shrink-0" />{' '}
              Daily Breakfasts
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 mt-0.5 text-zinc-700 shrink-0" />{' '}
              VVIP Credentials
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 mt-0.5 text-zinc-700 shrink-0" />{' '}
              Host Team
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs uppercase tracking-widest text-zinc-600 mb-4">
            Add-Ons
          </h5>
          <ul className="space-y-3 text-xs text-zinc-500 font-mono">
            <li>Private Media Capture</li>
            <li>Strategic Introductions</li>
            <li>VIP Airport Transfers</li>
            <li>Visa Processing</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// 5. How It Works
const HowItWorks = () => (
  <section className="py-24 px-6 md:px-12 bg-[#050505] border-t border-white/5">
    <div className="max-w-6xl mx-auto">
      <h3 className="text-xs tracking-[0.2em] uppercase text-zinc-600 mb-12">
        The Process
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {[
          { step: '01', title: 'Explore', desc: 'Browse the 2026 calendar.' },
          { step: '02', title: 'Request', desc: 'Apply for access.' },
          { step: '03', title: 'Review', desc: 'Alignment & capacity check.' },
          {
            step: '04',
            title: 'Confirm',
            desc: 'Secure spot via private link.',
          },
          { step: '05', title: 'Concierge', desc: 'Visa & travel support.' },
          { step: '06', title: 'Attend', desc: 'As a guest of the House.' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-4 border border-white/5 bg-white/[0.02]"
          >
            <span className="text-xs font-mono text-zinc-700">{item.step}</span>
            <h4 className="text-sm font-medium text-zinc-300">{item.title}</h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 6. Community Map
const CommunityMap = () => (
  <section className="py-32 px-6 md:px-12 bg-[#030303] relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
      <h2 className="text-lg font-serif italic text-zinc-200">
        A Global Community
      </h2>
      <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-2">
        A snapshot of the people who gather through Atlas
      </p>
    </div>

    {/* Responsive Map Container */}
    <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] border border-white/5 bg-[#050505] rounded-lg overflow-hidden group">
      {/* World Map SVG */}
      <svg
        viewBox="0 0 1000 450"
        className="absolute inset-0 w-full h-full text-zinc-900 fill-current opacity-60"
      >
        {/* Simplified Abstract World Map Path */}
        <path
          d="M150,350 Q200,300 250,350 T350,300 T500,200 T700,150 T850,200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="opacity-20"
        />
        <circle cx="200" cy="300" r="100" className="opacity-10" />
        <circle cx="800" cy="200" r="80" className="opacity-10" />
        <circle cx="500" cy="250" r="120" className="opacity-10" />

        <text
          x="50%"
          y="90%"
          textAnchor="middle"
          className="text-[8px] fill-zinc-800 font-mono tracking-[1em] opacity-40"
        >
          LIVE COMMUNITY DATA
        </text>
      </svg>

      {/* Interactive Dots */}
      {COMMUNITY_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 cursor-pointer"
          style={{ top: dot.top, left: dot.left }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="relative group/dot">
            <div className="w-2 h-2 bg-white rounded-full relative z-10 transition-transform group-hover/dot:scale-150" />
            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />

            {/* Tooltip (Responsive Position) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 md:w-48 bg-black/95 border border-white/10 p-3 opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none z-20 backdrop-blur-md rounded-sm">
              <div className="text-xs text-white font-medium mb-1">
                {dot.role}
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono uppercase">
                <span>{dot.city}</span>
                <span>{dot.age}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// 7. Footer
const FooterCTA = ({ onRegister }) => (
  <section className="py-24 text-center bg-[#030303] border-t border-white/5 px-6">
    <h2 className="text-2xl md:text-3xl font-serif italic text-white mb-8">
      This is proximity.
    </h2>
    <button
      onClick={onRegister}
      className="bg-white text-black px-8 py-4 text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-sm"
    >
      Check Our Calendar
    </button>
    <p className="mt-12 text-[10px] text-zinc-700 font-mono uppercase tracking-widest">
      Atlas Society © 2026 • Invitation Only
    </p>
  </section>
);

// 8. Application Modal
const ApplicationModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      >
        <div className="w-full max-w-lg relative">
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-[#0a0a0a] border border-white/10 p-6 md:p-10 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="mb-8">
              <h2 className="font-serif italic text-2xl text-white">
                Request Access
              </h2>
              <p className="text-[10px] text-zinc-500 font-mono mt-2 uppercase">
                Application Required • Identity Verified
              </p>
            </div>

            <form
              className="space-y-6 font-mono text-xs"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input label="Full Name" />
              <Input label="Current City" />
              <Input label="Organization / Role" />
              <Input label="LinkedIn URL" />
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-zinc-500">
                  Intended Summit
                </label>
                <select className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-white transition-colors cursor-pointer">
                  <option className="bg-black">Select an event...</option>
                  {EVENTS.map((e) => (
                    <option key={e.name} className="bg-black">
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>

              <button className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors mt-4 font-bold">
                Submit Application
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Input = ({ label }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase text-zinc-500">{label}</label>
    <input className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-none" />
  </div>
);

/* --- MAIN APP --- */
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="noise-overlay" />
      <div className="relative z-10 selection:bg-white selection:text-black bg-[var(--color-atlas-bg)]">
        <Navbar onOpen={() => setIsModalOpen(true)} />

        <Hero />

        <Calendar onRegister={() => setIsModalOpen(true)} />

        <Narrative />

        <HowItWorks />

        <CommunityMap />

        <FooterCTA onRegister={() => setIsModalOpen(true)} />

        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}

export default App;
