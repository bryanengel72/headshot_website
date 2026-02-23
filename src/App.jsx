import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, ArrowRight, Activity, ShieldCheck, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── UTILITY COMPONENTS ───

const MagneticButton = ({ children, className = '', ...props }) => (
  <button
    className={`btn-magnetic group flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors ${className}`}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="absolute inset-0 z-0 scale-y-0 transform bg-black/10 transition-transform duration-500 origin-bottom group-hover:scale-y-100 rounded-full"></span>
  </button>
);

// ─── 1. NAVBAR ───

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-6 z-40 mx-auto max-w-5xl px-4 sm:px-6">
      <div
        className={`flex items-center justify-between rounded-full px-6 py-4 transition-all duration-500 ${scrolled
          ? 'bg-obsidian/80 backdrop-blur-xl border border-white/5 text-ivory shadow-lg'
          : 'bg-transparent text-ivory'
          }`}
      >
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-serif text-2xl font-bold italic text-champagne">101</span>
          <span className="hidden sm:inline font-sans text-sm font-semibold tracking-wider uppercase">Headshots</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-white/40">
          <a href="#approach" className="hover-lift hover:text-ivory transition-colors">Approach</a>
          <a href="#process" className="hover-lift hover:text-ivory transition-colors">Process</a>
          <a href="#pricing" className="hover-lift hover:text-ivory transition-colors">Pricing</a>
        </div>

        <MagneticButton className="bg-ivory text-obsidian text-sm font-semibold hover:bg-ivory/90">
          Book Session
        </MagneticButton>
      </div>
    </nav>
  );
};

// ─── 2. HERO ───

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
      tl.from('.hero-text', { y: 50, opacity: 0, stagger: 0.08 })
        .from('.hero-cta', { y: 20, opacity: 0 }, '-=0.8')
        .from('.hero-scroll-hint', { y: 10, opacity: 0 }, '-=0.4');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative flex min-h-[100dvh] w-full items-center bg-obsidian overflow-hidden pb-12">
      {/* Left Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:w-1/2 lg:pl-[8%] xl:pl-[12%] pt-16">
        <p className="hero-text font-mono text-xs uppercase tracking-[0.2em] text-champagne mb-4 block">
          Professional Headshot Photography
        </p>
        <h1 className="hero-text font-serif text-4xl leading-[1.1] font-bold text-ivory md:text-6xl lg:text-7xl">
          Headshot<br />
          Photography<br />
          meets <span className="text-champagne italic">Unforgettable Precision.</span>
        </h1>
        <p className="hero-text mt-6 max-w-md font-sans text-base leading-relaxed text-white/50">
          Documentary-style authenticity meets dark editorial precision. We capture who you actually are — delivered the same day.
        </p>
        <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton className="bg-champagne text-obsidian font-semibold px-8 py-4 text-base">
            Book a Session <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <a href="#approach" className="font-mono text-xs uppercase tracking-widest text-white/40 hover:text-ivory transition-colors hover-lift">
            See our work →
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div className="absolute right-0 top-0 hidden h-full w-[50%] lg:block">
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2487&auto=format&fit=crop"
          alt="Dark moody editorial headshot"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/40 to-transparent z-0"></div>
      </div>

      {/* Scroll Hint */}
      <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
};

// ─── 3. FEATURES (Interactive Functional Artifacts) ───

// Card 1: Diagnostic Shuffler — Documentary-Style Authenticity
const DiagnosticShuffler = () => {
  const cards = [
    { id: 1, title: 'Candid Moments', desc: 'Capturing genuine expressions between directed poses.' },
    { id: 2, title: 'Natural Light', desc: 'Reading and shaping available light for authentic skin tone.' },
    { id: 3, title: 'Real Emotion', desc: 'Coaching micro-expressions that convey warmth and trust.' },
  ];
  const [activeCards, setActiveCards] = useState(cards);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCards((prev) => {
        const arr = [...prev];
        const last = arr.pop();
        arr.unshift(last);
        return arr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-56 w-full z-10">
      {activeCards.map((card, index) => (
        <div
          key={card.id}
          className="absolute inset-0 flex flex-col justify-center rounded-[2rem] border border-white/5 bg-slate/40 backdrop-blur-md p-6 shadow-lg transition-all duration-700"
          style={{
            transform: `translateY(${index * 10}px) scale(${1 - index * 0.04})`,
            zIndex: 10 - index,
            opacity: 1 - index * 0.25,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div className={`mb-2 font-mono text-xs ${index === 0 ? 'text-champagne' : 'text-white/30'}`}>
            0{card.id}
          </div>
          <h4 className="font-sans text-lg font-bold text-ivory">{card.title}</h4>
          <p className="mt-2 text-sm text-white/50">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

// Card 2: Telemetry Typewriter — Same-Day Delivery
const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const messages = [
    "Selects delivered to inbox...",
    "Retouching pipeline activated...",
    "Color grading complete...",
    "Finals ready. Same day.",
  ];

  useEffect(() => {
    let currentText = '';
    let charIndex = 0;
    let typingInterval;

    if (isTyping) {
      typingInterval = setInterval(() => {
        const fullText = messages[messageIndex];
        currentText += fullText[charIndex];
        setText(currentText);
        charIndex++;
        if (charIndex >= fullText.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
            setText('');
            setIsTyping(true);
          }, 2000);
        }
      }, 50);
    }
    return () => clearInterval(typingInterval);
  }, [messageIndex, isTyping]);

  return (
    <div className="flex h-56 w-full flex-col justify-between rounded-[2rem] border border-white/5 bg-slate/40 backdrop-blur-md p-6 shadow-lg z-10 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-champagne">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne"></span>
          </span>
          Live Pipeline
        </div>
        <Activity className="h-4 w-4 text-white/20" />
      </div>
      <div className="font-mono text-sm leading-relaxed text-ivory">
        <span className="text-white/30">&gt; </span>{text}
        <span className="ml-[1px] animate-pulse text-champagne">_</span>
      </div>
    </div>
  );
};

// Card 3: Cursor Protocol Scheduler — Studio or On-Location
const CursorProtocolScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const targetDayRef = useRef(null);
  const saveBtnRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, defaults: { ease: 'power2.inOut' } });

      tl.set(cursorRef.current, { x: -50, y: -50, opacity: 0 })
        .set(targetDayRef.current, { backgroundColor: 'transparent', color: '#111111' })

        .to(cursorRef.current, { opacity: 1, duration: 0.2 })
        .to(cursorRef.current, { x: 90, y: 60, duration: 1 })

        .to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: 'power1.in' })
        .to(cursorRef.current, { scale: 1, duration: 0.1, ease: 'power1.out' })
        .set(targetDayRef.current, { backgroundColor: '#E8553D', color: '#FFFFFF' }, '<')

        .to(cursorRef.current, { x: 140, y: 140, duration: 0.8 }, '+=0.3')

        .to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: 'power1.in' })
        .to(cursorRef.current, { scale: 1, duration: 0.1, ease: 'power1.out' })
        .to(saveBtnRef.current, { backgroundColor: '#E8553D', color: '#FFFFFF', duration: 0.15 }, '<')

        .to(cursorRef.current, { opacity: 0, duration: 0.2, delay: 0.5 })
        .set(saveBtnRef.current, { backgroundColor: 'transparent', color: '#E8553D' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div ref={containerRef} className="relative flex h-56 w-full flex-col rounded-[2rem] border border-white/5 bg-slate/40 backdrop-blur-md p-6 shadow-lg overflow-hidden z-10">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-4 w-4 text-champagne" />
        <h4 className="font-sans text-base font-bold text-ivory">Book Your Location</h4>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((day, i) => (
          <div key={i} className="flex aspect-square items-center justify-center rounded-lg font-mono text-[10px] text-white/40">
            {day}
          </div>
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i + 7}
            ref={i === 9 ? targetDayRef : null}
            className="flex aspect-square items-center justify-center rounded-lg bg-obsidian font-mono text-xs text-white/50 transition-colors"
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-end">
        <div ref={saveBtnRef} className="rounded-full border border-champagne/40 px-3 py-1 font-mono text-[10px] uppercase text-champagne transition-all">
          Confirm Date
        </div>
      </div>

      <svg
        ref={cursorRef}
        className="absolute left-0 top-0 z-10 w-5 h-5 drop-shadow-md"
        viewBox="0 0 24 24"
        fill="#FAF8F5"
        stroke="#0D0D12"
        strokeWidth="1.5"
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      </svg>
    </div>
  );
};

// Features Container
const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card-wrapper', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
        duration: 1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="approach" className="relative z-30 mx-auto max-w-7xl px-6 sm:px-12 py-32 bg-obsidian text-ivory">
      <div className="mb-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne mb-3">What Sets Us Apart</p>
        <h2 className="font-serif text-4xl font-bold italic text-ivory md:text-6xl">Three promises, zero compromise.</h2>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="feature-card-wrapper flex flex-col gap-5">
          <DiagnosticShuffler />
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-ivory">Documentary-Style Authenticity</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">No stiff poses. We capture the real you — the version that earns trust before you say a word.</p>
          </div>
        </div>

        <div className="feature-card-wrapper flex flex-col gap-5">
          <TelemetryTypewriter />
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-ivory">Same-Day Delivery</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">Review selects on-site, receive retouched finals before the day is over. No waiting weeks.</p>
          </div>
        </div>

        <div className="feature-card-wrapper flex flex-col gap-5">
          <CursorProtocolScheduler />
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-ivory">Studio or On-Location</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">Our studio or your space — we bring the lights, the direction, and the energy wherever you need it.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 4. PHILOSOPHY ───

const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.manifesto-line').forEach((line) => {
        gsap.from(line, {
          scrollTrigger: { trigger: line, start: 'top 85%' },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative flex min-h-[60vh] items-center justify-center bg-obsidian px-6 py-32 sm:px-12 overflow-hidden">
      <div className="absolute inset-0 opacity-20 z-0">
        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2564&auto=format&fit=crop" alt="Dark marble luxury texture" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="manifesto-line mb-8 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
          Most headshot studios give you: a photo.
        </p>
        <h2 className="manifesto-line font-serif text-4xl leading-tight text-ivory md:text-6xl lg:text-7xl">
          We give you: <br />
          <span className="text-champagne italic font-bold">a competitive advantage.</span>
        </h2>
        <p className="manifesto-line mt-10 mx-auto max-w-lg font-sans text-base leading-relaxed text-slate">
          Your headshot is your handshake before the handshake. It's the first 3 seconds that decide whether someone reads further, clicks connect, or books the call.
        </p>
      </div>
    </section>
  );
};

// ─── 5. PROTOCOL (Sticky Stacking Archive) ───

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      const totalScroll = cards.length * 100 + 'vh';

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: true,
        pinSpacing: true,
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        gsap.to(cards[i - 1], {
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top -${(i - 1) * window.innerHeight}px`,
            end: () => `top -${i * window.innerHeight}px`,
            scrub: true,
          },
          scale: 0.92,
          opacity: 0.4,
          filter: 'blur(15px)',
          ease: 'none',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      id: '01',
      title: 'Plan & Prep',
      desc: 'We discuss your goals, industry, and the impression you want to make. Wardrobe guidance included.',
      Visual: () => (
        <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-slate/50">
          <div className="animate-[spin_40s_linear_infinite]">
            <svg width="160" height="160" viewBox="0 0 200 200" fill="none" className="text-champagne/30">
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" />
              <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: '02',
      title: 'Shoot & Direct',
      desc: 'Guided session with real-time tethered review. You see every frame as it happens — no guesswork.',
      Visual: () => (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-slate/50">
          <div className="absolute left-0 top-0 h-[2px] w-full translate-y-[80px] animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] bg-champagne shadow-[0_0_15px_2px_rgba(201,168,76,0.5)]"></div>
          <div className="grid h-full w-full grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[repeat(8,minmax(0,1fr))] gap-3 p-8 opacity-20">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="rounded-full bg-ivory"></div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: '03',
      title: 'Edit & Deliver',
      desc: 'Non-destructive retouching with same-day turnaround. Secure gallery delivery — no social media uploads required.',
      Visual: () => (
        <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-slate/50">
          <svg preserveAspectRatio="none" viewBox="0 0 1000 100" className="h-24 w-[80%] text-champagne/40">
            <path
              className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              d="M0,50 L200,50 L220,20 L240,80 L260,50 L1000,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section ref={containerRef} id="process" className="relative h-screen w-full bg-obsidian">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="protocol-card absolute inset-0 flex h-full w-full items-center justify-center p-6 md:p-12"
          style={{ zIndex: index }}
        >
          <div className="relative flex h-[80vh] w-full max-w-6xl flex-col overflow-hidden rounded-[3rem] border border-white/5 bg-slate shadow-2xl md:h-[70vh] md:flex-row">
            <div className="flex w-full flex-col justify-between p-10 md:w-1/2 md:p-16">
              <div className="font-mono text-6xl font-light text-champagne/20 md:text-8xl">{step.id}</div>
              <div className="mt-8 md:mt-0">
                <h3 className="font-sans text-3xl font-bold tracking-tight text-ivory md:text-5xl">{step.title}</h3>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/50 md:max-w-md">{step.desc}</p>
              </div>
            </div>
            <div className="hidden w-1/2 p-6 md:block">
              <step.Visual />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

// ─── 6. PRICING ───

const Pricing = () => {
  const packages = [
    {
      name: 'The Standard',
      price: '$250',
      desc: 'One look, one great headshot. Perfect for LinkedIn updates.',
      features: ['30-Min Session', '1 Retouched Final', 'Studio Backdrop', 'Same-Day Delivery'],
      highlight: false,
    },
    {
      name: 'The Professional',
      price: '$450',
      desc: 'The full experience — multiple looks, multiple finals.',
      features: ['90-Min Session', '5 Retouched Finals', 'Studio or On-Location', 'Same-Day Delivery', 'Wardrobe Guidance'],
      highlight: true,
    },
    {
      name: 'The Executive',
      price: '$850',
      desc: 'Complete personal branding for founders and C-suite.',
      features: ['Half-Day Session', '12 Retouched Finals', '3 Environments', 'Same-Day Delivery', 'Commercial Usage Rights'],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="relative bg-obsidian py-32 px-6 sm:px-12 text-ivory">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne mb-3">Investment</p>
          <h2 className="font-serif text-4xl font-bold italic md:text-5xl">Straightforward pricing.</h2>
          <p className="mt-4 font-sans text-base text-white/50">No hidden fees. No surprise charges.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 items-center">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-[2.5rem] p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2 ${pkg.highlight
                ? 'bg-[#15151A] border border-champagne/40 text-ivory ring-1 ring-champagne md:scale-105 shadow-[0_0_30px_rgba(201,168,76,0.15)] z-10'
                : 'bg-slate/40 backdrop-blur-md border border-white/5 text-ivory shadow-xl'
                }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-champagne px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[#15151A]">
                  Most Popular
                </div>
              )}

              <h3 className="font-serif text-3xl italic">{pkg.name}</h3>
              <div className="mt-4 font-sans text-4xl font-bold tracking-tight">{pkg.price}</div>
              <p className={`mt-4 text-sm leading-relaxed ${pkg.highlight ? 'text-white/60' : 'text-white/40'}`}>
                {pkg.desc}
              </p>

              <ul className="mt-8 mb-10 space-y-4 flex-grow">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 font-mono text-xs">
                    <ShieldCheck className={`h-4 w-4 ${pkg.highlight ? 'text-champagne' : 'text-white/20'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton
                className={`w-full ${pkg.highlight
                  ? 'bg-champagne text-obsidian pb-4 pt-3.5'
                  : 'bg-slate text-ivory hover:bg-ivory hover:text-obsidian pb-4 pt-3.5'
                  }`}
              >
                Book Session
              </MagneticButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 7. FOOTER ───

const Footer = () => (
  <footer className="relative bg-[#0a0a0e] text-white/80 px-6 py-16 sm:px-12 pt-24 rounded-t-[4rem] z-20">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 md:grid-cols-4 lg:gap-24">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-serif text-3xl font-bold italic text-champagne">101</span>
            <span className="font-sans text-lg font-semibold tracking-wider uppercase">Headshots</span>
          </div>
          <p className="font-sans text-sm leading-relaxed text-white/40 max-w-sm">
            Professional headshot photography bridging the gap between documentary authenticity and editorial precision.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-6">Connect</h4>
          <ul className="space-y-4 text-sm font-sans">
            <li><a href="#" className="hover:text-champagne transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Email Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-6">Legal</h4>
          <ul className="space-y-4 text-sm font-sans">
            <li><a href="#" className="hover:text-champagne transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Usage Rights</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="font-mono text-xs text-white/30">
          © {new Date().getFullYear()} 101 Headshots. All rights reserved.
        </p>

        <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne"></span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-champagne">System Operational</span>
        </div>
      </div>
    </div>
  </footer>
);

// ─── APP ───

function App() {
  return (
    <main className="relative bg-warmwhite min-h-screen selection:bg-coral/20 selection:text-coral font-sans">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </main>
  );
}

export default App;
