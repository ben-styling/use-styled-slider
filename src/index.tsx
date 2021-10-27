import { useState, useEffect } from 'react'
import styled from 'styled-components'

export const useStyledSlider: UseStyledSlider = ({
    initialItems,
    startIndex = 0,
    slidesPerView = 1,
}) => {
    // const useSpring = motion.useSpring
    // const set = motion.set
    const [currentIndex, setCurrentIndex] = useState(startIndex)
    const [currentSlide, setCurrentSlide] = useState(startIndex + 1)
    useEffect(() => {
        setCurrentSlide(currentIndex + 1)
    }, [currentIndex])
    const [items, setItems] = useState(Array.isArray(initialItems) ? initialItems : [initialItems])
    const addItem: AddItem = (newItem) => setItems((items) => [...items, newItem])
    const addItems: AddItems = (newItems) => newItems.forEach((item) => addItem(item))
    const next: Noop = () => setCurrentIndex((currentIndex) => currentIndex + 1)
    const prev: Prev = () => setCurrentIndex((currentIndex) => currentIndex - 1)
    const gotoIndex: Goto = (index) => setCurrentIndex(index)
    const gotoSlide: Goto = (slide) => setCurrentIndex(slide - 1)

    const itemLength = 10

    const slideCanMove = (index: number, direction: Direction) => {
        const newIndex = index + direction
        const canMove = newIndex <= 0 && newIndex >= (itemLength - slidesPerView) * -1
        return canMove
    }

    return {
        items,
        addItems,
        addItem,
        currentIndex,
        currentSlide,
        next,
        prev,
        gotoIndex,
        gotoSlide,
    }
}

export const Container = styled.div``
export const Item = styled.div``

export default useStyledSlider


export enum Direction {
    Left = -1,
    right = 1,
}

export type Noop = () => void
export type Prev = () => void
export type Goto = (number: number) => void
export type AddItems = (data: object[]) => void
export type AddItem = (data: object) => void
export type UseStyledSliderProps = {
    initialItems: object[] | object
    startIndex?: number
    slidesPerView?: number
}
export type UseStyledSliderResult = {
    items: object[]
    addItems: AddItems
    addItem: AddItem
    currentIndex: number
    currentSlide: number
    next: Noop
    prev: Prev
    gotoIndex: Goto
    gotoSlide: Goto
}
export type UseStyledSlider = (props: UseStyledSliderProps) => UseStyledSliderResult
