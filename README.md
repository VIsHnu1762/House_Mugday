<<<<<<< Updated upstream
# ☕ House Mugday — Marketing Strategy & Webpage  
🔗 **Live Website:** [https://house-mugday.onrender.com](https://house-mugday.onrender.com)

---

### 🧁 Project Overview
**House Mugday** is a cozy café concept that blends comfort, creativity, and connection — where every mug tells a story.  
This project focuses on developing a **digital marketing strategy** and an **interactive café webpage** to enhance brand visibility, customer engagement, and business reach.  

🌐 **Visit the Live Site:** [house-mugday.onrender.com](https://house-mugday.onrender.com)
=======
<div align="center">

# ☕ House Mugday Café — Website & Marketing

Beautiful, responsive, and SEO-friendly café website with a cohesive brand experience and a practical marketing starter kit.

</div>
>>>>>>> Stashed changes

---

## ✨ Highlights

- Modern, mobile-first UI with elegant gold accents and discover-style headings
- Smooth animations, parallax hero slider, and image galleries
- Built with plain HTML, CSS, and JavaScript — no build step required
- Accessibility, SEO, and performance improvements out of the box
- Practical troubleshooting guides (loader and text visibility)

---

## 🚀 Quick Start

Choose any option below.

1) Open locally (no server required)
- Clone or download the repo
- Open `index.html` in your browser

2) Recommended: Live reload in VS Code
- Install the “Live Server” extension
- Right‑click `index.html` → “Open with Live Server”

3) Any static host (GitHub Pages/Netlify/Vercel)
- Deploy the repository as a static site — no build needed

---

## 🧭 Project Structure

```
House_Mugday/
├── index.html                # Home page
├── about.html, services.html, contact.html, ...
├── css/
│   ├── style.css             # Base theme + Bootstrap v4 derived styles
│   ├── enhancements.css      # Modern UI polish (animations, buttons, shadows)
│   ├── mobile-responsive.css # Mobile/touch improvements
│   ├── text-visibility-fix.css # Force-visibility overrides (safety net)
│   └── ...
├── js/
│   ├── main.js               # Core interactions (carousel, AOS, counters)
│   ├── enhancements.js       # UX extras: cart, validation, scroll-to-top
│   ├── loader-fix.js         # Guarantees loader hides quickly
│   └── ...
├── images/                   # Site images
├── md/                       # Additional docs
│   ├── QUICK_START.md
│   ├── TEXT_FIX_GUIDE.md
│   ├── LOADER_FIX_GUIDE.md
│   └── STYLING_IMPROVEMENTS.md
└── README.md
```

---

## 🧠 Features

This site ships a compact but practical feature set focused on accessibility, performance, and a polished visual identity. Key features and where to find them:

- **Hero Slider & Overlay:** Accessible image slider with readable headings and strong contrast. See `index.html` (hero section) and styling in `css/style.css` + `css/enhancements.css`.
- **"Discover" Headings:** Distinctive gold cursive accent for section titles and bold headings to match the requested visual language. Implemented in `css/text-visibility-fix.css` and `css/enhancements.css`.
- **Responsive Layout & Mobile Improvements:** Mobile-first tweaks and touch targets are in `css/mobile-responsive.css`.
- **Accessibility Improvements:** Focus outlines, keyboard navigation support for the lightbox, reduced motion support, and better contrast across sections — implemented in `css/enhancements.css` and `css/mobile-responsive.css`.
- **Booking Form Validation:** Client-side validation and user-friendly error/success toasts; logic in `js/enhancements.js` (function: form validation + toast messages).
- **Add-to-Cart Demo:** Simple cart counter persisted in `localStorage` for demo purposes, implemented in `js/enhancements.js` (cart counter and localStorage helpers).
- **Loader Safety Net:** Robust loader-hide guard to prevent the page from getting stuck on a spinner; implemented in `js/loader-fix.js` and an inline emergency script in `index.html`.
- **Text Visibility Safety:** A last-resort stylesheet `css/text-visibility-fix.css` forces contrast and z-index fixes for hero and content text when images or overlays would otherwise hide them.
- **Lazy Loading & Performance:** Image lazy-loading via IntersectionObserver, simplified animations on mobile, and small interaction optimizations in `js/enhancements.js`.
- **Micro-Interactions & UI Polish:** Smooth scroll-to-top, button hover effects, accessible tooltips, reveal animations (AOS tweaks) and reading progress indicator — primarily in `js/enhancements.js` + `css/enhancements.css`.
- **Galleries & Lightbox:** Image galleries with keyboard navigation and Magnific Popup integration (see `js/main.js` and `js/enhancements.js`).
- **SEO & Social Meta:** Pre-filled meta tags and Open Graph/Twitter Card entries in `index.html` for improved sharing and indexing.
- **No Build Required:** Pure static site — open `index.html` or deploy to any static host (GitHub Pages, Netlify, Vercel).

If you want to remove or roll back any enhancement temporarily, the troubleshooting section explains which files to comment out and how to revert safely.

---

## 🔧 Configuration

### SEO & Social
Update meta tags in `index.html` `<head>`:
- `description`, `keywords`, `author`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`)
- Favicon: replace `images/favicon.ico`

### Google Maps (optional)
`index.html` includes a Google Maps script tag. Replace the API key with your own or remove the script if you don’t need the map:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&sensor=false"></script>
```

### Brand & Colors
- Edit CSS variables in `css/enhancements.css` (primary gold, typography, shadows)
- Swap images in `images/` to match your brand

---

## � How to Run Tests (Manual)

This is a static site. Validate quickly by:
- Open `index.html` and check that the loader disappears within 1–2s
- Verify hero text is visible on all slides
- Submit the booking form (try invalid → errors; valid → success toast)
- Click “Add to Cart” on products — counter should increment and persist

---

## 🩺 Troubleshooting

### Page stuck on loading
- We ship a guard that hides the loader within 2s (`js/loader-fix.js`)
- See `md/LOADER_FIX_GUIDE.md` if the spinner doesn’t disappear

### Text not visible on hero/images
- We include a safety stylesheet: `css/text-visibility-fix.css`
- See `md/TEXT_FIX_GUIDE.md` for diagnostics and emergency overrides

### Want the classic look back?
- Temporarily comment these in `index.html` to revert extras:
  - `css/enhancements.css`, `css/mobile-responsive.css`
  - `js/enhancements.js`, `js/loader-fix.js`

---

## ♿ Accessibility & ♻️ Performance

- Focus styles, keyboardable popups, larger touch targets
- Reduced‑motion, high‑contrast, and dark‑mode accommodations
- Lazy loading via IntersectionObserver, simplified shadows on mobile

---

## 📦 Deployment

Any static host works:
- GitHub Pages: push `main` → enable Pages
- Netlify/Vercel: import repo → deploy as static site

---

## 🤝 Contributing

1. Fork the repo and create a feature branch
2. Keep changes scoped; prefer minimal, readable diffs
3. Open a PR describing motivation, screenshots, and testing notes

---

## � Credits & License Notes

- Base layout and styles draw from a Colorlib template (CC BY 3.0). Please retain the footer credit per license terms.
- Icons: Open Iconic, Icomoon, Ionicons; Fonts: Google Fonts.

---

## 📬 Contact
<<<<<<< Updated upstream
**House Mugday Café**  
📍 Location: [Your Café Address]  
📞 Contact: [Your Phone Number]  
🌐 Website: [https://house-mugday.onrender.com](https://house-mugday.onrender.com)  
✉️ Email: [Your Email Address]
=======
>>>>>>> Stashed changes

**House Mugday Café**  
📍 Coimbatore, Tamil Nadu, India  
📞 +91 63799 22080  
✉️ housemugdaycafe@gmail.com

> “Every sip has a story — discover yours at House Mugday.”  
> ☕ **Live Now:** [https://house-mugday.onrender.com](https://house-mugday.onrender.com)
