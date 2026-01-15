import React, { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { ArrowRight, Lock, Plus, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* --- UTILS --- */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* --- ASSETS (Curated for "Cold Luxury") --- */
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Brutalist
  residence:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', // Dark Interior
  table:
    'https://images.unsplash.com/photo-1551972251-12070d63502a?q=80&w=1974&auto=format&fit=crop', // Meeting
  access:
    'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=1974&auto=format&fit=crop', // Summit
};

/* --- DATA: DOSSIER STYLE --- */
const CALENDAR_DATA = [
  { code: 'CHE-26', city: 'DAVOS', region: 'SWITZERLAND', type: 'ECONOMY' },
  { code: 'SAU-26', city: 'RIYADH', region: 'KSA', type: 'TECH' },
  { code: 'USA-26', city: 'AUSTIN', region: 'USA', type: 'CULTURE' },
  { code: 'QAT-26', city: 'DOHA', region: 'QATAR', type: 'FINANCE' },
  { code: 'FRA-26', city: 'CANNES', region: 'FRANCE', type: 'MEDIA' },
  { code: 'SGP-26', city: 'SINGAPORE', region: 'SINGAPORE', type: 'CAPITAL' },
];

/* --- COMPONENTS --- */

// 1. Navigation (Responsive Fix)
const Navbar = ({ onJoin }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 mix-blend-difference text-white pointer-events-none">
    {/* Left Side: Brand */}
    <div className="flex flex-col gap-1 pointer-events-auto">
      <span className="text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] font-medium uppercase whitespace-nowrap">
        Atlas Society
      </span>
      {/* Hide "Est. 2024" on mobile to reduce noise */}
      <span className="hidden md:block text-[10px] text-white/50 font-mono uppercase tracking-widest">
        Est. 2024
      </span>
    </div>

    {/* Right Side: Action */}
    <button
      onClick={onJoin}
      className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest hover:text-white/70 transition-colors pointer-events-auto"
    >
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-1" />
      {/* Mobile Text: "OPEN" */}
      <span className="md:hidden">Open</span>
      {/* Desktop Text: "APPLICATION STATUS: OPEN" */}
      <span className="hidden md:inline">Application Status: Open</span>
    </button>
  </nav>
);

// 2. Hero (Responsive Text Sizing)
const Hero = ({ onJoin }) => (
  <section className="relative h-screen md:h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 overflow-hidden">
    <div className="absolute inset-0 z-0 select-none">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        src={IMAGES.hero}
        alt="Architecture"
        className="w-full h-full object-cover opacity-20 grayscale contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-atlas-bg)] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-atlas-bg)_120%)]" />
    </div>

    <div className="z-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Adjusted text sizes for mobile (text-3xl) vs desktop (text-7xl) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-white/90 leading-[1.1] mb-8 md:mb-12">
          Curating proximity to the
          <br /> world’s most{' '}
          <span className="text-white/40">influential rooms.</span>
        </h1>

        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 border-t border-white/10 pt-8">
          <div className="max-w-xs">
            <p className="text-[10px] md:text-xs text-zinc-500 font-mono leading-relaxed mb-6">
              ATLAS IS NOT PUBLIC-FACING BY DESIGN. <br />
              IT REWARDS ALIGNMENT, DISCRETION, AND REFERRAL.
            </p>
            <button
              onClick={onJoin}
              className="group relative overflow-hidden bg-white text-black px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-200 transition-colors"
            >
              <span className="relative z-10">Request Membership</span>
              <div className="absolute inset-0 bg-zinc-300 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo" />
            </button>
          </div>

          <div className="hidden md:block h-px w-32 bg-white/10 mt-3" />

          <div className="hidden md:block text-xs text-zinc-600 font-mono">
            SCROLL TO DECLASSIFY
            <br />↓
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// 3. Calendar (The "Dossier")
const Calendar = ({ onJoin }) => {
  return (
    <section className="py-32 px-6 md:px-12 border-b border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <h2 className="text-xs tracking-[0.3em] uppercase text-zinc-500">
          Global Convening Calendar
        </h2>
        <div className="flex items-center gap-2 text-[10px] text-zinc-700 font-mono uppercase mt-4 md:mt-0">
          <Globe className="w-3 h-3" />
          <span>Live Database • FY26</span>
        </div>
      </div>

      <div className="w-full border-t border-white/10">
        {CALENDAR_DATA.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative grid grid-cols-1 md:grid-cols-12 py-8 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-default"
          >
            <div className="col-span-2 text-[10px] font-mono text-zinc-600 self-center">
              {item.code}
            </div>
            <div className="col-span-5 text-2xl md:text-3xl font-serif italic text-zinc-400 group-hover:text-white transition-colors self-center">
              {item.city}
            </div>
            <div className="col-span-3 text-[10px] tracking-widest uppercase text-zinc-600 self-center mt-2 md:mt-0">
              {item.region}
            </div>
            <div className="col-span-2 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <Lock className="w-3 h-3 text-zinc-400" />
                <span className="text-[9px] uppercase tracking-widest text-zinc-400">
                  Restricted
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={onJoin}
          className="text-[10px] font-mono uppercase text-zinc-600 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
        >
          [ Request Full Access ]
        </button>
      </div>
    </section>
  );
};

// 4. Sticky Pillars (The "Magazine" Feel)
const Pillars = () => {
  const sections = [
    {
      title: 'The Residence',
      desc: 'Private, curated group accommodations—châteaux, villas, suites—designed to foster trust.',
      img: IMAGES.residence,
    },
    {
      title: 'The Access',
      desc: 'Credentials and entry points beyond what is publicly purchasable.',
      img: IMAGES.access,
    },
    {
      title: 'The Table',
      desc: 'Private gatherings where meaningful exchange happens off-stage.',
      img: IMAGES.table,
    },
  ];

  return (
    <div className="bg-[#050505]">
      {sections.map((section, i) => (
        <StickySection key={i} section={section} i={i} />
      ))}
    </div>
  );
};

const StickySection = ({ section, i }) => {
  return (
    <div className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden border-t border-white/5 bg-[#050505]">
      {/* Text Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-24 py-12 z-10 bg-[#050505]/95 backdrop-blur-md md:bg-[#050505]">
        <span className="text-[10px] font-mono text-zinc-600 mb-6">
          0{i + 1} — PILLAR
        </span>
        <h3 className="text-3xl md:text-5xl font-serif italic text-white mb-8">
          {section.title}
        </h3>
        <p className="text-zinc-500 font-light leading-loose max-w-md">
          {section.desc}
        </p>
      </div>

      {/* Image Side */}
      <div className="absolute md:relative inset-0 md:w-1/2 h-full opacity-30 md:opacity-100 pointer-events-none">
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={section.img}
          className="w-full h-full object-cover grayscale opacity-60"
        />
        {/* Gradient overlay for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent md:hidden" />
      </div>
    </div>
  );
};

// 5. Minimalist Application Form (Refactored for Exit Animations)
const MembershipModal = ({ isOpen, onClose }) => {
  return (
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
              <span className="font-mono text-xs">[CLOSE]</span>
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <h2 className="font-serif italic text-2xl text-white">
                  Application
                </h2>
                <span className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2 py-1 rounded">
                  FEE: $100 USD
                </span>
              </div>

              <form
                className="space-y-8 font-mono text-xs"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Full Name" />
                  <Input label="Passport Nation" />
                </div>
                <Input label="Professional Role" />
                <Input label="LinkedIn URL" />
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-zinc-500">
                    Alignment Statement
                  </label>
                  <textarea
                    rows="3"
                    className="w-full bg-transparent border-b border-zinc-800 py-2 text-white focus:outline-none focus:border-white transition-colors resize-none placeholder:text-zinc-800"
                    placeholder="Why Atlas?"
                  ></textarea>
                </div>

                <button className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors mt-4">
                  Submit for Review
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Input = ({ label }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase text-zinc-500">{label}</label>
    <input className="w-full bg-transparent border-b border-zinc-800 py-2 text-white focus:outline-none focus:border-white transition-colors" />
  </div>
);

/* --- MAIN APP --- */
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="noise-overlay" /> {/* Cinematic Grain */}
      <div className="relative z-10 selection:bg-white selection:text-black">
        <Navbar onJoin={() => setIsModalOpen(true)} />
        <Hero onJoin={() => setIsModalOpen(true)} />
        <Calendar onJoin={() => setIsModalOpen(true)} />
        <Pillars />

        {/* Footer / Social Proof Area */}
        <section className="py-32 px-6 md:px-12 border-t border-white/5 flex flex-col items-center text-center">
          <h3 className="text-xs font-mono text-zinc-600 mb-8 uppercase tracking-widest">
            Global Representation
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl">
            {[
              { val: '24', label: 'Global Forums' },
              { val: '<8%', label: 'Acceptance Rate' },
              { val: '6', label: 'Continents' },
              { val: '∞', label: 'Proximity' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-serif italic text-3xl md:text-4xl text-zinc-400 mb-2">
                  {stat.val}
                </div>
                <div className="font-mono text-[10px] uppercase text-zinc-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 w-full flex justify-between items-end border-b border-white/5 pb-2">
            <span className="text-[10px] font-mono text-zinc-800">
              ATLAS SOCIETY © 2026
            </span>
            <span className="text-[10px] font-mono text-zinc-800">
              INVITATION ONLY
            </span>
          </div>
        </section>

        <MembershipModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}

export default App;
