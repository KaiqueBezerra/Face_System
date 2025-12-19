import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { Camera } from 'lucide-react'

type Action = {
  to: string
  label: string
  variant?: 'primary' | 'secondary'
}

type HeaderProps = {
  color?: 'blue' | 'emerald'
  actions?: Action[]
}

export default function Header({ color = 'blue', actions = [] }: HeaderProps) {
  const iconBoxClass = clsx(
    'h-9 w-9 rounded-lg grid place-items-center border',
    color === 'emerald'
      ? 'bg-emerald-500/20 border-emerald-400/40'
      : 'bg-blue-500/20 border-blue-400/40',
  )
  const iconClass = clsx(
    'h-5 w-5',
    color === 'emerald' ? 'text-emerald-400' : 'text-blue-400',
  )
  const primaryBtnClass = clsx(
    'px-4 py-2 rounded-lg transition-colors',
    color === 'emerald'
      ? 'bg-emerald-600 hover:bg-emerald-700'
      : 'bg-blue-600 hover:bg-blue-700',
  )
  const secondaryBtnClass =
    'px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'

  return (
    <header className="px-6 py-4 border-b border-white/10 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={iconBoxClass}>
            <Camera className={iconClass} />
          </div>
          <span className="font-semibold tracking-wide">Face System</span>
        </div>
        <nav className="flex items-center gap-3">
          {actions.map((a, i) => (
            <Link
              key={`${a.to}-${i}`}
              to={a.to}
              className={
                a.variant === 'primary' ? primaryBtnClass : secondaryBtnClass
              }
            >
              {a.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
