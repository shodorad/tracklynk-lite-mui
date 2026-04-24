import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Shield, Zap, Check } from 'lucide-react'
import Car3D from '../components/Car3D.jsx'

// ─── Data ─────────────────────────────────────────────

const featureItems = [
  { icon: MapPin, title: 'Real-time tracking',  desc: 'Know exactly where your vehicle is, always.' },
  { icon: Shield, title: 'Instant alerts',       desc: 'Speed, geofence & trip notifications instantly.' },
  { icon: Zap,    title: 'Plug in and go',       desc: 'OBD device setup in under 2 minutes.' },
]

const planFeatures = [
  'Real-time GPS tracking',
  'Unlimited trip history',
  'Geofence zones',
  'Multi-vehicle dashboard',
]

const TOTAL_SLIDES = 3
const AUTO_ADVANCE_MS = 4500

// ─── Animation variants ───────────────────────────────

const slideVariants = {
  enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   d => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
}
const slideSpring = { type: 'spring', stiffness: 380, damping: 38, mass: 0.8 }

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 360, damping: 28 } },
}

// ─── Slide 1: Hero ────────────────────────────────────

function HeroSlide() {
  return (
    /* Outer: fill carousel height, center the whole content block vertically */
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 0 4px',
      gap: 0,
    }}>

      {/* Wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          fontSize: 42, fontWeight: 900, color: '#fff',
          letterSpacing: '-1.8px', lineHeight: 1,
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center', marginBottom: 8,
        }}
      >
        Track<span style={{ color: '#C8FF00' }}>Lynk</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.14 }}
        style={{
          color: 'rgba(255,255,255,0.38)', fontSize: 14,
          fontFamily: 'Inter, sans-serif', marginBottom: 18, textAlign: 'center',
        }}
      >
        Know where your vehicle is — always.
      </motion.p>

      {/* Car — natural height, no flex stretching */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.18, type: 'spring', stiffness: 240, damping: 26 }}
        className="car-float"
        style={{ position: 'relative', width: '100%' }}
      >
        <Car3D width={360} />
      </motion.div>

      {/* Trust badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, marginTop: 14,
        }}
      >
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 24, height: 24, borderRadius: 7,
            background: 'rgba(200,255,0,0.10)',
            border: '1px solid rgba(200,255,0,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
              <path d="M11.5 5.3L10.6 3H3.4L2.5 5.3H11.5Z" fill="#C8FF00" opacity="0.9"/>
              <rect x="1" y="5.3" width="12" height="3" rx="1" fill="#C8FF00" opacity="0.7"/>
              <circle cx="3.5" cy="9" r="1.2" fill="#C8FF00"/>
              <circle cx="10.5" cy="9" r="1.2" fill="#C8FF00"/>
            </svg>
          </div>
        ))}
        <span style={{
          color: 'rgba(255,255,255,0.40)', fontSize: 12.5,
          fontFamily: 'Inter, sans-serif', fontWeight: 500,
        }}>
          10,000+ vehicles protected
        </span>
      </motion.div>
    </div>
  )
}

// ─── Slide 2: Features ────────────────────────────────

function FeaturesSlide() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        style={{ marginBottom: 24 }}
      >
        <h2 style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.8px',
          fontFamily: 'Inter, sans-serif',
          marginBottom: 6,
        }}>
          Everything you need
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
          One device. Full vehicle intelligence.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {featureItems.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 18,
              background: 'rgba(255,255,255,0.055)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 13, flexShrink: 0,
              background: 'rgba(200,255,0,0.10)',
              border: '1px solid rgba(200,255,0,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={19} color="#C8FF00" />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 3, fontFamily: 'Inter, sans-serif' }}>
                {title}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12.5, fontFamily: 'Inter, sans-serif' }}>
                {desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Slide 3: Pricing ─────────────────────────────────

function PricingSlide() {
  const [annual, setAnnual] = useState(false)
  const price = annual ? 7.99 : 9.65

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        style={{ marginBottom: 18 }}
      >
        <h2 style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.8px',
          fontFamily: 'Inter, sans-serif',
          marginBottom: 6,
        }}>
          Simple pricing
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
          No contracts. Cancel any time.
        </p>
      </motion.div>

      {/* Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: 3, marginBottom: 16, position: 'relative',
        }}
      >
        <motion.div
          animate={{ x: annual ? '100%' : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'absolute', top: 3, bottom: 3, width: 'calc(50% - 3px)',
            background: 'rgba(200,255,0,0.12)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: 9,
            border: '1px solid rgba(200,255,0,0.25)',
          }}
        />
        {['Monthly', 'Annual'].map((label, i) => (
          <button
            key={label}
            onClick={() => setAnnual(i === 1)}
            style={{
              flex: 1, padding: '8px 0', background: 'none', border: 'none',
              color: (i === 1) === annual ? '#C8FF00' : 'rgba(255,255,255,0.4)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              position: 'relative', zIndex: 1,
              fontFamily: 'Inter, sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            {label}
            {i === 1 && (
              <span style={{
                fontSize: 9, background: 'rgba(74,222,128,0.15)', color: '#4ade80',
                padding: '2px 6px', borderRadius: 99, fontWeight: 700,
                border: '1px solid rgba(74,222,128,0.2)',
              }}>
                SAVE $21
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Price card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          background: 'rgba(255,255,255,0.055)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 20, padding: '20px', position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 130, height: 130,
          background: 'radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, marginBottom: 14 }}>
          <motion.span
            key={price}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: 42, fontWeight: 900, color: '#fff', lineHeight: 1,
              fontFamily: 'Inter, sans-serif', letterSpacing: '-1.5px',
            }}
          >
            ${price.toFixed(2)}
          </motion.span>
          <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
            /mo{annual && ', billed yearly'}
          </span>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 14 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {planFeatures.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 99, flexShrink: 0,
                background: 'rgba(200,255,0,0.10)',
                border: '1px solid rgba(200,255,0,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={11} color="#C8FF00" />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>{f}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────

export default function Welcome({ next, goTo, onEnterApp }) {
  const [slide, setSlide] = useState(0)
  const [dir, setDir]     = useState(1)
  const timerRef          = useRef(null)

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDir(1)
      setSlide(s => (s + 1) % TOTAL_SLIDES)
    }, AUTO_ADVANCE_MS)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const goToSlide = (i) => {
    if (i === slide) return
    setDir(i > slide ? 1 : -1)
    setSlide(i)
    startTimer()
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60 && slide < TOTAL_SLIDES - 1) {
      setDir(1); setSlide(s => s + 1); startTimer()
    } else if (info.offset.x > 60 && slide > 0) {
      setDir(-1); setSlide(s => s - 1); startTimer()
    }
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 44,
      background: 'transparent',
    }}>

      {/* ── Carousel ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.div
            key={slide}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideSpring}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            style={{ position: 'absolute', inset: 0 }}
          >
            {slide === 0 && <HeroSlide />}
            {slide === 1 && <FeaturesSlide />}
            {slide === 2 && <PricingSlide />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dot indicators (breathing room above CTA section) ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
        padding: '18px 0 22px',
      }}>
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <motion.div
            key={i}
            onClick={() => goToSlide(i)}
            animate={{
              width: i === slide ? 24 : 6,
              background: i === slide ? '#C8FF00' : 'rgba(255,255,255,0.20)',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ height: 6, borderRadius: 99, cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* ── CTA section — NO auth here, just entry points ── */}
      <div style={{ padding: '0 24px 44px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Primary: Get Started */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.97 }}
          onClick={next}
          style={{
            width: '100%', height: 54, borderRadius: 18,
            background: 'linear-gradient(135deg, #C8FF00 0%, #8FB800 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#000', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            letterSpacing: '-0.2px',
            boxShadow: '0 8px 32px rgba(200,255,0,0.30), inset 0 1px 0 rgba(255,255,255,0.25)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Get Started →
        </motion.button>

        {/* Secondary: Test drive */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnterApp}
          style={{
            width: '100%', height: 48, borderRadius: 16,
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.72)', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          }}
        >
          Test drive the app
        </motion.button>

        {/* Tertiary: Sign in link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          whileTap={{ scale: 0.97 }}
          onClick={next}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.35)', fontSize: 14,
            fontFamily: 'Inter, sans-serif', padding: '4px 0',
          }}
        >
          Already have an account?{' '}
          <span style={{ color: '#C8FF00', fontWeight: 700 }}>Sign In</span>
        </motion.button>

      </div>
    </div>
  )
}
