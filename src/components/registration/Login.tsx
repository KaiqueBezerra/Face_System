import { useNavigate, Link } from '@tanstack/react-router'
import { useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import * as faceapi from 'face-api.js'
import { useFaceModels } from '../../hooks/useFaceModels'

export function Login() {
  const navigate = useNavigate()
  const webcamRef = useRef<Webcam>(null)
  const { isModelLoaded, modelStatus } = useFaceModels()

  const [nameInput, setNameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [detectedFace, setDetectedFace] =
    useState<faceapi.FaceDetection | null>(null)
  const [identifiedUser, setIdentifiedUser] = useState<string | null>(null)

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

      // Try to identify user
      const existingUsersStr = localStorage.getItem('users')
      if (existingUsersStr) {
        const users = JSON.parse(existingUsersStr)
        let bestMatch = null
        let minDistance = 0.6

        for (const user of users) {
          const distance = faceapi.euclideanDistance(
            detection.descriptor,
            new Float32Array(user.descriptor),
          )
          if (distance < minDistance) {
            minDistance = distance
            bestMatch = user
          }
        }

        if (bestMatch) {
          setIdentifiedUser(bestMatch.name)
          if (!nameInput) {
            setNameInput(bestMatch.name)
          }
        } else {
          setIdentifiedUser(null)
        }
      }

      return detection
    } else {
      setDetectedFace(null)
      setIdentifiedUser(null)
      return null
    }
  }

  // Run check loop
  useEffect(() => {
    const interval = setInterval(() => {
      handleCheckFace()
    }, 1000)
    return () => clearInterval(interval)
  }, [isModelLoaded])

  const handleLogin = async () => {
    if (!nameInput || !passwordInput) {
      alert('Please enter name and password')
      return
    }

    // 1. Verify credentials
    const existingUsersStr = localStorage.getItem('users')
    const users = existingUsersStr ? JSON.parse(existingUsersStr) : []
    const user = users.find(
      (u: any) => u.name === nameInput && u.password === passwordInput,
    )

    if (!user) {
      alert('Invalid username or password')
      return
    }

    // 2. Verify Face
    // Try to get a current detection if state is missing
    let detection = null

    // First try the one from state if available (for speed)
    // But we need the descriptor which isn't in detectedFace state (that's just the box)
    // So we should just run a fresh detection to be safe and secure
    if (webcamRef.current?.video && webcamRef.current.video.readyState === 4) {
      detection = await faceapi
        .detectSingleFace(
          webcamRef.current.video,
          new faceapi.TinyFaceDetectorOptions(),
        )
        .withFaceLandmarks()
        .withFaceDescriptor()
    }

    if (!detection) {
      alert('Face not detected. Please look at the camera.')
      return
    }

    // 3. Match Face
    const distance = faceapi.euclideanDistance(
      detection.descriptor,
      new Float32Array(user.descriptor),
    )

    if (distance < 0.6) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userName', user.name)
      navigate({ to: '/dashboard' })
    } else {
      alert('Face does not match the user record. Access denied.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl overflow-hidden shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Secure Login</h2>

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
          {identifiedUser && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-green-400 text-xs px-2 py-1 rounded text-center">
              Identified: {identifiedUser}
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
              placeholder="Enter your name"
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
            onClick={handleLogin}
            disabled={!isModelLoaded}
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Login
          </button>

          <div className="text-center pt-2">
            <Link
              to="/register"
              className="text-sm text-gray-400 hover:text-white underline"
            >
              Create a new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
