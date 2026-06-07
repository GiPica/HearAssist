# HearAssist 

HearAssist is a mobile web app we built for hearing-impaired university 
students. It listens to lectures and conversations in real-time, shows 
live captions on screen, and uses AI to generate study notes automatically.

This was built as part of WIG2005: Interactive Design at University of 
Malaya (Semester 2, 2025/2026) by Group OCC 1.



---

## What It Does

You open the app, pick Lecture or Conversation mode, and hit start. 
It listens through your microphone and shows captions as people speak. 
You can star important lines to save them as key points. When you're done, 
it summarizes everything into structured notes using AI such as overview, key 
points, and keywords. You can export the whole thing as a PDF.

---

## How to Run It

You'll need Node.js and Google Chrome installed, plus an Anthropic API 
key from console.anthropic.com.

**1. Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/hearassist.git
cd hearassist
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file in the root folder and add your API key**

**4. Run it**
```bash
npm run dev
```

## Live Demo

[Click here to try it](https://hearassist.netlify.app/)

---

## Built With

- React + Vite
- Tailwind CSS
- Web Speech API
- Claude API by Anthropic
- jsPDF
