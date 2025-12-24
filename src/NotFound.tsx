import { Link } from '@tanstack/react-router'
import Header from './components/header/Header'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-black text-white">
      <Header
        color="blue"
        actions={[
          { to: '/', label: 'Início', variant: 'secondary' },
          { to: '/login', label: 'Entrar', variant: 'primary' },
        ]}
      />
      <div className="px-6">
        <div className="max-w-3xl mx-auto py-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center">
          <h1 className="text-4xl font-bold">Página não encontrada</h1>
          <p className="mt-3 text-gray-300">
            A rota acessada não existe ou foi movida.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Ir para Início
            </Link>
            <Link
              to="/login"
              className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Fazer Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
