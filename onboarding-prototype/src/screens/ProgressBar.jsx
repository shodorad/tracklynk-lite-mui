import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function ProgressBar({ current, total, onBack, title }) {
  const stepNumber = current + 1
  const pct = ((current + 1) / total) * 100

  return (
    <div style={{ padding: '12px 20px 16px', paddingTop: 54 }}>
      {/* Back button + label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onBack}
          style={{
            width: 38,
            height: 38,
            borderRadius: 13,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={17} color="rgba(255,255,255,0.8)" />
        </motion.button>

        <div style={{ flex: 1 }}>
          <p style={{
            color: 'rgba(255,255,255,0.38)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            marginBottom: 2,
            fontFamily: 'Inter, sans-serif',
          }}>
            Step {stepNumber} of {total}
          </p>
          <p style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{title}</p>
        </div>

        <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          {Math.round(pct)}%
        </span>
      </div>

      {/* Progress track */}
      <div style={{
        height: 3.5,
        borderRadius: 99,
        background: 'rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: `${(current / total) * 100}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          style={{
            height: '100%',
            borderRadius: 99,
            background: 'linear-gradient(90deg, #E8656A, #F29097)',
            boxShadow: '0 0 8px rgba(232,101,106,0.5)',
          }}
        />
      </div>

      {/* Step dots */}
      <div style={{ display: 'flex', gap: 5, marginTop: 10, justifyContent: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === current ? 22 : 6,
              background: i <= current ? '#E8656A' : 'rgba(255,255,255,0.1)',
              boxShadow: i === current ? '0 0 8px rgba(232,101,106,0.5)' : 'none',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{ height: 6, borderRadius: 99 }}
          />
        ))}
      </div>
    </div>
  )
}
