import { useState, useEffect, useLayoutEffect, useCallback } from 'react'

function getDimensionObject(node: HTMLElement): DimensionObject {
    const rect = node.getBoundingClientRect()

    const top = rect?.y || rect.top
    const left = rect?.x || rect.left

    return {
        width: rect.width,
        height: rect.height,
        x: left,
        y: top,
        left,
        top,
        right: rect.right,
        bottom: rect.bottom,
    }
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const useDimensions: UseDimensions = (props) => {
    const ssrWidth = props?.ssrWidth || 1920
    const liveMeasure = props?.liveMeasure || true
    const [dimensions, setDimensions] = useState<DimensionObject>({
        width: ssrWidth,
        height: 0,
        top: 0,
        left: 0,
        x: 0,
        y: 0,
        right: 0,
        bottom: 0,
    })
    const [node, setNode] = useState(null)

    const ref = useCallback((currentNode) => {
        setNode(currentNode)
    }, [])

    useIsomorphicLayoutEffect(() => {
        if (node) {
            const measure = () => {
                window.requestAnimationFrame(() => {
                    setDimensions(getDimensionObject(node))
                })
            }
            measure()

            if (liveMeasure) {
                window.addEventListener('resize', measure)

                return () => {
                    window.removeEventListener('resize', measure)
                }
            }
        }
        return
    }, [node])

    return { ref, dimensions, node }
}

export default useDimensions

type DimensionObject = {
    width: number
    height: number
    top: number
    left: number
    x: number
    y: number
    right: number
    bottom: number
}

type UseDimensionsResult = {
    ref: (node: HTMLElement | null) => void
    dimensions: DimensionObject
    node: HTMLElement | null
}

export type UseDimensionsProps = {
    liveMeasure?: boolean
    ssrWidth?: number
}

export type UseDimensions = (props?: UseDimensionsProps) => UseDimensionsResult
