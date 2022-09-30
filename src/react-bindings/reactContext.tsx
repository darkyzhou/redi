import { createContext } from 'react'
import type { Injector } from '../injector'

export const RediContext = createContext<{ injector: Injector | null }>({
    injector: null,
})
RediContext.displayName = 'RediContext'

export const RediProvider = RediContext.Provider
export const RediConsumer = RediContext.Consumer
