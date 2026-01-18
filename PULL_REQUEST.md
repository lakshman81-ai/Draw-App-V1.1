# 🚀 StoryQuest v4.1 - Mobile Responsiveness & Home Button

## Summary
This PR adds mobile responsiveness, a global Home button navigation, and prepares for GitHub Pages deployment.

## What's Changed

### 🏠 Home Button Navigation
- Added Home button to all subpages:
  - Adventure Select
  - Quest Map
  - Quest Active
  - Story Forge
  - Story Theater
- One-tap return to Welcome screen from anywhere

### 📱 Mobile Responsiveness (480px breakpoint)
- **Fixed Home Button** - Always visible in top-left corner on mobile
- **Vertical Quest Trail** - Nodes stack vertically on small screens
- **Stacked Mode Tabs** - Describe/Draw/Capture/Upload stack on phones
- **44px Touch Targets** - All buttons meet minimum tap size
- **iOS Zoom Prevention** - Input font-size set to 16px
- **Touch Active States** - Visual feedback on tap
- **Hidden Floating Elements** - Reduced clutter on mobile

### 🤖 CI/CD (Previously Added)
- GitHub Actions workflow for auto-deployment
- Vite config with GitHub Pages base path

## Files Changed
| File | Change |
|------|--------|
| `src/App.jsx` | Added Home button to 5 screens, 280+ lines mobile CSS |
| `.github/workflows/deploy.yml` | Already configured |
| `vite.config.js` | Base path `/Draw-App-V1.1/` |

## Testing
- [x] Home button works on all screens
- [x] Mobile viewport tested (390x844)
- [x] `npm run build` - Success (781ms, 240KB bundle)
- [x] Dev server runs locally

## Deployment Instructions
1. Push to `main` branch
2. GitHub → Settings → Pages → Source: **GitHub Actions**
3. Wait for workflow to complete
4. App live at `https://<username>.github.io/Draw-App-V1.1/`

## Screenshots

### Desktop - Home Button
![Home Button on Quest Active](file:///C:/Users/reall/.gemini/antigravity/brain/1a551fbb-13e3-47c0-ba52-ea19549303f9/quest_active_home_button_1768705999905.png)

### Mobile View
![Mobile Quest Map](file:///C:/Users/reall/.gemini/antigravity/brain/1a551fbb-13e3-47c0-ba52-ea19549303f9/mobile_quest_map_1768707100655.png)

---
**Type:** ✨ Feature / 📱 Mobile / 🏠 Navigation
