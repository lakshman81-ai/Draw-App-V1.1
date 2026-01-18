# StoryQuest - GitHub Pages Deployment

A magical interactive story-building adventure game for kids built with React.

## 🎮 Features

- **Interactive Story Building**: Create your own legendary tales through guided quests
- **Multiple Adventure Modes**: Apprentice, Explorer, and Legend difficulties
- **Badge System**: Collect badges as you complete story elements
- **Challenge Arena**: Test your story knowledge
- **Text-to-Speech**: Hear your story read aloud
- **Word Power-Ups**: Level up your vocabulary

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

1. Update the `base` path in `vite.config.js` with your repository name
2. Push to GitHub
3. The GitHub Actions workflow will automatically build and deploy

## 📁 Project Structure

```
├── index.html          # Entry HTML file
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # App entry point
│   └── App.jsx         # Main StoryQuest component
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

## 🎯 Usage

1. Click "Begin Your Quest!" to start
2. Choose your adventure difficulty
3. Complete each quest by selecting story elements
4. Forge your story in the Story Forge
5. Experience your tale in the Story Theater
6. Test your knowledge in the Challenge Arena
7. Reflect in the Crystal of Wisdom
8. Celebrate your victory!

## 📄 License

MIT
