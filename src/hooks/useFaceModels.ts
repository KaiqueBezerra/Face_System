import { useEffect, useState } from 'react'
import * as faceapi from 'face-api.js'

export function useFaceModels() {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [modelStatus, setModelStatus] = useState('Loading models...')

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models'
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ])
        setIsModelLoaded(true)
        setModelStatus('Models loaded')
      } catch (error) {
        console.error('Error loading models:', error)
        setModelStatus('Error loading models')
      }
    }

    loadModels()
  }, [])

  return { isModelLoaded, modelStatus }
}
