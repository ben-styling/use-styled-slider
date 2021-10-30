import * as React from 'react'
import styled from 'styled-components'

import { useStyledSlider, Container, Slide, Wrapper } from 'use-styled-slider'

const quotesFromApi: Quote[] = [
    {
        name: 'Someone from API',
        job: 'Important',
        quote: "It's a pretty cool slider",
    },
]
type Quote = {
    name: string
    job: string
    quote: string
}

const initialQuote: Quote[] = [
    {
        name: 'Someone 1',
        job: 'Important',
        quote: "It's a pretty cool slider",
    },
    {
        name: 'Someone 2',
        job: 'Important',
        quote: "It's a pretty cool slider",
    },
    {
        name: 'Someone 3',
        job: 'Important',
        quote: "It's a pretty cool slider",
    },
    {
        name: 'Someone 4',
        job: 'Important',
        quote: "It's a pretty cool slider",
    },
    {
        name: 'Someone 5',
        job: 'Important',
        quote: "It's a pretty cool slider",
    },
]


const getQuotes = () => {
    return new Promise<Quote[]>((resolve) =>
        setTimeout(() => {
            resolve(quotesFromApi)
        }, 1000),
    )
}

const App = () => {
    const { next, prev, slides, addSlides, getWrapperProps, hasNextSlide, hasPrevSlide } = useStyledSlider<Quote>({
        initialSlides: initialQuote,
        slidesPerView: 1,
        gutter: 15,
    })
    React.useEffect(() => {
        getQuotes().then((quotes) => {
            addSlides(quotes)
        })
    }, [])
    return (
        <StyledWrapper>
            <button onClick={() => prev()} disabled={!hasPrevSlide}>Prev</button>
            <button onClick={() => next()} disabled={!hasNextSlide}>Next</button>
            <Container>
                <Wrapper {...getWrapperProps()}>
                    {slides.map((slide, index) => {
                        return (
                            <Slide key={index} gutter={0} slidesPerView={1}>
                                <blockquote>
                                    <q>{slide.quote} </q>
                                    <cite>{slide.name} — {slide.job} </cite>
                                </blockquote>
                            </Slide>
                        )
                    })}
                </Wrapper>
            </Container>
        </StyledWrapper>
    )
}

export default App

const StyledWrapper = styled.div`
    background: lavenderBlush;
    display: flex;
    align-slides: center;
    justify-content: center;
`
