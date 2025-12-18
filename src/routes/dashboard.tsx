import { Dashboard } from '@/components/dashboard/Dashboard'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
  beforeLoad: ({ context }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

function DashboardPage() {
  return <Dashboard />
}
