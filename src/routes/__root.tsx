import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import NotFound from '../components/notfound/NotFound'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Face System',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

import { AuthProvider } from '../context/auth/AuthContext'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-black text-white">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header
              color="blue"
              actions={[
                { to: '/login', label: 'Entrar', variant: 'secondary' },
                { to: '/register', label: 'Criar conta', variant: 'primary' },
              ]}
            />
            <main className="flex-1 px-6 flex items-center">{children}</main>
            <Footer />
          </div>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
          <Scripts />
        </AuthProvider>
      </body>
    </html>
  )
}
