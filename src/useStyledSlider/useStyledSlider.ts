import useSlider from '../useSlider'

export const useStyledSlider = <T,>({
    initialSlides,
    startIndex = 0,
    gutter = 0,
    slidesPerView = 1,
}: UseStyledSliderProps<T>) => {
    const slider = useSlider<T>({ initialSlides, startIndex, gutter, slidesPerView })


    const getWrapperProps = (transition?: string) => {
        const data: {
            style: any,
            gutter: number,
            transition?: string
        } = {
            style: {
                transform: `translate3d(${slider.currentIndex * -100}%, 0px, 0px)`
            },
            gutter,
        }
        if (transition) {
            data.transition = transition
        }

        return data
    }

    return { ...slider, getWrapperProps }
}

export default useStyledSlider

export type UseStyledSliderProps<T> = {
    initialSlides: T[]
    startIndex?: number
    slidesPerView?: number
    liveMeasure?: boolean
    gutter?: number
}

