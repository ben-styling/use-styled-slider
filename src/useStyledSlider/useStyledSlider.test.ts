import useStyledSlider, { useStyledSlider as namedHook, UseStyledSliderProps } from './useStyledSlider'
import { renderHook, act } from '@testing-library/react-hooks'

test('exports a function (default)', () => {
    expect(useStyledSlider).toBeInstanceOf(Function)
})
test('exports a function (named)', () => {
    expect(namedHook).toBeInstanceOf(Function)
})
test('hooks identity are the same', () => {
    expect(useStyledSlider).toBe(namedHook)
})
test('is a named function', () => {
    // aids stack trace debugging.
    expect(useStyledSlider.name).toBe('useStyledSlider')
})
describe('useStyledSlider', () => {
    test('Basic slider functionality', () => {
        const { result, rerender } = renderHook((props: UseStyledSliderProps) =>
            useStyledSlider(props)
        )
        rerender({ initialSlides: [{ boo: '1' }] })
        
        // assert initial slides
        expect(result.current.containerWidth).toEqual(1920)
        expect(result.current.slides).toEqual([{ boo: '1' }])

        // Add new slide
        act(() => result.current.addSlide({ boo: '2' }))

        // Assert new slides
        expect(result.current.slides).toHaveLength(2)

        // Assert has no prev but has next
        expect(result.current.currentIndex).toEqual(0)
        expect(result.current.currentSlide).toEqual(1)
        expect(result.current.slides.length).toEqual(2)
        expect(result.current.hasPrevSlide).toEqual(false)
        expect(result.current.hasNextSlide).toEqual(true)

        // Add new slides
        act(() => result.current.addSlides([{ boo: '3' }, { boo: '4' }]))

        // Assert new slides
        expect(result.current.slides).toEqual([
            { boo: '1' },
            { boo: '2' },
            { boo: '3' },
            { boo: '4' },
        ])

        // Assert current index
        expect(result.current.currentIndex).toEqual(0)
        expect(result.current.currentSlide).toEqual(1)

        // Go to next slide
        act(() => result.current.next())
        expect(result.current.currentIndex).toEqual(1)
        expect(result.current.currentSlide).toEqual(2)

        // Go to next slide (x2)
        act(() => result.current.next())
        act(() => result.current.next())

        // Go to prev slide
        act(() => result.current.prev())
        expect(result.current.currentIndex).toEqual(2)
        expect(result.current.currentSlide).toEqual(3)

        // Go to slide 2
        act(() => result.current.gotoSlide(2))
        expect(result.current.currentIndex).toEqual(1)
        expect(result.current.currentSlide).toEqual(2)

        // Go to index 2
        act(() => result.current.gotoIndex(2))
        expect(result.current.currentIndex).toEqual(2)
        expect(result.current.currentSlide).toEqual(3)

        // Remove first slide
        act(() => result.current.removeSlide(0))

        // Assert new slides
        expect(result.current.slides).toEqual([{ boo: '2' }, { boo: '3' }, { boo: '4' }])

        // Assert index is updated
        expect(result.current.currentIndex).toEqual(1)
        expect(result.current.currentSlide).toEqual(2)

        // Remove last slide
        act(() => result.current.removeSlide(2))

        // Assert new slides
        expect(result.current.slides).toEqual([{ boo: '2' }, { boo: '3' }])

        // Assert index is updated
        expect(result.current.currentIndex).toEqual(1)
        expect(result.current.currentSlide).toEqual(2)

        // Go to index 2
        act(() => result.current.gotoIndex(0))

        // Remove first slide
        act(() => result.current.removeSlide(0))

        // Assert new slides
        expect(result.current.slides).toEqual([{ boo: '3' }])

        // Assert index is updated
        expect(result.current.currentIndex).toEqual(0)
        expect(result.current.currentSlide).toEqual(1)

        // Assert has no prev or next slides
        expect(result.current.hasPrevSlide).toEqual(false)
        expect(result.current.hasNextSlide).toEqual(false)

        // Set new slides
        act(() => result.current.resetSlides([{ boo: 1 }, { boo: 2 }, { boo: 3 }]))
        expect(result.current.slides).toEqual([{ boo: 1 }, { boo: 2 }, { boo: 3 }])
        expect(result.current.slides.length).toEqual(3)

        expect(result.current.currentIndex).toEqual(0)
        expect(result.current.currentSlide).toEqual(1)

        // Assert has no prev but has next
        expect(result.current.hasPrevSlide).toEqual(false)
        expect(result.current.hasNextSlide).toEqual(true)

        // Goto index 2
        act(() => result.current.gotoIndex(1))

        // Assert has no prev or next slides
        expect(result.current.hasPrevSlide).toEqual(true)
        expect(result.current.hasNextSlide).toEqual(true)

        // Goto index 2
        act(() => result.current.gotoIndex(2))

        // Assert has no prev or next slides
        expect(result.current.hasPrevSlide).toEqual(true)
        expect(result.current.hasNextSlide).toEqual(false)

        // Reset slieds
        act(() => result.current.resetSlides())
        // Assert slides to be reset to initial slides
        expect(result.current.slides).toEqual([{ boo: '1' }])
    })

    test('Render with initial slides as object', () => {
        const { result } = renderHook(() =>
            useStyledSlider({
                initialSlides: { boo: '1' },
            })
        )
        expect(result.current.slides).toEqual([{ boo: '1' }])
    })
})
