import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { Catch } from '../types/Catch'
import { useLocalStorage } from '../hooks/useLocalStorage'

type CatchContextValue = {
    catches: Catch[]
    setCatches: React.Dispatch<React.SetStateAction<Catch[]>>
}

type CatchProviderProps = {
    children: ReactNode
}

export const CatchContext = createContext<CatchContextValue | null>(null)

export function CatchProvider({ children }: CatchProviderProps) {
    const [catches, setCatches] = useLocalStorage<Catch[]>("catches", [
        {
            fish: "Horse Mackerel",
            length: 16,
            id: 1
        },
        {
            fish: "Painted Comber",
            length: 12,
            id: 2
        },
        {
            fish: "Guilthead Seabream",
            length: 12,
            id: 3
        }
    ])

    return (
        <CatchContext value={{ catches, setCatches }}>
            {children}
        </CatchContext>
    )
}

export function useCatches() {
    const context = useContext(CatchContext)

    if (context === null) {
        throw new Error('useCatches must be used within CatchProvider')
    }

    return context
}