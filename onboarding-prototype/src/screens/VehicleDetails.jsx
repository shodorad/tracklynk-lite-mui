import { useState } from 'react'
import { motion } from 'framer-motion'
import ProgressBar from './ProgressBar.jsx'
import { inputStyle, labelStyle, screenBase, headingStyle, subStyle, PrimaryButton, glassCard } from './SignUp.jsx'
import Car3D from '../components/Car3D.jsx'

export default function VehicleDetails({ next, back, step, total }) {
  const [nickname, setNickname] = useState('')
  const [plate, setPlate] = useState('')
  const [focused, setFocused] = useState(null)

  return (
    <div style={screenBase}>
      <ProgressBar current={step} total={total} onBack={back} title="Vehicle Details" />

      <div style={{ flex: 1, padding: '16px 24px 0', overflowY: 'auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 style={headingStyle}>Name your vehicle</h2>
          <p style={subStyle}>Optional — helps you identify it in the app.</p>
        </motion.div>

        {/* 3D Car preview card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, type: 'spring', stiffness: 280, damping: 26 }}
          style={{
            ...glassCard,
            padding: '20px 16px 14px',
            marginBottom: 22,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background glow inside card */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: 240, height: 60,
            background: 'radial-gradient(ellipse, rgba(232,101,106,0.12) 0%, transparent 70%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }} />

          {/* Car SVG */}
          <div className="car-float" style={{ position: 'relative', zIndex: 1 }}>
            <Car3D width={310} />
          </div>

          {/* Vehicle info row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
            position: 'relative',
            zIndex: 1,
          }}>
            <div>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
                {nickname || 'My Vehicle'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                Toyota Tacoma 2024
              </p>
            </div>
            <div style={{
              background: 'rgba(74,222,128,0.12)',
              border: '1px solid rgba(74,222,128,0.22)',
              borderRadius: 99,
              padding: '4px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}
                />
                <span style={{ color: '#4ade80', fontSize: 11, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Parked</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div>
            <label style={labelStyle}>
              Nickname{' '}
              <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <input
              placeholder="e.g. Daily Driver, Work Truck..."
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              onFocus={() => setFocused('nick')}
              onBlur={() => setFocused(null)}
              style={{
                ...inputStyle,
                border: `1.5px solid ${focused === 'nick' ? 'rgba(232,101,106,0.6)' : 'rgba(255,255,255,0.09)'}`,
                boxShadow: focused === 'nick' ? '0 0 0 3px rgba(232,101,106,0.1)' : 'none',
              }}
            />
          </div>

          <div>
            <label style={labelStyle}>
              License Plate{' '}
              <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <input
              placeholder="e.g. ABC 1234"
              value={plate}
              onChange={e => setPlate(e.target.value.toUpperCase())}
              onFocus={() => setFocused('plate')}
              onBlur={() => setFocused(null)}
              style={{
                ...inputStyle,
                letterSpacing: plate ? '2.5px' : 0,
                fontWeight: plate ? 700 : 400,
                border: `1.5px solid ${focused === 'plate' ? 'rgba(232,101,106,0.6)' : 'rgba(255,255,255,0.09)'}`,
                boxShadow: focused === 'plate' ? '0 0 0 3px rgba(232,101,106,0.1)' : 'none',
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ padding: '20px 24px 48px' }}
      >
        <PrimaryButton onClick={next} label="Continue" />
      </motion.div>
    </div>
  )
}
