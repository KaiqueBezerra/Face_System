import {
    createContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
} from 'react'

const API_URL = 'http://localhost:3333'

export interface User {
    id: string
    username: string
}

export interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (token: string, user: User) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        setUser(null)
    }, [])

    const login = useCallback((token: string, newUser: User) => {
        console.log('Login with token:', token, 'and user:', newUser)
        localStorage.setItem('token', token)
        setUser(newUser)
    }, [])

    useEffect(() => {
        async function validateToken() {
            const token = localStorage.getItem('token')
            if (!token) {
                setIsLoading(false)
                return
            }

            try {
                const response = await fetch(`${API_URL}/api/auth/validate`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.valid && data.user) {
                        setUser(data.user)
                    } else {
                        logout()
                    }
                } else {
                    logout()
                }
            } catch {
                logout()
            } finally {
                setIsLoading(false)
            }
        }

        validateToken()
    }, [logout])

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
