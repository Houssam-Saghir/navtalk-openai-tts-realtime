# NavTalk Avatar + OpenAI TTS (Realtime Lip Sync)

This project is a simple demo:

- Browser page renders a NavTalk avatar (WebRTC)
- You type text and press Send
- A local Node server streams OpenAI TTS as raw PCM
- The browser forwards those PCM bytes to NavTalk (transparency mode) so the avatar lip-syncs

## Prereqs

- Node.js 18+ (recommended)
- NavTalk API key + a valid `characterName`
- OpenAI API key

## Setup

### 1) Install server deps
```bash
npm install
```

### 2) Set OpenAI key
**Windows PowerShell**
```powershell
$env:OPENAI_API_KEY="YOUR_OPENAI_KEY"
```

**macOS/Linux**
```bash
export OPENAI_API_KEY="YOUR_OPENAI_KEY"
```

### 3) Run the TTS proxy
```bash
npm run server
```

Check:
- http://localhost:5179/health  ->  { "ok": true }

### 4) Run the static site server
```bash
npm run web
```

Open:
- http://localhost:5178

## Notes / Troubleshooting

- Don't open `index.html` via `file:///...`. Use the web server. It avoids CSP/connect issues.
- The UI asks for NavTalk key: that's fine for local demo, but don't ship that in client code.
  In production, proxy NavTalk too.
