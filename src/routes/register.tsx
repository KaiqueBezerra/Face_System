import { createFileRoute } from '@tanstack/react-router'
import { Register } from '@/components/registration/Register'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return <Register />
}
