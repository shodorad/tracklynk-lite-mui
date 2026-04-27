import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scan, CheckCircle2, Wifi } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'
import { screenBase, headingStyle, subStyle, PrimaryButton, glassCard } from './SignUp.jsx'

export default function ScanDevice({ next, back, step, total }) {
  const [scanned, setScanned] = useState(false)

  const handleScan = () => {
    setTimeout(() => setScanned(true), 1200)
  }

  return (
    <div style={screenBase}>
      <ProgressBar current={step} total={total} onBack={back} title="Connect Device" />

      <div style={{ flex: 1, padding: '16px 24px 0', display: 'flex', flexDirection: 'column' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 style={headingStyle}>Scan your device</h2>
          <p style={subStyle}>Don't have the device yet? No worries — you can skip this and come back later.</p>
        </motion.div>

        {/* Device visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 24 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', gap: 24 }}
        >
          {/* OBD device card */}
          <div style={{ position: 'relative' }}>
            {/* Glow ring */}
            {!scanned && (
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: -12,
                  borderRadius: 30,
                  border: '1px solid rgba(200,255,0,0.25)',
                  pointerEvents: 'none',
                }}
              />
            )}

            <div style={{
              ...glassCard,
              width: 160,
              height: 110,
              borderRadius: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 10,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Device label */}
              <div style={{ position: 'absolute', top: 10, left: 12, right: 12 }}>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace', textAlign: 'center' }}>
                  TRACKLYNK OBD-II
                </p>
              </div>

              {/* Barcode */}
              <div style={{ display: 'flex', gap: 2.5, alignItems: 'center', marginTop: 10 }}>
                {[8, 4, 7, 3, 9, 4, 6, 3, 8, 5, 7, 4, 6].map((h, i) => (
                  <div key={i} style={{
                    width: 2,
                    height: h * 2.8,
                    background: 'rgba(255,255,255,0.65)',
                    borderRadius: 1,
                  }} />
                ))}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8, letterSpacing: '1.5px', fontFamily: 'monospace' }}>
                352602116146553
              </span>

              {/* Scan line */}
              {!scanned && (
                <motion.div
                  animate={{ top: ['18%', '78%', '18%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    left: 8,
                    right: 8,
                    height: 1.5,
                    background: 'linear-gradient(90deg, transparent, #C8FF00 30%, #C8FF00 70%, transparent)',
                    borderRadius: 99,
                    boxShadow: '0 0 6px rgba(200,255,0,0.7)',
                  }}
                />
              )}

              {/* Status LED */}
              <motion.div
                animate={scanned ? { background: ['#4ade80', '#4ade80'] } : { opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 12,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: scanned ? '#4ade80' : '#C8FF00',
                  boxShadow: scanned ? '0 0 6px rgba(74,222,128,0.8)' : '0 0 6px rgba(200,255,0,0.6)',
                }}
              />
            </div>

            {/* Success badge */}
            {scanned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(74,222,128,0.4)',
                }}
              >
                <CheckCircle2 size={18} color="#fff" />
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {scanned ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: 'center',
                  padding: '16px 24px',
                  background: 'rgba(74,222,128,0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 18,
                  border: '1px solid rgba(74,222,128,0.2)',
                }}
              >
                <p style={{ color: '#4ade80', fontWeight: 700, fontSize: 16, fontFamily: 'Inter, sans-serif' }}>
                  Device validated!
                </p>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12.5, marginTop: 4, fontFamily: 'Inter, sans-serif' }}>
                  IMEI: 352602116146553
                </p>
              </motion.div>
            ) : (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, maxWidth: 240, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                  Scan the barcode on the back of the device, or enter the IMEI manually
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!scanned && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleScan}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '13px 26px',
                borderRadius: 16,
                background: 'rgba(200,255,0,0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(200,255,0,0.28)',
                color: '#C8FF00',
                fontSize: 14.5,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 16px rgba(200,255,0,0.12)',
              }}
            >
              <Scan size={17} /> Scan Barcode
            </motion.button>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ padding: '20px 24px 48px' }}
      >
        <PrimaryButton onClick={next} label={scanned ? 'Continue →' : 'Skip for now'} />
      </motion.div>
    </div>
  )
}
