import { Link } from '@tanstack/react-router'
import { Camera, ShieldCheck, Sparkles, Lock } from 'lucide-react'

export default function Index() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-black text-white">
      <header className="px-6 py-4 border-b border-white/10 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/20 border border-emerald-400/40 grid place-items-center">
              <Camera className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="font-semibold tracking-wide">Face System</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              Criar conta
            </Link>
          </nav>
        </div>
      </header>

      <main className="px-6">
        <section className="max-w-6xl mx-auto py-20 grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-300 mb-4">
              <ShieldCheck className="h-4 w-4" />
              Autenticação biométrica
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Login com reconhecimento facial e senha
            </h1>
            <p className="mt-4 text-gray-300">
              Uma experiência moderna e segura: combine verificação de rosto com
              senha para garantir que só você tenha acesso.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors font-semibold"
              >
                Fazer login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors font-semibold"
              >
                Criar conta
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <Lock className="h-4 w-4" />
              Seus dados ficam somente no seu navegador
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 grid place-items-center">
                  <Sparkles className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <div className="font-semibold">Como funciona</div>
                  <div className="text-sm text-gray-400">
                    IA detecta seu rosto e valida com seu cadastro
                  </div>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-sm text-gray-400">Passo 1</div>
                  <div className="font-semibold">Registre seu rosto</div>
                  <div className="text-sm text-gray-400">
                    Capture um descriptor facial e crie uma senha
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-sm text-gray-400">Passo 2</div>
                  <div className="font-semibold">Faça login</div>
                  <div className="text-sm text-gray-400">
                    Validação dupla: rosto reconhecido + senha correta
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 p-4">
                <div className="text-sm text-gray-400">Destaques</div>
                <ul className="mt-2 space-y-1 text-sm text-gray-300">
                  <li>• Processamento local no navegador</li>
                  <li>• Rápido, seguro e sem backend</li>
                  <li>• Interface simples e responsiva</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-6 border-t border-white/10 text-sm text-gray-400">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>© {new Date().getFullYear()} Face System</div>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-white">
              Entrar
            </Link>
            <Link to="/register" className="hover:text-white">
              Criar conta
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
