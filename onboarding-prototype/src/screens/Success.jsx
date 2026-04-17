import { motion } from 'framer-motion'
import { MapPin, Bell, Route } from 'lucide-react'
import { PrimaryButton, glassCard } from './SignUp.jsx'
import Car3D from '../components/Car3D.jsx'

const next_steps = [
  { icon: MapPin, title: 'Plug in your device',  desc: 'Insert it into the OBD port under your dashboard.' },
  { icon: Route,  title: 'Start driving',         desc: 'Your first trip will appear within minutes.' },
  { icon: Bell,   title: 'Set up alerts',          desc: 'Geofences, speed limits, trip notifications.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.65 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 360, damping: 28 } },
}

export default function Success({ goTo }) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 44,
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px 0', overflowY: 'auto' }}>

        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          style={{ position: 'relative', marginBottom: 24 }}
        >
          {/* Pulsing rings */}
          {[72, 90, 108].map((size, i) => (
            <motion.div
              key={size}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.18, 0] }}
              transition={{ delay: 0.35 + i * 0.15, duration: 1.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: size,
                height: size,
                borderRadius: '50%',
                border: '1.5px solid #4ade80',
              }}
            />
          ))}

          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #15803d)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 8px 32px rgba(74,222,128,0.38)',
          }}>
            <motion.svg
              width="32" height="32" viewBox="0 0 32 32" fill="none"
            >
              <motion.path
                d="M6 17L13 24L26 9"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
              />
            </motion.svg>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ textAlign: 'center', marginBottom: 8 }}
        >
          <h2 style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: '-0.8px', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
            You're all set!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 14.5, maxWidth: 260, margin: '0 auto', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
            Your TrackLynk account is active. Device validation complete.
          </p>
        </motion.div>

        {/* Status chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          style={{ display: 'flex', gap: 8, margin: '18px 0 24px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {['Plan activated', 'Device ready'].map(label => (
            <div key={label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              background: 'rgba(74,222,128,0.09)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 99,
              border: '1px solid rgba(74,222,128,0.2)',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
              <span style={{ color: '#4ade80', fontSize: 12.5, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Mini car preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            ...glassCard,
            width: '100%',
            padding: '16px 12px 10px',
            marginBottom: 20,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 200,
            height: 30,
            background: 'radial-gradient(ellipse, rgba(74,222,128,0.12) 0%, transparent 70%)',
            filter: 'blur(8px)',
            pointerEvents: 'none',
          }} />
          <div className="car-float" style={{ position: 'relative', zIndex: 1 }}>
            <Car3D width={260} glowColor="#4ade80" />
          </div>
        </motion.div>

        {/* What's next */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 9 }}
        >
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
            What's next
          </p>
          {next_steps.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={item}
              style={{
                display: 'flex',
                gap: 14,
                padding: '13px 15px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 17,
                border: '1px solid rgba(255,255,255,0.09)',
                alignItems: 'flex-start',
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                background: 'rgba(232,101,106,0.1)',
                border: '1px solid rgba(232,101,106,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={17} color="#E8656A" />
              </div>
              <div>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: 13.5, marginBottom: 2, fontFamily: 'Inter, sans-serif' }}>
                  {i + 1}. {title}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, lineHeight: 1.55, fontFamily: 'Inter, sans-serif' }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05 }}
        style={{ padding: '18px 24px 48px' }}
      >
        <PrimaryButton onClick={() => goTo(0)} label="Open TrackLynk" />
      </motion.div>
    </div>
  )
}
