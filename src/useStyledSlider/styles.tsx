import styled, { css } from 'styled-components'
import { animated } from 'react-spring'

const SlideMaxWidths = (slidesPerView: number | { [minWidth: number]: number }) => {
    let styles = ''
    if (typeof slidesPerView === 'object') {
        for (const minWidth in slidesPerView) {
            if (slidesPerView.hasOwnProperty(minWidth)) {
                const value = slidesPerView[minWidth]
                styles += `
                        @media(min-width: ${minWidth}px) {
                            max-width: ${value ? `${100 / value}%` : `0`};
                        }
                    `
            }
        }
    } else {
        styles += `max-width: ${slidesPerView ? `${100 / slidesPerView}%` : `0`};`
    }

    return css`
        ${styles}
    `
}

export const Slide = styled(animated.div) <{
    gutter: number,
    slidesPerView: number | { [minWidth: number]: number }
    [key: string]: any // Hack for now...
}>`
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    flex-shrink: 0;
    padding: ${p => (p.gutter ? `0 ${p.gutter / 2}px` : `0`)};
    ${({ slidesPerView }) => (slidesPerView ? SlideMaxWidths(slidesPerView) : '')};
`

export const Wrapper = styled.div<{ gutter: number, transition?: string, style: { transform: string } }> `
    box-sizing: border-box;
    display: flex;
    margin: ${p => (p.gutter ? `0 ${p.gutter / -2}px` : `0`)};
    transition: ${p => (p.transition ? p.transition : `0.35s ease-in-out`)};
`

export const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    user-select: none;
    position: relative;
`
