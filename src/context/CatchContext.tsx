import { createContext, useContext } from 'react'
import type { Catch } from '../types/Catch'

type CatchContextValue = {
    catches: Catch[]
    setCatches: React.Dispatch<React.SetStateAction<Catch[]>>
}

export const CatchContext = createContext<CatchContextValue | null>(null)

export function useCatches() {
    const context = useContext(CatchContext)

    if (context === null) {
        throw new Error('useCatches must be used within CatchProvider')
    }

    return context
}