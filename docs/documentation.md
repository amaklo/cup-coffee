# 🟤 CUP COFFEE — Official Brand & Website Design Documentation

**Version:** 1.0
**Date:** October 2025
**Prepared by:** [Amaklo B2B Advertising Agency](https://amaklo.com)
**For:** CUP COFFEE (Ethiopia)

---

## 1️⃣ Brand Overview

### Brand Essence

**CUP COFFEE** is an Ethiopian coffee exporter that bridges **centuries of heritage** with **global luxury standards**.
The brand expresses the **soul of Ethiopian coffee** — rich, aromatic, and deeply cultural — while embodying the precision and elegance of international trade professionalism.

**Core Message:**

> “From the Ethiopian Highlands to the World’s Finest Cups.”

---

## 2️⃣ Brand Identity

### Brand Personality

| Attribute        | Description                                             |
| ---------------- | ------------------------------------------------------- |
| **Authentic**    | Rooted in Ethiopian coffee culture and people.          |
| **Premium**      | High-end export quality, world-class presentation.      |
| **Trustworthy**  | Transparent, reliable, and ethical sourcing.            |
| **Warm & Human** | Heartfelt connection to farmers and coffee communities. |
| **Global**       | Speaks to an international market with elegance.        |

---

## 3️⃣ Visual Identity System

### Color Palette

| Color                                | Use                               | HEX       | Notes                                      |
| ------------------------------------ | --------------------------------- | --------- | ------------------------------------------ |
| **Coffee Essence (Primary)**         | Background / Text Contrast        | `#3B2F2F` | Deep espresso brown — evokes roasted beans |
| **Golden Accent (Luxury Highlight)** | Icons / Lines / Buttons / Borders | `#C6A664` | Refined gold — symbolizes export prestige  |
| **Cream Base (Background Neutral)**  | Background / Secondary            | `#F5F1E6` | Coffee parchment tone for warmth           |
| **Green Hint (Cultural Accent)**     | Hover / Links / Subtle Elements   | `#2E6E4C` | Represents Ethiopia’s natural richness     |
| **Black (Depth Layer)**              | Typography / Overlays             | `#0F0F0F` | Provides elegance and contrast             |

#### Gradient Example:

`background: linear-gradient(135deg, #3B2F2F 0%, #0F0F0F 100%);`

---

### Typography System

| Use                         | Font                        | Example                        | Notes                                         |
| --------------------------- | --------------------------- | ------------------------------ | --------------------------------------------- |
| **Headings (Luxury Feel)**  | *Playfair Display*          | “Ethiopia’s Finest Export”     | Elegant serif — evokes premium branding       |
| **Body (Readable, Modern)** | *Inter*                     | “We grow people before beans.” | Clean sans-serif, perfect for digital clarity |
| **Accent / Quotes**         | *Cormorant Garamond Italic* | “Coffee is our story.”         | Adds artistic heritage touch                  |

> Font pairing principle: **Modern readability meets classical luxury.**

---

### Iconography & Patterns

* Line icons in **matte gold (#C6A664)**.
* Background motifs inspired by **Ethiopian basket (Mesob)** geometry.
* Subtle woven textures applied at <10% opacity on cream backgrounds.

---

### Imagery Guidelines

* Use **realistic, cinematic images** of Ethiopian coffee farms, beans, roasting, and people.
* Prefer **natural light**, **warm tones**, and **close-up textures**.
* Include storytelling visuals (hands holding beans, roasting smoke, export packaging, port shipping scenes).

---

## 4️⃣ Website Design Structure

### Tech Stack

* **Framework:** Next.js 15+
* **UI System:** Shadcn/UI + Tailwind CSS
* **Animations:** Framer Motion
* **TypeScript:** Enabled
* **Deployment:** Vercel
* **Assets Optimization:** Next/Image, SWC compression, lazy loading

---

### Page Structure

| Page               | Key Elements                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Home**           | Hero video section, brand statement, scroll storytelling (heritage → process → global reach → contact CTA). |
| **About**          | “Our Story” + heritage timeline + Ethiopia origin map.                                                      |
| **Coffees**        | Interactive cards of coffee varieties with flavor profiles and region info.                                 |
| **Process**        | Step-by-step sourcing → roasting → export animation.                                                        |
| **Sustainability** | Social impact visuals, eco-initiatives, people-centered message.                                            |
| **News**           | Company updates, coffee market trends, event highlights.                                                    |
| **Contact**        | Inquiry form, global office map, B2B contact section.                                                       |

---

## Component System

Each section will be modular using **Shadcn UI** components with **custom styling** for brand consistency.

| Component             | Purpose                                              | Notes                         |
| --------------------- | ---------------------------------------------------- | ----------------------------- |
| `<Hero />`            | Fullscreen video/image, overlay headline, CTA button | Framer Motion fade + parallax |
| `<SectionHeader />`   | Consistent title + subtitle                          | Reusable across pages         |
| `<CoffeeCard />`      | Coffee product display                               | Hover animation, region tag   |
| `<ProcessTimeline />` | Visual process journey                               | Scroll-based reveal           |
| `<PartnerMarquee />`  | Animated partner logos                               | Auto scroll                   |
| `<InquiryForm />`     | B2B export inquiry                                   | Validations + toast feedback  |
| `<Footer />`          | Copyright, social, motif                             | Matte gold divider line       |

---

## 6️⃣ Animation & Motion Principles

* **Entrance animations:** smooth fade-up + delay staggering.
* **Scroll storytelling:** subtle parallax (Framer Motion + `useScroll`).
* **Hover states:** soft elevation, gold glow accent.
* **Video playback:** muted autoplay with overlay text.
* **Performance rule:** < 2.5s LCP, < 100ms TBT.

---

## 7️⃣ SEO & Performance

| Feature                  | Implementation                                                  |
| ------------------------ | --------------------------------------------------------------- |
| **Metadata**             | `next/head` or `metadata` API for title, description, OpenGraph |
| **Structured Data**      | Schema.org for organization and products                        |
| **Internationalization** | English-first with option for Amharic in future                 |
| **Image Optimization**   | Next/Image responsive auto-scaling                              |
| **Speed**                | Static site generation (SSG) + ISR                              |
| **Analytics**            | Google Analytics / Plausible                                    |
| **Accessibility**        | ARIA roles + WCAG 2.2 AA compliance                             |

---

## 8️⃣ Deployment & Maintenance

| Step                  | Tool                                       |
| --------------------- | ------------------------------------------ |
| Hosting               | **Vercel**                                 |
| CI/CD                 | GitHub → Vercel auto-deploy                |
| Code Quality          | ESLint + Prettier + TypeScript strict mode |
| CMS (optional future) | Sanity or Payload CMS                      |
| Backup                | Weekly Git repo backup                     |

---

## 9️⃣ Tone & Copywriting Guide

| Section            | Tone                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| **Hero**           | Elegant, bold, emotional: “From the Ethiopian Highlands to the World’s Finest Cups.”             |
| **About**          | Storytelling, proud, heritage-focused.                                                           |
| **Coffees**        | Descriptive and sensory. “Notes of jasmine, cocoa, and citrus — from Yirgacheffe’s misty hills.” |
| **Sustainability** | Empathetic, human, community-first.                                                              |
| **Contact**        | Confident, warm, open invitation to connect.                                                     |

---

## 🔟 Deliverables Summary

| Deliverable                 | Description                                      |
| --------------------------- | ------------------------------------------------ |
| ✅ Brand Documentation       | This file (colors, typography, tone, principles) |
| ✅ Logo (provided by client) | Integrated with brand system                     |
| ✅ Design System             | Shadcn UI + Tailwind components                  |
| ✅ Website                   | Next.js app (fully optimized)                    |
| ✅ News Section              | Dynamic content with SEO metadata                |
| ✅ Hosting                   | Deployed on Vercel                               |
| ✅ Maintenance Guide         | Basic deployment and update steps                |

---

## Final Words

**CUP COFFEE** isn’t just another coffee exporter site — it’s a digital experience.
It blends the **heritage of Ethiopian coffee culture** with the **refinement of international luxury**.
Every scroll, every animation, every color should feel like the aroma of freshly roasted beans — *authentic, warm, and unforgettable.*

