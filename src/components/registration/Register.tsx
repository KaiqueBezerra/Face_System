import { useNavigate, Link } from '@tanstack/react-router'
import { useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import * as faceapi from 'face-api.js'
import { useFaceModels } from '../../hooks/useFaceModels'

export function Register() {
  const navigate = useNavigate()
  const webcamRef = useRef<Webcam>(null)
  const { isModelLoaded, modelStatus } = useFaceModels()

  const [nameInput, setNameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [detectedFace, setDetectedFace] =
    useState<faceapi.FaceDetection | null>(null)
  const [status, setStatus] = useState('')

  // Check for face periodically
  const handleCheckFace = async () => {
    if (
      !isModelLoaded ||
      !webcamRef.current?.video ||
      webcamRef.current.video.readyState !== 4
    )
      return

    const video = webcamRef.current.video
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (detection) {
      setDetectedFace(detection.detection)
      return detection
    } else {
      setDetectedFace(null)
      return null
    }
  }

  // Run check loop just for visual feedback
  useEffect(() => {
    const interval = setInterval(() => {
      handleCheckFace()
    }, 1000)
    return () => clearInterval(interval)
  }, [isModelLoaded]) // Add dependency

  // Update status based on detection
  useEffect(() => {
    if (detectedFace) {
      setStatus('Face detected! Ready to register.')
    } else {
      setStatus('Position your face in the camera...')
    }
  }, [detectedFace])

  const handleRegister = async () => {
    if (!nameInput || !passwordInput) {
      alert('Please enter name and password')
      return
    }

    const detection = await handleCheckFace()
    if (detection) {
      const newUser = {
        name: nameInput,
        password: passwordInput,
        descriptor: Array.from(detection.descriptor),
      }

      // Get existing users
      const existingUsersStr = localStorage.getItem('users')
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : []

      // Add new user
      existingUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(existingUsers))

      setStatus('Registration successful!')
      alert('User registered successfully!')
      navigate({ to: '/login' })
    } else {
      alert(
        'No face detected. Please position yourself in front of the camera.',
      )
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl overflow-hidden shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register New User
        </h2>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6 border-2 border-gray-700">
          {!isModelLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10 text-gray-400">
              {modelStatus}
            </div>
          )}
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ width: 640, height: 480, facingMode: 'user' }}
          />
          {detectedFace && (
            <div className="absolute top-2 right-2 bg-green-500 w-4 h-4 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
          )}
          {detectedFace && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-green-400 text-xs px-2 py-1 rounded text-center">
              {status}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="********"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={!isModelLoaded}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Register
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="text-sm text-gray-400 hover:text-white underline"
            >
              Already have an account? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
