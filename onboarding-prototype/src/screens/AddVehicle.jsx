import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, HelpCircle } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'
import { inputStyle, labelStyle, screenBase, headingStyle, subStyle, PrimaryButton } from './SignUp.jsx'

export default function AddVehicle({ next, back, step, total }) {
  const [vin, setVin] = useState('')
  const [focused, setFocused] = useState(false)
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => { setVin('3TMLB5JN1RM038617'); setScanning(false) }, 1400)
  }

  const isValid = vin.length === 17

  return (
    <div style={screenBase}>
      <ProgressBar current={step} total={total} onBack={back} title="Add Your Vehicle" />

      <div style={{ flex: 1, padding: '16px 24px 0' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 style={headingStyle}>Add your vehicle</h2>
          <p style={subStyle}>We'll use your VIN to sync device data with your vehicle.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>

          {/* Scan button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleScan}
            style={{
              width: '100%',
              height: 76,
              borderRadius: 20,
              background: scanning
                ? 'rgba(200,255,0,0.12)'
                : 'rgba(200,255,0,0.07)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: `1.5px dashed ${scanning ? 'rgba(200,255,0,0.7)' : 'rgba(200,255,0,0.3)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              cursor: 'pointer',
              marginBottom: 18,
              transition: 'all 0.25s',
            }}
          >
            {scanning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ width: 22, height: 22, border: '2.5px solid #C8FF00', borderTopColor: 'transparent', borderRadius: '50%' }}
              />
            ) : (
              <Camera size={20} color="#C8FF00" />
            )}
            <span style={{ color: '#C8FF00', fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
              {scanning ? 'Scanning barcode...' : 'Scan VIN barcode'}
            </span>
          </motion.button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>or type manually</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>

          <label style={labelStyle}>Vehicle Identification Number (VIN)</label>
          <div style={{ position: 'relative' }}>
            <input
              maxLength={17}
              placeholder="17 characters, e.g. 3TMLB5JN1RM0..."
              value={vin}
              onChange={e => setVin(e.target.value.toUpperCase())}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                ...inputStyle,
                border: `1.5px solid ${isValid ? 'rgba(74,222,128,0.6)' : focused ? 'rgba(200,255,0,0.6)' : 'rgba(255,255,255,0.09)'}`,
                boxShadow: isValid
                  ? '0 0 0 3px rgba(74,222,128,0.1)'
                  : focused
                    ? '0 0 0 3px rgba(200,255,0,0.1)'
                    : 'none',
                letterSpacing: vin ? '1.5px' : 0,
                fontSize: vin ? 13 : 15,
                fontWeight: vin ? 600 : 400,
                paddingRight: 52,
              }}
            />
            <span style={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: vin.length === 17 ? '#4ade80' : 'rgba(255,255,255,0.28)',
              fontSize: 11.5,
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
            }}>
              {vin.length}/17
            </span>
          </div>

          {isValid && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                marginTop: 10,
                padding: '10px 14px',
                background: 'rgba(74,222,128,0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 13,
                border: '1px solid rgba(74,222,128,0.2)',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
              <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                Match found — Toyota Tacoma 2024
              </span>
            </motion.div>
          )}

          {/* VIN hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 18,
              padding: '14px',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 15,
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <HelpCircle size={17} color="rgba(255,255,255,0.3)" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12.5, lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
              Your VIN is on a sticker inside your driver's door frame, or on the dashboard near the windshield. The barcode scan above reads it automatically.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ padding: '20px 24px 48px' }}
      >
        <PrimaryButton onClick={next} label={isValid ? 'Continue' : 'Skip for now'} />
      </motion.div>
    </div>
  )
}
