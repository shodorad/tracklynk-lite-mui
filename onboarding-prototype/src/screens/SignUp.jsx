import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'

export default function SignUp({ next, back, step, total }) {
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ first: '', last: '', phone: '', email: '', password: '' })

  return (
    <div style={screenBase}>
      <ProgressBar current={step} total={total} onBack={back} title="Create Account" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 style={headingStyle}>Let's get you set up</h2>
          <p style={subStyle}>Takes under 3 minutes. We'll protect your data.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <Field label="First name" value={form.first} onChange={v => setForm(f => ({...f, first: v}))} placeholder="Jane" />
            <Field label="Last name"  value={form.last}  onChange={v => setForm(f => ({...f, last:  v}))} placeholder="Smith" />
          </div>
          <Field label="Mobile number" value={form.phone} onChange={v => setForm(f => ({...f, phone: v}))} placeholder="+1 (555) 000-0000" type="tel" />
          <Field label="Email address" value={form.email} onChange={v => setForm(f => ({...f, email: v}))} placeholder="jane@email.com" type="email" />

          {/* Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={e => setForm(f => ({...f, password: e.target.value}))}
                style={inputStyle}
              />
              <button
                onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.38)', padding: 0, display: 'flex' }}
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11.5, textAlign: 'center', padding: '4px 0', fontFamily: 'Inter, sans-serif' }}>
            By continuing you agree to our{' '}
            <span style={{ color: '#C8FF00' }}>Terms</span> &amp;{' '}
            <span style={{ color: '#C8FF00' }}>Privacy Policy</span>
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ padding: '20px 24px 48px' }}
      >
        <PrimaryButton onClick={next} label="Continue" />
      </motion.div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ flex: 1 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          border: `1.5px solid ${focused ? 'rgba(200,255,0,0.6)' : 'rgba(255,255,255,0.09)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(200,255,0,0.1)' : 'none',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   Shared styles exported for other screens
───────────────────────────────────────── */

export const screenBase = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 44,
  background: 'transparent',
  position: 'relative',
}

export const headingStyle = {
  fontSize: 26,
  fontWeight: 800,
  color: '#fff',
  marginBottom: 6,
  letterSpacing: '-0.6px',
  fontFamily: 'Inter, sans-serif',
}

export const subStyle = {
  color: 'rgba(255,255,255,0.42)',
  fontSize: 14,
  marginBottom: 24,
  fontFamily: 'Inter, sans-serif',
}

export const labelStyle = {
  color: 'rgba(255,255,255,0.48)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 8,
  fontFamily: 'Inter, sans-serif',
}

export const inputStyle = {
  width: '100%',
  height: 50,
  borderRadius: 14,
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1.5px solid rgba(255,255,255,0.09)',
  color: '#fff',
  fontSize: 15,
  padding: '0 16px',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export function PrimaryButton({ onClick, label, disabled }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        height: 54,
        borderRadius: 18,
        background: disabled
          ? 'rgba(255,255,255,0.06)'
          : 'linear-gradient(135deg, #C8FF00 0%, #8FB800 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: disabled ? 'rgba(255,255,255,0.3)' : '#000',
        fontSize: 16,
        fontWeight: 700,
        cursor: disabled ? 'default' : 'pointer',
        letterSpacing: '-0.2px',
        boxShadow: disabled ? 'none' : '0 8px 28px rgba(200,255,0,0.28), inset 0 1px 0 rgba(255,255,255,0.25)',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.2s',
      }}
    >
      {label}
    </motion.button>
  )
}

export const glassCard = {
  background: 'rgba(255,255,255,0.055)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 20,
}
