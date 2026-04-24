import { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { GoogleMap, useJsApiLoader, Polyline, Marker } from '@react-google-maps/api'
import {
  ChevronDown, Bell, MapPin, Zap, Wifi,
  Route, History, AlertTriangle, Gauge, BatteryMedium, Cpu, LocateFixed,
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

// Sample route: midtown Manhattan (car start → Times Square area → destination)
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

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

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

// ─── Top Info Card ────────────────────────────────────

function TripInfoCard() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 28 }}
      style={{
        position: 'absolute',
        top: 10, left: 12, right: 12,
        background: 'rgba(12,15,22,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 18,
        padding: '12px 12px',
        zIndex: 20,
        display: 'flex', alignItems: 'center', gap: 10,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
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
        <p style={{ color: '#fff', fontSize: 14.5, fontWeight: 700, fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>
          Morning Commute
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 6,
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Inter, sans-serif',
          }}>AC</div>
          <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 11.5, fontFamily: 'Inter, sans-serif' }}>
            Candace Ln · 5 mins away
          </p>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.92 }}
        style={{
          width: 46, height: 46, borderRadius: 14, flexShrink: 0,
          background: 'linear-gradient(135deg, #C8FF00, #8FB800)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Inter, sans-serif', fontWeight: 800,
          fontSize: 13, color: '#000',
          boxShadow: '0 4px 18px rgba(200,255,0,0.30)',
        }}
      >
        GO
      </motion.button>
    </motion.div>
  )
}

// ─── Compact Bottom Panel ─────────────────────────────

function BottomPanel() {
  const health = [
    { label: 'Fuel',    value: '65%', Icon: Gauge,        ok: false },
    { label: 'Batt',    value: 'OK',  Icon: BatteryMedium, ok: true  },
    { label: 'Engine',  value: 'OK',  Icon: Zap,           ok: true  },
    { label: 'Device',  value: 'OK',  Icon: Cpu,           ok: true  },
  ]
  const stats = [
    { label: 'Range', value: '312', unit: 'km'  },
    { label: 'Trip',  value: '4.2', unit: 'mi'  },
    { label: 'Speed', value: '32',  unit: 'mph' },
  ]
  const actions = [
    { label: 'Trips',   Icon: Route,        color: '#C8FF00' },
    { label: 'Alerts',  Icon: AlertTriangle, color: '#facc15' },
    { label: 'History', Icon: History,       color: 'rgba(255,255,255,0.38)' },
    { label: 'Network', Icon: Wifi,          color: 'rgba(255,255,255,0.38)' },
  ]

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 280, damping: 28 }}
      style={{ background: '#000', paddingBottom: 88, flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Row 1 — status chips + stats inline */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 14px 5px', gap: 6 }}>

        {/* Health chips */}
        <div style={{ display: 'flex', gap: 4 }}>
          {health.map(({ label, value, Icon, ok }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 3,
              background: ok ? 'rgba(255,255,255,0.05)' : 'rgba(200,255,0,0.08)',
              border: `1px solid ${ok ? 'rgba(255,255,255,0.08)' : 'rgba(200,255,0,0.22)'}`,
              borderRadius: 99, padding: '3px 7px',
            }}>
              <Icon size={9} color={ok ? '#4ade80' : '#C8FF00'} />
              <span style={{ color: ok ? '#4ade80' : '#C8FF00', fontSize: 9, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.10)', flexShrink: 0 }} />

        {/* Stats inline */}
        <div style={{ display: 'flex', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
          {stats.map(({ label, value, unit }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontSize: 11.5, fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.3px', lineHeight: 1 }}>
                {value}<span style={{ fontSize: 8, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginLeft: 1 }}>{unit}</span>
              </span>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 7.5, fontFamily: 'Inter, sans-serif', marginTop: 1 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — actions */}
      <div style={{ display: 'flex', gap: 5, padding: '0 14px' }}>
        {actions.map(({ label, Icon, color }) => (
          <motion.button
            key={label}
            whileTap={{ scale: 0.88 }}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 11, padding: '7px 0 6px',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            }}
          >
            <Icon size={13} color={color} />
            <span style={{ color: 'rgba(255,255,255,0.30)', fontSize: 8, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#000', paddingTop: 44 }}>

      {/* Header */}
      <div style={{
        padding: '8px 16px 6px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0, zIndex: 10,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ color: '#fff', fontSize: 16, fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.4px' }}>
              Toyota Tacoma
            </span>
            <ChevronDown size={13} color="rgba(255,255,255,0.40)" />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 10.5, fontFamily: 'Inter, sans-serif', marginTop: 1 }}>
            OBD-II · 352602116146553
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.button whileTap={{ scale: 0.90 }} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Bell size={14} color="rgba(255,255,255,0.60)" />
          </motion.button>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #C8FF00, #8FB800)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#000', fontFamily: 'Inter, sans-serif',
          }}>S</div>
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <MapView />
        <TripInfoCard />

        {/* Recenter */}
        <motion.button whileTap={{ scale: 0.90 }} style={{
          position: 'absolute', bottom: 16, right: 12,
          width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(12,15,22,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 15,
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
        }}>
          <LocateFixed size={14} color="#C8FF00" />
        </motion.button>
      </div>

      <BottomPanel />
    </div>
  )
}
