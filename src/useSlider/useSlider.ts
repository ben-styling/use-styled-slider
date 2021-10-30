import { useState, useEffect } from 'react'
import useDimensions from '../useDimensions'

const canMoveSlide = (index: number, direction: Direction, slideLength: number) => {
    const newIndex = index + direction
    if (newIndex >= slideLength) return false
    if (newIndex <= -1) return false
    return true
}

const makeArray = <T,>(data: T | object) => (Array.isArray(data) ? data : [data])

export const useSlider: UseSlider = ({
    initialSlides,
    startIndex = 0,
    gutter = 0,
    slidesPerView = 1,
}) => {
    const {
        ref: containerRef,
        dimensions: { width: containerWidth },
    } = useDimensions()

    const getSlideWidth = () => containerWidth / slidesPerView + gutter / slidesPerView

    useEffect(() => {
        getSlideWidth()
    }, [containerWidth, slidesPerView, gutter, slidesPerView])

    const [slideWidth,] = useState(getSlideWidth())

    const [currentIndex, setCurrentIndex] = useState(startIndex)
    const [currentSlide, setCurrentSlide] = useState(startIndex + 1)
    const [hasNextSlide, setHasNextSlide] = useState(false)
    const [hasPrevSlide, setHasPrevSlide] = useState(false)

    const [slides, setSlides] = useState(makeArray(initialSlides))
    const [slideLength, setSlideLength] = useState(
        Array.isArray(initialSlides) ? initialSlides.length : 1
    )
    const removeSlide: RemoveSlide = (slideIndex) => {
        setSlides((slides) => slides.filter((_item, index) => index !== slideIndex))
        if (slideIndex <= currentIndex) setCurrentIndex((i) => (i - 1 < 0 ? 0 : i - 1))
    }
    const addSlide: AddSlide = (newSlide) => setSlides((slides) => [...slides, newSlide])
    const addSlides: AddSlides = (newSlides) => newSlides.forEach((slide) => addSlide(slide))
    const next: Noop = () => {
        if (hasNextSlide) setCurrentIndex((currentIndex) => currentIndex + 1)
    }
    const prev: Noop = () => {
        if (hasPrevSlide) setCurrentIndex((currentIndex) => currentIndex - 1)
    }
    const gotoIndex: Goto = (index) => setCurrentIndex(index)
    const gotoSlide: Goto = (slide) => setCurrentIndex(slide - 1)

    useEffect(() => {
        setHasPrevSlide(canMoveSlide(currentIndex, Direction.Left, slideLength))
        setHasNextSlide(canMoveSlide(currentIndex, Direction.Right, slideLength))
    }, [currentIndex, slideLength])

    const resetSlides: ResetSlides = (newSlides) => {
        setSlides(makeArray(newSlides || initialSlides))
        setCurrentIndex(0)
    }

    useEffect(() => {
        setCurrentSlide(currentIndex + 1)
    }, [currentIndex])
    useEffect(() => {
        setSlideLength(slides.length)
    }, [slides.length])

    return {
        slides,
        addSlides,
        addSlide,
        removeSlide,
        currentIndex,
        currentSlide,
        next,
        prev,
        gotoIndex,
        gotoSlide,
        hasNextSlide,
        hasPrevSlide,
        resetSlides,
        containerWidth,
        containerRef,
        slideWidth,
        slideLength
    }
}

export default useSlider

export enum Direction {
    Left = -1,
    Right = 1,
}

export type Noop = () => void
export type Goto = (number: number) => void
export type AddSlides = <T>(data: T[]) => void
export type AddSlide = <T>(data: T) => void
export type RemoveSlide = (slideIndex: number) => void
export type ResetSlides = (slides?: any[]) => void
export type ContainerRef = (currentNode: any) => void
export type UseSliderProps<T> = {
    initialSlides: T[]
    startIndex?: number
    slidesPerView?: number
    liveMeasure?: boolean
    gutter?: number
}
export type UseSliderResult<T> = {
    slides: T[]
    addSlides: AddSlides
    addSlide: AddSlide
    removeSlide: RemoveSlide
    currentIndex: number
    currentSlide: number
    next: Noop
    prev: Noop
    gotoIndex: Goto
    gotoSlide: Goto
    hasNextSlide: boolean
    hasPrevSlide: boolean
    resetSlides: ResetSlides
    containerWidth: number
    containerRef: ContainerRef
    slideWidth: number
    slideLength: number
}
export type UseSlider = <T = object>(props: UseSliderProps<T>) => UseSliderResult<T>
