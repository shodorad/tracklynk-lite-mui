# TrackLynk Lite — MUI Prototype

A high-fidelity mobile onboarding prototype for **TrackLynk**, a GPS vehicle tracking app. Built in React with a full MUI design system, Framer Motion animations, and Google Maps integration. Renders inside a pixel-accurate iPhone frame at 390×844 px.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18.3.1 |
| Component Library | MUI (Material UI) 5.x |
| Build Tool | Vite 5.3.1 |
| Animation | Framer Motion 11.0.0 |
| Icons | Lucide React 0.383.0 |
| Maps | @react-google-maps/api |
| Font | Inter (Google Fonts — 400/500/600/700/800/900) |
| Package Manager | npm |

---

## Design System

All design tokens live in a single file: `onboarding-prototype/src/theme.js`.

### Palette

| Token | Value |
|---|---|
| `primary.main` | `#C8FF00` (neon lime) |
| `primary.dark` | `#8FB800` (olive, gradient end) |
| `background.default` | `#04050d` |
| `background.paper` | `#0d0d14` |
| `text.primary` | `#ffffff` |
| `text.secondary` | `rgba(255,255,255,0.70)` |
| `text.disabled` | `rgba(255,255,255,0.38)` |

### Glassmorphism

Shared glass tokens live in `src/styles/glass.js` and are applied via the `GlassCard` component (`src/components/GlassCard.jsx`):

```js
background: rgba(255,255,255,0.055);
backdrop-filter: blur(20px) saturate(160%);
border: 1px solid rgba(255,255,255,0.10);
```

### Typography

All text uses **Inter** via MUI's `ThemeProvider`. Custom `fontWeightBlack: 900` token is defined for headings (MUI only ships up to `fontWeightBold: 700` by default).

### Component overrides (theme.js)

| Component | Override |
|---|---|
| `MuiButton` | Pill shape (borderRadius: 99), lime gradient, glow shadow |
| `MuiOutlinedInput` | Glass background, lime focus ring |
| `MuiBottomNavigation` | Glass blur, lime selected state |
| `MuiLinearProgress` | Lime gradient bar |
| `MuiAvatar` | Rounded-square (borderRadius: 13) instead of circle |
| `MuiChip` | Height 36 to match design pill sizing |

---

## Project Structure

```
tracklynk-lite-mui/
│
├── Plan.md                            # Full migration strategy + hazard notes
├── README.md
│
└── onboarding-prototype/              # React application
    ├── src/
    │   ├── theme.js                   # MUI theme — single source of truth for all tokens
    │   ├── App.jsx                    # Navigation shell + iPhone frame
    │   ├── main.jsx                   # ThemeProvider + CssBaseline entry point
    │   ├── index.css                  # Global keyframes (car-float, aurora-bg)
    │   │
    │   ├── styles/
    │   │   └── glass.js               # Shared glassmorphism style objects
    │   │
    │   ├── components/
    │   │   ├── GlassCard.jsx          # MUI Box wrapper with glass styles
    │   │   ├── BottomTabs.jsx         # Custom nav tabs (kept outside MUI — layoutId indicator)
    │   │   └── Car3D.jsx              # 3D car PNG with GPS pin + ground glow
    │   │
    │   └── screens/
    │       ├── Welcome.jsx            # 3-slide carousel (hero, features, pricing)
    │       ├── Auth.jsx               # OAuth (Apple, Google) + Face ID
    │       ├── SignUp.jsx             # Email/password form
    │       ├── AddVehicle.jsx         # VIN barcode scan / manual entry
    │       ├── VehicleDetails.jsx     # Nickname + license plate
    │       ├── ScanDevice.jsx         # OBD device pairing
    │       ├── DeviceSetupWizard.jsx  # 4-step device setup guide
    │       ├── Success.jsx            # Completion + next-steps checklist
    │       ├── Home.jsx               # Map view + conversational AI chat sheet
    │       ├── Trips.jsx              # Trip history list
    │       ├── Settings.jsx           # Full settings with nested sub-screens
    │       ├── ChoosePlan.jsx         # Subscription plan selection
    │       └── ProgressBar.jsx        # Shared step indicator + back button
    │
    ├── Car_images/                    # 3D vehicle render (used by Car3D.jsx)
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## Screen Flow

```
Welcome (carousel)
  └─► Auth (OAuth / Face ID)
        └─► SignUp (email + password)
              └─► AddVehicle (VIN scan)
                    └─► VehicleDetails (nickname, plate)
                          └─► ScanDevice (OBD pairing)
                                └─► DeviceSetupWizard (4-step guide)
                                      └─► Success
                                            └─► Home (map + chat)
                                                  ├─► Trips
                                                  └─► Settings
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run

```bash
cd onboarding-prototype
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The prototype renders centered in the browser inside an iPhone frame.

### Google Maps

The Home screen uses Google Maps. Add your API key to `onboarding-prototype/.env`:

```
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

Without a key the map falls back to a dark placeholder.

### Build

```bash
npm run build
# Output: onboarding-prototype/dist/
```

---

## Key Design Decisions

**Components kept outside MUI:**
- `BottomTabs.jsx` — MUI `BottomNavigation` has `overflow: hidden` that clips the Framer Motion `layoutId` sliding indicator
- `Toggle` (in Settings) — MUI Switch uses CSS transitions; the Framer Motion spring feel can't be replicated
- Pricing slide toggle (in Welcome) — sliding pill requires an absolute-positioned `motion.div` that MUI `ToggleButtonGroup` doesn't support

**Portal glass blur:** Any `Drawer` or `Dialog` that needs glass blur uses `disablePortal` so it renders inside the phone frame DOM tree rather than at `document.body`, which is outside the stacking context.

**Motion + MUI buttons:** All animated buttons use `motion(Button)` (Framer's `forwardRef`-aware factory), never `component={motion.button}`, to avoid ref conflicts.

---

## License

Private prototype. All design assets and code are proprietary to the TrackLynk project.
