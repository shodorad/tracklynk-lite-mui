import { motion } from 'framer-motion'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'

const TRIPS = [
  { id: 1, date: 'Today',     name: 'Morning Commute',  start: '8:14 AM',  end: '8:42 AM',  distance: '4.2 mi', duration: '28 min', color: '#2563EB' },
  { id: 2, date: 'Today',     name: 'Lunch Run',         start: '12:05 PM', end: '12:18 PM', distance: '1.8 mi', duration: '13 min', color: '#2563EB' },
  { id: 3, date: 'Yesterday', name: 'Evening Commute',   start: '5:30 PM',  end: '6:08 PM',  distance: '5.1 mi', duration: '38 min', color: '#2563EB' },
  { id: 4, date: 'Yesterday', name: 'Grocery Run',       start: '10:20 AM', end: '10:35 AM', distance: '2.3 mi', duration: '15 min', color: '#2563EB' },
  { id: 5, date: 'Apr 15',    name: 'Morning Commute',   start: '8:22 AM',  end: '8:49 AM',  distance: '4.0 mi', duration: '27 min', color: '#2563EB' },
  { id: 6, date: 'Apr 15',    name: 'Evening Commute',   start: '5:45 PM',  end: '6:22 PM',  distance: '5.3 mi', duration: '37 min', color: '#2563EB' },
]

const grouped = TRIPS.reduce((acc, trip) => {
  if (!acc[trip.date]) acc[trip.date] = []
  acc[trip.date].push(trip)
  return acc
}, {})

function TripCard({ trip, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.05, type: 'spring', stiffness: 320, damping: 28 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '13px 14px',
        background: '#FFFFFF',
        borderRadius: 14,
        marginBottom: 8,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        border: '1px solid #F3F4F6',
        cursor: 'pointer',
      }}
    >
      {/* Left color stripe */}
      <div style={{ width: 4, height: 44, borderRadius: 4, background: trip.color, flexShrink: 0 }} />

      {/* Trip info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          color: '#111827', fontSize: 14, fontWeight: 600,
          fontFamily: 'Inter, sans-serif', marginBottom: 3,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {trip.name}
        </p>
        <p style={{ color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
          {trip.start} → {trip.end}
        </p>
      </div>

      {/* Stats */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <p style={{ color: '#111827', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif', marginBottom: 3 }}>
          {trip.distance}
        </p>
        <p style={{ color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
          {trip.duration}
        </p>
      </div>

      <ChevronRight size={16} color="#D1D5DB" style={{ flexShrink: 0 }} />
    </motion.div>
  )
}

export default function Trips() {
  let index = 0

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F9FAFB', paddingTop: 44 }}>

      {/* Header */}
      <div style={{
        padding: '14px 20px 12px',
        background: '#FFFFFF',
        borderBottom: '1px solid #F3F4F6',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <h1 style={{
          color: '#111827', fontSize: 22, fontWeight: 800,
          fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px',
        }}>
          Trips
        </h1>
        <button style={{
          background: '#F3F4F6', border: 'none', borderRadius: 10,
          width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <SlidersHorizontal size={16} color="#6B7280" />
        </button>
      </div>

      {/* Trip list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', paddingBottom: 82 + 12 }}>
        {Object.entries(grouped).map(([date, trips]) => (
          <div key={date} style={{ marginBottom: 4 }}>
            <p style={{
              color: '#9CA3AF', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.6px', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              marginBottom: 8, paddingLeft: 2,
            }}>
              {date}
            </p>
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} index={index++} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
