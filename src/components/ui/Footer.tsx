import { Link } from '@tanstack/react-router'

type FooterLink = {
  to: string
  label: string
}

type FooterProps = {
  links?: FooterLink[]
}

export default function Footer({ links }: FooterProps) {
  const items =
    links ??
    [
      { to: '/login', label: 'Entrar' },
      { to: '/register', label: 'Criar conta' },
    ]

  return (
    <footer className="px-6 py-6 border-t border-white/10 text-sm text-gray-400">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>© {new Date().getFullYear()} Face System</div>
        <div className="flex gap-4">
          {items.map((l, i) => (
            <Link key={`${l.to}-${i}`} to={l.to} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
