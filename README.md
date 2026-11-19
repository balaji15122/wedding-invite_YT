# 🏰 Krishan & Pooja — Royal 3D Wedding Invitation Website

A production-grade, immersive 3D digital wedding invitation card web application built with **React**, **Three.js** (`@react-three/fiber` & `@react-three/drei`), **Tailwind CSS**, and **Framer Motion**.

Designed for royalty: features an interactive 3D envelope card with a breakable wax seal, falling rose petals, floating glowing diyas, live wedding countdown, personalized URL guest invitations, 3D photo gallery, audio soundscape, interactive maps, and RSVP with celebration fireworks.

---

## 🌟 Key Highlights & Features

- **Royal 3D Envelope Unfolding**: A 3D crimson and gold envelope floats in space with volumetric rays. Clicking *"Open Royal Invitation"* cracks the wax monogram seal (`K & P`), flips open the envelope flap, slides the gold-trimmed card out, and unfolds into the wedding experience.
- **Dynamic Single-Source Architecture**: Every name, date, venue, love milestone, photo, and timing lives in a single configuration file: [`src/data/weddingData.js`](file:///Users/balaji/Desktop/Wedding%20Invitaton%20card/src/data/weddingData.js). Zero hardcoded names inside components.
- **Personalized Guest Links**: Append `?guest=Guest%20Name` to the URL (e.g. `https://your-site.com/?guest=Rahul%20Gupta`) to personalize the envelope greeting, hero invitation pill, and WhatsApp share buttons.
- **Smart Live Countdown**: Real-time ticker counting down to the sacred Pheras (3 Dec 2026). Automatically switches to *"Today is the day!"* on wedding day, and to the Reception countdown (6 Dec 2026) thereafter.
- **Calendar Synchronization**: One-click **Google Calendar** integration and direct **Apple / Outlook (.ics)** file download for both Wedding and Reception ceremonies.
- **Interactive 3D Elements**:
  - Background instanced falling rose petals and golden stardust particles running at 60 FPS.
  - Floating 3D terracotta and brass diyas with realistic flame flicker lights.
  - 3D rotating Rajasthani palace dome model in the venue section.
  - Tilted 3D floating photo frames with hover parallax and full-screen lightbox modal.
  - Custom gold sparkle cursor tracking on desktop.
- **Dual Audio Engine**:
  - Plays royalty-free wedding shehnai & sitar symphony from `/public/audio/wedding-song.mp3`.
  - Automatically starts on user interaction (*"Open Royal Invitation"* click) to respect browser autoplay policies.
  - Includes an automatic fallback Web Audio API harmonic raga synthesizer if offline or if no audio file is provided.
  - Floating vinyl record controller with play/pause, volume slider, and persistent mute preference in `localStorage`.
- **Celebratory Fireworks & Confetti**: Fires royal gold and maroon confetti upon opening the envelope, submitting RSVP, and reaching the footer.
- **RSVP Form with Local Persistence**: Collects attendance, guests count, phone, and warm wishes. Saves to `localStorage` with clear hooks for Google Sheets / REST backend.

---

## 🚀 Quick Start & Development

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3000/?guest=Rahul%20Gupta](http://localhost:3000/?guest=Rahul%20Gupta) for personalized preview).

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory with code splitting for fast mobile loading.

---

## 🎨 How to Customize (Everything in One File)

All text, dates, venues, photos, and settings are configured in:
👉 [`src/data/weddingData.js`](file:///Users/balaji/Desktop/Wedding%20Invitaton%20card/src/data/weddingData.js)

### 1. Changing Couple Names & Families
Edit the `couple` object:
```javascript
export const weddingData = {
  couple: {
    groom: {
      firstName: "Krishan",
      lastName: "Sharma",
      fullName: "Krishan Sharma",
      parents: "Mr. Rajesh Sharma & Mrs. Sunita Sharma",
      familyTitle: "The Sharma Family",
    },
    bride: {
      firstName: "Pooja",
      lastName: "Verma",
      fullName: "Pooja Verma",
      parents: "Mr. Mohan Verma & Mrs. Kavita Verma",
      familyTitle: "The Verma Family",
    },
    monogram: "K & P",
    hashtag: "#KrishanWedsPooja",
  },
  // ...
};
```
*Note: Changing these values automatically updates the page `<title>`, Open Graph previews, hero text, monogram, footer, calendar invites, and RSVP greeting!*

### 2. Changing Dates & Timings
Edit the `dates` section:
```javascript
dates: {
  weddingDateISO: "2026-12-03T18:00:00+05:30",
  receptionDateISO: "2026-12-06T19:00:00+05:30",
  weddingFormatted: "Thursday, 3rd December 2026",
  receptionFormatted: "Sunday, 6th December 2026",
}
```

### 3. Changing Venues & Google Maps
Edit the `venues` section:
```javascript
venues: {
  wedding: {
    name: "The Royal Palace Banquet",
    address: "Palace Road, Near Jal Mahal, Amer Road, Jaipur, Rajasthan 302002",
    googleMapsUrl: "https://maps.google.com/?q=...",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    parkingInfo: "Complimentary valet parking available at Gate 2",
    stayInfo: "Luxury suites reserved at The Heritage Grand Resort",
  },
  reception: {
    name: "Grand Celebration Hall",
    address: "Tonk Road, Jaipur, Rajasthan",
    // ...
  }
}
```

### 4. Replacing Background Music
1. Place your royalty-free MP3 file inside the folder:
   ```
   public/audio/wedding-song.mp3
   ```
2. The site will automatically stream and loop this track with smooth volume fades.
3. *Recommendation:* Use royalty-free Indian classical shehnai, sitar, flute, or soft acoustic piano from platforms like Pixabay, Free Music Archive, or Incompetech.

### 5. Replacing Photos & Love Story
- In `weddingData.js`, locate `loveStory` and `gallery`.
- Update the image URLs to point to your own photography URLs (or local images inside `/public/images/`).

---

## 💌 Personalizing Guest Links

You can share personalized links with each guest on WhatsApp, SMS, or Email:

| Link Format | What the Guest Sees |
| :--- | :--- |
| `https://your-site.com/` | Default greeting: *"Dear Beloved Guest, you are cordially invited..."* |
| `https://your-site.com/?guest=Rahul%20Gupta` | Personalized: *"Dear Rahul Gupta, you are cordially invited..."* |
| `https://your-site.com/?guest=The%20Kapoor%20Family` | Personalized: *"Dear The Kapoor Family, you are cordially invited..."* |

---

## 🌐 Free 1-Click Deployment

### Option A: Deploy to Vercel (Recommended)
1. Push this project to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects **Vite**; keep default build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your custom 3D invitation is live on HTTPS in under 60 seconds!

### Option B: Deploy to Netlify
1. Sign in to [Netlify](https://www.netlify.com/).
2. Drag and drop the `dist/` folder created by `npm run build` into Netlify Drop, or connect your Git repo with:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

---

## 📂 Project Architecture

```
krishan-pooja-wedding/
├── public/
│   ├── audio/
│   │   ├── README.md               # Audio guide
│   │   └── wedding-song.mp3        # Wedding background music
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── Background3D.jsx    # Persistent 3D canvas (petals, stardust, diyas)
│   │   │   ├── Envelope3D.jsx      # 3D Envelope mesh, wax seal & opening animation
│   │   │   ├── PetalsAndSparks.jsx # Instanced petals, sparkles & floating diyas
│   │   │   └── Venue3D.jsx         # 3D rotating royal palace dome model
│   │   ├── audio/
│   │   │   └── MusicPlayer.jsx     # Floating vinyl disk with volume slider
│   │   ├── intro/
│   │   │   ├── EnvelopeIntro.jsx   # 3D Envelope screen with "Tap to Open"
│   │   │   └── LoadingScreen.jsx   # Rotating golden mandala & percentage loader
│   │   ├── navigation/
│   │   │   └── Navbar.jsx          # Royal monogram & responsive navigation
│   │   ├── sections/
│   │   │   ├── BlessingsSection.jsx # Sanskrit shloka & family cards
│   │   │   ├── EventsSection.jsx    # Wedding (3 Dec) & Reception (6 Dec) itinerary
│   │   │   ├── FooterSection.jsx    # Fireworks, hashtag & WhatsApp share
│   │   │   ├── GallerySection.jsx   # 3D tilted frames & lightbox modal
│   │   │   ├── HeroSection.jsx      # Couple names, live countdown, calendar sync
│   │   │   ├── LoveStorySection.jsx # 4-milestone interactive timeline
│   │   │   └── VenueSection.jsx     # Palace dome 3D, map embed & directions
│   │   └── ui/
│   │       └── CustomCursor.jsx    # Desktop gold sparkle cursor
│   ├── data/
│   │   └── weddingData.js          # ★ SINGLE SOURCE OF TRUTH (All content)
│   ├── utils/
│   │   ├── audioPlayer.js          # Howler + Web Audio API synthesizer engine
│   │   ├── calendar.js             # .ics generation & Google Calendar links
│   │   └── confetti.js             # Royal golden confetti & fireworks bursts
│   ├── App.jsx                     # Stage state management (loading -> envelope -> opened)
│   ├── index.css                   # Tailwind styles, royal gold scrollbar & fonts
│   └── main.jsx                    # Application entry point
├── package.json
├── tailwind.config.js              # Royal maroon & gold color palette
└── vite.config.js                  # Vite configuration with chunk splitting
```

---

## 💍 Heartfelt Congratulations

Best wishes to **Krishan & Pooja** on their auspicious union! May their life together be filled with boundless joy, love, and prosperity.
# wedding-invite_YT
