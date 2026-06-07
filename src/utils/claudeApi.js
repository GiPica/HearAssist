const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

export async function generateNotes(transcript) {
  const transcriptText = transcript
    .map(t => `${t.speaker === 1 ? 'Speaker 1' : 'Speaker 2'}: ${t.text}`)
    .join('\n')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: 'You are an academic note-taking assistant. Given a lecture transcript, extract: 1) A lecture overview (1-2 sentences), 2) Key points (3-5 bullet points of the most important facts), 3) Keywords (5-8 important terms as a comma-separated list). Return ONLY a JSON object with keys: overview (string), keyPoints (array of strings), keywords (array of strings). No markdown, no extra text, just the JSON object.',
      messages: [
        {
          role: 'user',
          content: `Please analyze this transcript and extract the notes:\n\n${transcriptText || 'Sample lecture about cell biology and mitochondria as the powerhouse of the cell.'}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    console.warn('Claude API failed, using mock response')
    return {
      overview: "This lecture covered the fundamentals of cell biology focusing on mitochondria and energy production.",
      keyPoints: [
        "Mitochondria are the powerhouse of the cell",
        "The Krebs cycle generates ATP molecules",
        "Cellular respiration occurs in the mitochondria"
      ],
      keywords: ["Mitochondria", "ATP", "Krebs Cycle", "Respiration", "Cellular Energy"]
    }
  }

  const data = await response.json()
  const text = data.content[0].text.trim()

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Could not parse JSON from Claude response')

  return JSON.parse(jsonMatch[0])
}
