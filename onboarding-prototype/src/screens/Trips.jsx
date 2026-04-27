import { motion } from 'framer-motion'
import { Box, Typography, IconButton } from '@mui/material'
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
    >
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: '12px',
        p: '13px 14px', bgcolor: '#FFFFFF', borderRadius: '14px', mb: '8px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6',
        cursor: 'pointer',
      }}>
        {/* Color stripe */}
        <Box sx={{ width: 4, height: 44, borderRadius: '4px', bgcolor: trip.color, flexShrink: 0 }} />

        {/* Trip info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{
            color: '#111827', fontSize: 14, fontWeight: 600, mb: '3px',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {trip.name}
          </Typography>
          <Typography sx={{ color: '#9CA3AF', fontSize: 12 }}>
            {trip.start} → {trip.end}
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography sx={{ color: '#111827', fontSize: 14, fontWeight: 700, mb: '3px' }}>
            {trip.distance}
          </Typography>
          <Typography sx={{ color: '#9CA3AF', fontSize: 12 }}>
            {trip.duration}
          </Typography>
        </Box>

        <ChevronRight size={16} color="#D1D5DB" style={{ flexShrink: 0 }} />
      </Box>
    </motion.div>
  )
}

export default function Trips() {
  let index = 0

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F9FAFB', pt: '44px' }}>

      {/* Header */}
      <Box sx={{
        p: '14px 20px 12px', bgcolor: '#FFFFFF',
        borderBottom: '1px solid #F3F4F6',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <Typography sx={{ color: '#111827', fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>
          Trips
        </Typography>
        <IconButton sx={{ bgcolor: '#F3F4F6', borderRadius: '10px', width: 36, height: 36 }}>
          <SlidersHorizontal size={16} color="#6B7280" />
        </IconButton>
      </Box>

      {/* Trip list */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: '12px 16px', pb: `${82 + 12}px` }}>
        {Object.entries(grouped).map(([date, trips]) => (
          <Box key={date} sx={{ mb: '4px' }}>
            <Typography sx={{
              color: '#9CA3AF', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.6px', textTransform: 'uppercase',
              mb: '8px', pl: '2px',
            }}>
              {date}
            </Typography>
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} index={index++} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
