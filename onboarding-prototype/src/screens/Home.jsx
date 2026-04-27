import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleMap, useJsApiLoader, Polyline, Marker } from '@react-google-maps/api'
import {
  ChevronDown, Bell, Zap, Route, AlertTriangle,
  MapPin, Gauge, Wifi, LocateFixed, Mic, Send,
  BatteryMedium, Cpu, History,
} from 'lucide-react'

// ─── Google Map ───────────────────────────────────────

const DARK_MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#0d0d14' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0d0d14' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.land_parcel', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a1a24' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#242430' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f1f2e' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
  { featureType: 'road.local', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#060d14' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
]

const ROUTE_PATH = [
  { lat: 40.7484, lng: -73.9967 },
  { lat: 40.7495, lng: -73.9875 },
  { lat: 40.7530, lng: -73.9826 },
  { lat: 40.7559, lng: -73.9800 },
  { lat: 40.7580, lng: -73.9758 },
  { lat: 40.7614, lng: -73.9776 },
]

const CAR_POSITION = ROUTE_PATH[0]
const DEST_POSITION = ROUTE_PATH[ROUTE_PATH.length - 1]
const MAP_CENTER = { lat: 40.7550, lng: -73.9870 }

const MAP_OPTIONS = {
  styles: DARK_MAP_STYLES,
  disableDefaultUI: true,
  gestureHandling: 'cooperative',
  clickableIcons: false,
  zoomControl: false,
  streetViewControl: false,
  fullscreenControl: false,
}

const POLYLINE_OPTIONS = {
  strokeColor: '#C8FF00',
  strokeOpacity: 0.95,
  strokeWeight: 4,
  zIndex: 1,
}

function MapView() {
  const mapRef = useRef(null)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  })

  const onLoad = useCallback((map) => { mapRef.current = map }, [])

  const carIcon = isLoaded ? {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: '#C8FF00',
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 2,
  } : null

  const destIcon = isLoaded ? {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 7,
    fillColor: '#fff',
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 2,
  } : null

  if (loadError) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#0d0d14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>Map unavailable</p>
      </div>
    )
  }

  if (!isLoaded) {
    return <div style={{ width: '100%', height: '100%', background: '#0d0d14' }} />
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={MAP_CENTER}
      zoom={14}
      options={MAP_OPTIONS}
      onLoad={onLoad}
    >
      <Polyline path={ROUTE_PATH} options={POLYLINE_OPTIONS} />
      <Marker position={CAR_POSITION} icon={carIcon} />
      <Marker position={DEST_POSITION} icon={destIcon} />
    </GoogleMap>
  )
}

// ─── Floating Header ──────────────────────────────────

function FloatingHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 28 }}
      style={{
        position: 'absolute',
        top: 52,
        left: 12,
        right: 12,
        zIndex: 30,
        background: 'rgba(10,12,20,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.4px' }}>
            Toyota Tacoma
          </span>
          <ChevronDown size={12} color="rgba(255,255,255,0.38)" />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.26)', fontSize: 10, fontFamily: 'Inter, sans-serif', marginTop: 1 }}>
          OBD-II · 352602116146553
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <motion.button whileTap={{ scale: 0.90 }} style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Bell size={13} color="rgba(255,255,255,0.55)" />
        </motion.button>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'linear-gradient(135deg, #C8FF00, #8FB800)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800, color: '#000', fontFamily: 'Inter, sans-serif',
        }}>S</div>
      </div>
    </motion.div>
  )
}

// ─── Trip Info Card ───────────────────────────────────

function TripInfoCard() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.28, type: 'spring', stiffness: 300, damping: 28 }}
      style={{
        position: 'absolute',
        top: 116,
        left: 12,
        right: 12,
        background: 'rgba(12,15,22,0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 18,
        padding: '10px 12px',
        zIndex: 20,
        display: 'flex', alignItems: 'center', gap: 10,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <div style={{
            background: 'rgba(200,255,0,0.12)',
            border: '1px solid rgba(200,255,0,0.22)',
            borderRadius: 99, padding: '2px 8px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Zap size={9} color="#C8FF00" />
            <span style={{ color: '#C8FF00', fontSize: 9.5, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Live Trip</span>
          </div>
        </div>
        <p style={{ color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>
          Morning Commute
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 18, height: 18, borderRadius: 5,
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8, fontWeight: 800, color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Inter, sans-serif',
          }}>AC</div>
          <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>
            Candace Ln · 5 mins away
          </p>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.92 }}
        style={{
          width: 42, height: 42, borderRadius: 13, flexShrink: 0,
          background: 'linear-gradient(135deg, #C8FF00, #8FB800)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Inter, sans-serif', fontWeight: 800,
          fontSize: 12, color: '#000',
          boxShadow: '0 4px 16px rgba(200,255,0,0.30)',
        }}
      >
        GO
      </motion.button>
    </motion.div>
  )
}

// ─── Bottom Sheet (Dashboard + Chat tabs) ─────────────

const QUICK_PILLS = [
  { icon: Zap,           label: 'Check fuel',    response: 'Fuel level is at 65% — approximately 312 km of range remaining. Low fuel alert is set at 20%.' },
  { icon: Route,         label: 'Trips today',   response: 'You\'ve completed 2 trips today covering 8.4 mi. Morning Commute is currently active.' },
  { icon: AlertTriangle, label: 'Speed alerts',  response: 'No speed alerts in the last 7 days. Your limit is set to 75 mph on highways.' },
  { icon: MapPin,        label: 'Find parking',  response: 'Searching for parking near your destination... 3 spots within 0.2 mi of Candace Ln.' },
  { icon: Gauge,         label: 'Diagnostics',   response: 'Engine and battery are healthy. Fuel is at 65% — consider refueling soon.' },
  { icon: Wifi,          label: 'Device health', response: 'Device is online and syncing. Last heartbeat: 12 seconds ago. Signal: strong.' },
]

const MOCK_CONVERSATION = [
  { role: 'user', text: 'Check fuel' },
  { role: 'ai',   text: 'Fuel level is at 65% — approximately 312 km of range remaining. Low fuel alert is set at 20%.' },
]

const HEALTH = [
  { label: 'Fuel',   value: '65%', Icon: Gauge,         ok: false },
  { label: 'Batt',   value: 'OK',  Icon: BatteryMedium,  ok: true  },
  { label: 'Engine', value: 'OK',  Icon: Zap,            ok: true  },
  { label: 'Device', value: 'OK',  Icon: Cpu,            ok: true  },
]
const STATS = [
  { label: 'Range', value: '312', unit: 'km'  },
  { label: 'Trip',  value: '4.2', unit: 'mi'  },
  { label: 'Speed', value: '32',  unit: 'mph' },
]
const ACTIONS = [
  { label: 'Trips',   Icon: Route,         color: '#C8FF00' },
  { label: 'Alerts',  Icon: AlertTriangle,  color: '#facc15' },
  { label: 'History', Icon: History,        color: 'rgba(255,255,255,0.38)' },
  { label: 'Network', Icon: Wifi,           color: 'rgba(255,255,255,0.38)' },
]

function ConversationalSheet({ expanded, onExpand, onCollapse }) {
  const [messages, setMessages] = useState(MOCK_CONVERSATION)
  const [inputText, setInputText] = useState('')
  const [micActive, setMicActive] = useState(false)

  const handlePill = (pill) => {
    if (!expanded) onExpand()
    setMessages(prev => [
      ...prev,
      { role: 'user', text: pill.label },
      { role: 'ai', text: pill.response },
    ])
  }

  const handleSend = () => {
    if (!inputText.trim()) return
    setMessages(prev => [
      ...prev,
      { role: 'user', text: inputText.trim() },
      { role: 'ai', text: 'Got it — looking into that for you now. Give me a second...' },
    ])
    setInputText('')
  }

  const handleMic = () => {
    setMicActive(v => !v)
    if (!micActive) {
      if (!expanded) onExpand()
      setTimeout(() => {
        setMicActive(false)
        setMessages(prev => [
          ...prev,
          { role: 'user', text: 'How fast was I going on my last trip?' },
          { role: 'ai', text: 'Your top speed on this morning\'s trip was 48 mph. Average was 22 mph over 4.2 miles.' },
        ])
      }, 2200)
    }
  }

  const sheetHeight = expanded ? 520 : 108

  return (
    <motion.div
      animate={{ height: sheetHeight }}
      transition={{ type: 'spring', stiffness: 360, damping: 36 }}
      style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        zIndex: 40,
        background: 'rgba(8,10,18,0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px 24px 0 0',
        overflow: 'hidden',
        paddingBottom: 88,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Drag handle */}
      <div
        onClick={expanded ? onCollapse : onExpand}
        style={{ padding: '10px 0 6px', display: 'flex', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.16)' }} />
      </div>

      {/* Collapsed: quick pills */}
      {!expanded && (
        <div style={{
          overflowX: 'auto', display: 'flex', gap: 7,
          padding: '4px 14px 0', scrollbarWidth: 'none', flexShrink: 0,
        }}>
          {QUICK_PILLS.map((pill) => {
            const Icon = pill.icon
            return (
              <motion.button
                key={pill.label}
                whileTap={{ scale: 0.93 }}
                onClick={() => handlePill(pill)}
                style={{
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 13px', borderRadius: 99,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                <Icon size={12} color="#C8FF00" />
                <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 12.5, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                  {pill.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      )}

      {/* Expanded: KPI strip + unified chat */}
      {expanded && (
        <>
          {/* ── KPI strip ── */}
          <div style={{ flexShrink: 0 }}>
            {/* Health chips + stats */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '4px 14px 8px', gap: 8 }}>
              <div style={{ display: 'flex', gap: 5, flex: 1 }}>
                {HEALTH.map(({ label, value, Icon, ok }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: ok ? 'rgba(255,255,255,0.05)' : 'rgba(200,255,0,0.08)',
                    border: `1px solid ${ok ? 'rgba(255,255,255,0.08)' : 'rgba(200,255,0,0.22)'}`,
                    borderRadius: 99, padding: '5px 8px',
                  }}>
                    <Icon size={10} color={ok ? '#4ade80' : '#C8FF00'} />
                    <span style={{ color: ok ? '#4ade80' : '#C8FF00', fontSize: 10, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {STATS.map(({ label, value, unit }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.3px', lineHeight: 1 }}>
                      {value}<span style={{ fontSize: 8.5, fontWeight: 500, color: 'rgba(255,255,255,0.30)', marginLeft: 1 }}>{unit}</span>
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 8, fontFamily: 'Inter, sans-serif', marginTop: 1 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 6, padding: '0 14px 10px' }}>
              {ACTIONS.map(({ label, Icon, color }) => (
                <motion.button
                  key={label}
                  whileTap={{ scale: 0.88 }}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 14, padding: '10px 0 8px',
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}
                >
                  <Icon size={15} color={color} />
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* ── Divider with Ask AI label ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0 14px', marginBottom: 6, flexShrink: 0,
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 9.5, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
              Ask AI
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* ── Quick pills ── */}
          <div style={{
            overflowX: 'auto', display: 'flex', gap: 6,
            padding: '0 14px 8px', scrollbarWidth: 'none', flexShrink: 0,
          }}>
            {QUICK_PILLS.map((pill) => {
              const Icon = pill.icon
              return (
                <motion.button
                  key={pill.label}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handlePill(pill)}
                  style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
                    padding: '5px 10px', borderRadius: 99,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={10} color="#C8FF00" />
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11.5, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                    {pill.label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* ── Messages ── */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '4px 14px 6px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                  style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  <div style={{
                    maxWidth: '80%', padding: '8px 12px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, rgba(200,255,0,0.18), rgba(200,255,0,0.10))'
                      : 'rgba(255,255,255,0.07)',
                    border: msg.role === 'user'
                      ? '1px solid rgba(200,255,0,0.25)'
                      : '1px solid rgba(255,255,255,0.09)',
                  }}>
                    <p style={{
                      color: msg.role === 'user' ? '#C8FF00' : 'rgba(255,255,255,0.82)',
                      fontSize: 12.5, fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.55, fontWeight: msg.role === 'user' ? 600 : 400,
                    }}>
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Input row ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '7px 12px 8px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}>
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 99, display: 'flex', alignItems: 'center',
              padding: '0 14px', height: 38,
            }}>
              <input
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask TrackLynk..."
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: '#fff', fontSize: 13, fontFamily: 'Inter, sans-serif',
                }}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleMic}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: micActive ? 'rgba(200,255,0,0.18)' : 'rgba(255,255,255,0.07)',
                border: `1px solid ${micActive ? 'rgba(200,255,0,0.40)' : 'rgba(255,255,255,0.10)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative', flexShrink: 0,
                transition: 'background 0.3s, border-color 0.3s',
              }}
            >
              {micActive && (
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'easeOut' }}
                  style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(200,255,0,0.5)' }}
                />
              )}
              <Mic size={14} color={micActive ? '#C8FF00' : 'rgba(255,255,255,0.45)'} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleSend}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: inputText.trim() ? 'linear-gradient(135deg, #C8FF00, #8FB800)' : 'rgba(255,255,255,0.07)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0, transition: 'background 0.3s',
              }}
            >
              <Send size={13} color={inputText.trim() ? '#000' : 'rgba(255,255,255,0.30)'} />
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────

export default function Home() {
  const [expanded, setExpanded] = useState(false)
  const sheetHeight = expanded ? 520 : 108

  return (
    <div style={{ height: '100%', position: 'relative', background: '#000', paddingTop: 44 }}>

      {/* Full-screen map */}
      <div style={{ position: 'absolute', inset: 0, top: 44 }}>
        <MapView />
      </div>

      {/* Floating header */}
      <FloatingHeader />

      {/* Trip info card */}
      <TripInfoCard />

      {/* Recenter button — floats above the sheet */}
      <motion.button
        whileTap={{ scale: 0.90 }}
        style={{
          position: 'absolute',
          bottom: sheetHeight + 16,
          right: 14,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(12,15,22,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 30,
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
          transition: 'bottom 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <LocateFixed size={15} color="#C8FF00" />
      </motion.button>

      {/* Conversational sheet */}
      <ConversationalSheet
        expanded={expanded}
        onExpand={() => setExpanded(true)}
        onCollapse={() => setExpanded(false)}
      />
    </div>
  )
}
