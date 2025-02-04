import React, { PropsWithChildren, useEffect, useRef } from 'react'
import type { Dependency } from '../dependencyCollection'
import { Injector } from '../injector'

import { RediProvider, RediConsumer } from './reactContext'

function RediInjector(props: PropsWithChildren<{ dependencies: Dependency[] }>) {
    const { children, dependencies } = props
    const childInjectorRef = useRef<Injector | null>(null)

    // dispose the injector when the container Injector unmounts
    useEffect(() => () => childInjectorRef.current?.dispose(), [])

    return (
        <RediConsumer>
            {(context: { injector: Injector | null }) => {
                let childInjector: Injector

                if (childInjectorRef.current) {
                    childInjector = childInjectorRef.current
                } else {
                    childInjector = context.injector
                        ? context.injector.createChild(dependencies)
                        : new Injector(dependencies)

                    childInjectorRef.current = childInjector
                }

                return <RediProvider value={{ injector: childInjector }}>{children}</RediProvider>
            }}
        </RediConsumer>
    )
}

/**
 * @param Comp
 * @param injector
 * @returns
 */
export function connectInjector<T>(Comp: React.ComponentType<T>, injector: Injector): React.ComponentType<T> {
    return function ComponentWithInjector(props: T) {
        return (
            <RediProvider value={{ injector }}>
                <Comp {...props} />
            </RediProvider>
        )
    }
}

export function connectDependencies<T>(
    Comp: React.ComponentType<T>,
    dependencies: Dependency[]
): React.ComponentType<T> {
    return function ComponentWithInjector(props: T) {
        return (
            <RediInjector dependencies={dependencies}>
                <Comp {...props} />
            </RediInjector>
        )
    }
}
