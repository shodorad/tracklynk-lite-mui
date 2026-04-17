import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Welcome from './screens/Welcome.jsx'
import Auth from './screens/Auth.jsx'
import SignUp from './screens/SignUp.jsx'
import AddVehicle from './screens/AddVehicle.jsx'
import VehicleDetails from './screens/VehicleDetails.jsx'
import ScanDevice from './screens/ScanDevice.jsx'
import ChoosePlan from './screens/ChoosePlan.jsx'
import Success from './screens/Success.jsx'

const SCREENS = ['welcome', 'auth', 'signup', 'vehicle', 'details', 'scan', 'plan', 'success']

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

const transition = { type: 'spring', stiffness: 380, damping: 38, mass: 0.8 }

export default function App() {
  const [step, setStep] = useState(0)
  const [dir, setDir]   = useState(1)

  const next = () => { setDir(1);  setStep(s => Math.min(s + 1, SCREENS.length - 1)) }
  const back = () => { setDir(-1); setStep(s => Math.max(s - 1, 0)) }
  const goTo = (i) => { setDir(i > step ? 1 : -1); setStep(i) }

  const screen           = SCREENS[step]
  const onboardingStep   = step - 2   // welcome(0)→-2, auth(1)→-1, signup(2)→0 …
  const totalOnboarding  = 6

  const screenProps = { next, back, goTo, step: onboardingStep, total: totalOnboarding }

  const renderScreen = () => {
    switch (screen) {
      case 'welcome': return <Welcome    {...screenProps} />
      case 'auth':    return <Auth       {...screenProps} />
      case 'signup':  return <SignUp     {...screenProps} />
      case 'vehicle': return <AddVehicle {...screenProps} />
      case 'details': return <VehicleDetails {...screenProps} />
      case 'scan':    return <ScanDevice {...screenProps} />
      case 'plan':    return <ChoosePlan {...screenProps} />
      case 'success': return <Success    {...screenProps} />
      default:        return null
    }
  }

  return (
    /* Outer viewport — deep dark with subtle mesh gradient */
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse 70% 50% at 30% 40%, rgba(80,40,200,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 75% 60%, rgba(20,80,220,0.06) 0%, transparent 60%),
          #04050d
        `,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 48,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.06),
            0 0 0 10px #10121e,
            0 0 0 11px rgba(255,255,255,0.04),
            0 48px 120px rgba(0,0,0,0.75),
            0 0 80px rgba(80,40,200,0.08)
          `,
        }}
      >
        {/* Aurora blobs sit at the very back of the phone, behind all screens */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#060810' }}>
          <div style={{ position: 'absolute', top: -80,  left: '40%',  transform: 'translateX(-50%)', width: 380, height: 380, background: 'radial-gradient(circle, rgba(100,60,255,0.13) 0%, transparent 65%)', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: 60, right: -60, width: 300, height: 300, background: 'radial-gradient(circle, rgba(30,90,255,0.09) 0%, transparent 65%)', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', top: 180, left: -40, width: 220, height: 220, background: 'radial-gradient(circle, rgba(232,101,106,0.08) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        </div>

        {/* Status bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Screen content */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
          <AnimatePresence custom={dir} mode="popLayout" initial={false}>
            <motion.div
              key={screen}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={{ position: 'absolute', inset: 0 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.22)', zIndex: 50 }} />
      </div>
    </div>
  )
}

function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
      <rect x="0"    y="7"   width="3" height="5"  rx="1" fill="rgba(255,255,255,0.75)" />
      <rect x="4.5"  y="4.5" width="3" height="7.5" rx="1" fill="rgba(255,255,255,0.75)" />
      <rect x="9"    y="2"   width="3" height="10"  rx="1" fill="rgba(255,255,255,0.75)" />
      <rect x="13.5" y="0"   width="3" height="12"  rx="1" fill="rgba(255,255,255,0.75)" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 9.5L8 11.5" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5.2 7.2C6.2 6.2 7 5.8 8 5.8C9 5.8 9.8 6.2 10.8 7.2" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M2.5 4.5C4 3 5.9 2 8 2C10.1 2 12 3 13.5 4.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="rgba(255,255,255,0.75)"/>
      <rect x="2" y="2" width="15" height="8" rx="2" fill="rgba(255,255,255,0.75)"/>
      <path d="M23 4V8" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
