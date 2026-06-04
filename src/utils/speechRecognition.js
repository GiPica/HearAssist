const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export function createRecognition() {
  if (!SpeechRecognition) return null

  const recognition = new SpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'en-US'
  recognition.maxAlternatives = 1
  return recognition
}

export function getNoiseLevel(confidence) {
  if (confidence === undefined || confidence === null) return 'Medium'
  if (confidence > 0.75) return 'Low'
  if (confidence > 0.45) return 'Medium'
  return 'High'
}

export function isSupported() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}
