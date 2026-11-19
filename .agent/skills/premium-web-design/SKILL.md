---
name: premium-web-design
description: >-
  Expert guidelines, aesthetic standards, and technical runbooks for crafting world-class,
  premium web experiences, landing pages, and web applications. Activate this skill whenever
  the user asks to build, design, revamp, or style a landing page, website, portfolio,
  or modern UI/UX frontend.
---

# Premium Web Design & Development Runbook

This skill guides the creation of high-converting, visually stunning, and technically flawless web experiences. Premium web design is defined by intentional typography, subtle depth, refined micro-interactions, responsive balance, and high-performance execution.

---

## 1. Core Principles of "Premium" Design

- **Restraint Over Clutter**: Generous whitespace (`gap-8` to `gap-16`), clear hierarchy, and intentional focus points.
- **Micro-Detail Polish**: Subtle 1px borders with low opacity (`border-white/10` or `border-neutral-200`), soft ambient glows, custom scrollbars, and delicate drop shadows (`shadow-sm`, `shadow-2xl` with low opacity).
- **Aesthetic Depth**: Layering surfaces using subtle gradients, glassmorphism (`backdrop-blur-md bg-white/70 dark:bg-black/60`), and subtle radial background glows.
- **Typographic Rigor**: Distinct contrast between display headings (tight tracking, optical sizing) and body text (high legibility, 1.5–1.7 line height).

---

## 2. Typography & Color Systems

### Font Pairings
- **Modern Tech / SaaS**: *Inter*, *Geist*, *Plus Jakarta Sans*, or *Cabinet Grotesk* for headings; *Inter* or *Geist Mono* for accents.
- **Editorial / Luxury**: *Instrument Serif*, *Playfair Display*, or *Cormorant Garamond* for display titles paired with clean grotesque sans (*Plus Jakarta Sans* or *Inter*) for UI/body.
- **Creative / Studio**: *Syne*, *Space Grotesk*, or *Clash Display* paired with *DM Sans*.

### Typographic Rules
- Headings: Tighten letter spacing on large display titles (`tracking-tight` or `-0.02em` to `-0.04em`).
- Badges & Eyebrows: Small uppercase tracking (`text-xs tracking-wider uppercase font-semibold text-primary`).
- Contrast: Ensure high contrast ratios (WCAG AA 4.5:1 minimum) for readability. Never use low-contrast grey text on light backgrounds.

### Color Hierarchy (60-30-10 Rule)
- **60% Dominant Base**: Clean canvas (e.g., deep charcoal `#0B0F17` / jet black `#050505` for dark mode, crisp zinc `#FAFAFA` for light mode).
- **30% Secondary Structure**: Surface cards, navigation bars, modals, borders (`#111827`, `#1F2937` or `#F4F4F5`).
- **10% Intentional Accent**: High-vibrancy brand accent (e.g., electric indigo, emerald, violet, or cyber amber) strictly reserved for key CTAs, highlights, and status badges.

---

## 3. High-Converting Landing Page Structure

When asked to build a landing page, implement this proven high-impact sequence:

### A. Navigation Bar (Sticky / Floating)
- Glassmorphic floating pill or full-width sticky header.
- Brand logo on left, 3–5 clean links in center, primary CTA button on right.
- Mobile drawer / animated hamburger menu for mobile breakpoints.

### B. Hero Section (First 5 Seconds Impact)
1. **Pill Eyebrow**: e.g., `[ ✨ Introducing Version 2.0 → ]` with a subtle hover shimmer.
2. **Headline (H1)**: Bold, benefit-driven hook (40–64px desktop). Highlight 1–2 keywords using an elegant text gradient (`bg-clip-text text-transparent bg-gradient-to-r`).
3. **Sub-headline**: Clear 1–2 sentence description of what the product does and who it's for.
4. **CTA Cluster**:
   - Primary: High-contrast button with subtle shine/hover elevation and arrow icon.
   - Secondary: Ghost or outline button ("Watch 2 min Demo", "View Documentation").
5. **Social Proof Micro-Row**: Avatar stack + "Trusted by 5,000+ creators" + 5-star rating stars.
6. **Hero Visual / Interactive Element**: High-fidelity product mockup, interactive 3D/canvas widget, or animated dashboard preview enclosed in a refined frame with ambient back-glow.

### C. Social Proof & Logo Cloud
- Monochrome, low-opacity client/partner logos (`opacity-60 hover:opacity-100 transition-opacity`).
- Marquee scroll or static balanced grid.

### D. Bento Grid Feature Showcase
- Asymmetric card layout (e.g., 2 large cards, 3 smaller cards) showcasing core features.
- Inside cards: Real micro-UI mockups, interactive switches, or animated metric graphs rather than plain text and generic stock icons.

### E. Deep-Dive Section (Problem → Solution)
- Alternating 2-column sections: crisp narrative on one side, interactive preview/animation on the other.

### F. Metrics / Social Proof / Testimonials
- Masonry grid or interactive carousel of user quotes with avatar, full name, role, and verified company badge.
- Highlight key metrics with large numbers (`text-4xl font-bold font-mono`).

### G. Transparent Pricing Table
- Toggle for Monthly / Annual billing (with "Save 20%" pill).
- Feature breakdown with checkmarks.
- Distinct highlight on the "Most Popular" or "Pro" tier (elevated card, gradient border, "Recommended" badge).

### H. Interactive FAQ Accordion
- Clean animated accordion with collapsible answers for common objections and onboarding questions.

### I. Final High-Impact CTA Banner
- Full-width or boxed card with vibrant ambient gradient background and compelling closing call-to-action.

### J. Comprehensive Footer
- Column layout: Brand info, Products, Resources, Company, Legal, and live system status indicator (`● Systems Operational`).

---

## 4. Micro-Interactions, Motion & Feedback

- **Transitions**: Apply standard easing (`transition-all duration-200 ease-out`).
- **Button Hover States**:
  - Slight upward translation: `hover:-translate-y-0.5`
  - Subtle shadow expansion: `hover:shadow-lg`
  - Active press effect: `active:scale-[0.98]`
- **Card Hover States**:
  - Border brightness increase: `hover:border-neutral-400 dark:hover:border-neutral-600`
  - Subtle background tint or radial spotlight following mouse position.
- **Scroll Entrance**: Stagger animations as elements enter the viewport (fade-in + slide-up 16px).

---

## 5. Mobile & Responsive Execution Standards

- **Mobile First**: Test at 320px, 375px, 768px, 1024px, 1440px.
- **Touch Targets**: Minimum 44x44px for buttons, links, and form inputs.
- **Typography Scaling**: Use fluid typography via `clamp()` or Tailwind responsive classes (`text-3xl sm:text-5xl lg:text-6xl`).
- **Horizontal Overflow Prevention**: Ensure all containers have `overflow-x-hidden` or explicit max-widths.

---

## 6. Implementation Checklist

Before completing any landing page or web design request:
- [ ] Visual hierarchy is sharp: user's eye naturally flows from Headline → Value → CTA.
- [ ] Color contrast is verified and accessible (WCAG AA).
- [ ] Responsive layout adapts smoothly without horizontal scrollbars on mobile.
- [ ] Buttons and links have explicit `:hover`, `:focus-visible`, and `:active` states.
- [ ] Images and media utilize modern formats (WebP/AVIF/SVG) with lazy loading where appropriate.
- [ ] Copy is concise, polished, and avoids generic placeholder text.
