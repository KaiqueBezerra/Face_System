import { createFileRoute, redirect } from '@tanstack/react-router'
import { Dashboard } from '@/components/dashboard/Dashboard'

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
