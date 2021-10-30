import useDimensions, { useDimensions as namedHook, UseDimensionsProps } from './useDimensions'
import { renderHook } from '@testing-library/react-hooks'

test('exports a function (default)', () => {
    expect(useDimensions).toBeInstanceOf(Function)
})
test('exports a function (named)', () => {
    expect(namedHook).toBeInstanceOf(Function)
})
test('hooks identity are the same', () => {
    expect(useDimensions).toBe(namedHook)
})
test('is a named function', () => {
    // aids stack trace debugging.
    expect(useDimensions.name).toBe('useDimensions')
})
describe('useDimensions', () => {
    test('Basic slider functionality', () => {
        const { result, rerender } = renderHook((props: UseDimensionsProps) => useDimensions(props))
        rerender()

        // assert initial slides
        expect(result.current.dimensions.width).toEqual(1920)
    })
})
