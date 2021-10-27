import useStyledSlider, { useStyledSlider as namedHook } from '.'
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
describe('basic functionality', () => {
    test('', () => {
        const { result } = renderHook(() =>
            useStyledSlider({
                initialItems: [{ boo: '1' }],
            })
        )
    
        // assert initial items
        expect(result.current.items).toEqual([{ boo: '1' }])
    
        // Add new slide
        act(() => result.current.addItem({ boo: '2' }))
    
        // Asset new items
        expect(result.current.items).toHaveLength(2)
    
        // Add new slides
        act(() => result.current.addItems([{ boo: '3' }, { boo: '4' }]))
    
        // Asset new items
        expect(result.current.items).toEqual([{ boo: '1' }, { boo: '2' }, { boo: '3' }, { boo: '4' }])
    
        // Asset current index
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
    })

})
