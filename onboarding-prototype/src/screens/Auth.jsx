import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fingerprint, Check, ArrowLeft } from 'lucide-react'
import { glassCard } from './SignUp.jsx'

// ─── OAuth brand icons ─────────────────────────────────

function AppleIcon() {
  return (
    <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
      <path
        d="M13.17 10.04c-.02-1.96 1.6-2.9 1.67-2.95-.91-1.33-2.33-1.52-2.83-1.54-1.21-.12-2.37.72-2.99.72-.62 0-1.58-.7-2.59-.68-1.33.02-2.56.78-3.24 1.97C1.4 9.68 2.4 13.5 3.97 15.57c.79 1.13 1.73 2.39 2.96 2.35 1.19-.05 1.64-.77 3.08-.77 1.44 0 1.85.77 3.1.74 1.28-.02 2.09-1.15 2.86-2.28.9-1.31 1.27-2.58 1.29-2.65-.03-.01-2.49-1-.52-3.92l.43.0zM10.6 3.79c.65-.8 1.09-1.9.97-3.01-.94.04-2.07.63-2.74 1.41-.6.69-1.13 1.8-.99 2.86 1.05.08 2.12-.54 2.76-1.26z"
        fill="currentColor"
      />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.25-.164-1.84H9v3.48h4.844c-.209 1.126-.843 2.079-1.796 2.717v2.258h2.908C16.418 14.216 17.64 11.91 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.892 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

// ─── Biometric button ──────────────────────────────────

function FaceIDButton({ onClick }) {
  const [state, setState] = useState('idle') // idle | scanning | verified

  const handlePress = () => {
    if (state !== 'idle') return
    setState('scanning')
    setTimeout(() => setState('verified'), 1100)
    setTimeout(() => { setState('idle'); onClick?.() }, 2100)
  }

  const color = state === 'verified' ? '#4ade80' : '#E8656A'

  return (
    <motion.button
      whileTap={{ scale: 0.90 }}
      onClick={handlePress}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 18px',
        borderRadius: 14,
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${state === 'verified' ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.10)'}`,
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
    >
      {state === 'scanning' ? (
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{ display: 'flex', color }}
        >
          <Fingerprint size={20} color={color} />
        </motion.span>
      ) : state === 'verified' ? (
        <motion.span
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          style={{ display: 'flex' }}
        >
          <Check size={20} color="#4ade80" />
        </motion.span>
      ) : (
        <Fingerprint size={20} color={color} />
      )}
      <div style={{ textAlign: 'left' }}>
        <p style={{
          color: state === 'verified' ? '#4ade80' : '#fff',
          fontSize: 13.5,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.2,
          transition: 'color 0.3s',
        }}>
          {state === 'verified' ? 'Verified' : 'Use Face ID'}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: 11.5, fontFamily: 'Inter, sans-serif' }}>
          Quick, secure re-entry
        </p>
      </div>
    </motion.button>
  )
}

// ─── Main screen ───────────────────────────────────────

export default function Auth({ next, back }) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 44,
      background: 'transparent',
    }}>

      {/* Back button */}
      <div style={{ padding: '12px 20px 0' }}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.90 }}
          onClick={back}
          style={{
            width: 38, height: 38, borderRadius: 13,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={17} color="rgba(255,255,255,0.80)" />
        </motion.button>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '28px 26px 0',
      }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, type: 'spring', stiffness: 300, damping: 28 }}
          style={{ marginBottom: 32 }}
        >
          <h2 style={{
            fontSize: 30,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.8px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: 7,
          }}>
            Create your account
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 14.5, fontFamily: 'Inter, sans-serif' }}>
            Choose how you'd like to get started.
          </p>
        </motion.div>

        {/* OAuth buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >

          {/* Apple — PRIMARY (red gradient, most prominent) */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={next}
            style={{
              width: '100%', height: 54, borderRadius: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'linear-gradient(135deg, #E8656A 0%, #C42B35 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
              letterSpacing: '-0.2px',
              boxShadow: '0 8px 32px rgba(232,101,106,0.36), inset 0 1px 0 rgba(255,255,255,0.14)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <AppleIcon />
            Continue with Apple
          </motion.button>

          {/* Google — SECONDARY (glass outlined) */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={next}
            style={{
              width: '100%', height: 50, borderRadius: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <GoogleIcon />
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '2px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Email — TERTIARY (text link) */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={next}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.55)', fontSize: 15, fontWeight: 600,
              fontFamily: 'Inter, sans-serif', padding: '4px 0',
              textAlign: 'center',
            }}
          >
            Sign up with Email{' '}
            <span style={{ color: '#E8656A' }}>→</span>
          </motion.button>
        </motion.div>

        {/* ── Sign in link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          <span style={{
            color: 'rgba(255,255,255,0.32)',
            fontSize: 13.5,
            fontFamily: 'Inter, sans-serif',
          }}>
            Already have an account?
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={next}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#E8656A', fontSize: 13.5, fontWeight: 700,
              fontFamily: 'Inter, sans-serif', padding: 0,
            }}
          >
            Sign in
          </motion.button>
        </motion.div>

        {/* ── Returning user section ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{
            marginTop: 32,
            ...glassCard,
            borderRadius: 18,
            padding: '18px 18px 18px',
          }}
        >
          <p style={{
            color: 'rgba(255,255,255,0.30)',
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: '0.9px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            marginBottom: 14,
          }}>
            Returning user
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <p style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                marginBottom: 3,
              }}>
                Sign in with Face ID
              </p>
              <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                Instant access to your account
              </p>
            </div>
            <FaceIDButton onClick={next} />
          </div>
        </motion.div>

      </div>

      {/* Spacer pushes legal text to bottom */}
      <div style={{ flex: 1 }} />

      {/* Legal disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32 }}
        style={{
          color: 'rgba(255,255,255,0.20)',
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          padding: '0 32px 44px',
          lineHeight: 1.5,
        }}
      >
        By continuing, you agree to our{' '}
        <span style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'underline' }}>Terms of Service</span>
        {' '}and{' '}
        <span style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'underline' }}>Privacy Policy</span>
      </motion.p>

    </div>
  )
}
