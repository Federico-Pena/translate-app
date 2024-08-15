import { useEffect, useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import { useContextSettings } from './useContextSettings'

const useVoice = ({ translateText }) => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const { inputLang, outputLang, voiceGender } = useContextSettings()
  const [translatedText, setTranslatedText] = useState('')
  const [voice, setVoice] = useState(null)
  const [error, setError] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    try {
      const voices = window.speechSynthesis.getVoices()
      const voiceFilter = voices.find((voice) => voice.name === voiceGender)
      setVoice(voiceFilter)
    } catch (err) {
      if (err) {
        setError('Error seleccionando la voz.')
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    }
  }, [voiceGender, voice])

  const startListening = async () => {
    try {
      resetTranscript()
      setTranslatedText('')
      setError(null)
      await SpeechRecognition.startListening({
        continuous: true,
        language: inputLang
      })
    } catch (err) {
      if (err) {
        setError('Error intentando grabar.')
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    }
  }

  const stopListening = async () => {
    try {
      SpeechRecognition.stopListening()
      const translation = await translateText(transcript, inputLang, outputLang)
      const fixedText = decodeHTMLEntities(translation)
      setTranslatedText(fixedText)
      speakText(fixedText)
    } catch (err) {
      if (err) {
        setError('Error intentando traducir.')
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    }
  }
  const decodeHTMLEntities = (text) => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text || ''
    return textArea.value
  }
  const speakText = (text) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = voice
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      window.speechSynthesis.speak(utterance)
    } catch (err) {
      if (err) {
        setError('Error intentando reproducir el audio.')
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    }
  }

  return {
    startListening,
    stopListening,
    translatedText,
    transcript,
    error,
    speakText,
    isPlaying
  }
}

export default useVoice
