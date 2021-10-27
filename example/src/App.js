import * as React from 'react'
import styled from 'styled-components'

import { useStyledSlider, Container, Item } from 'use-styled-slider'

const itemsFromApi = [
    {
        name: 'Someone',
        job: 'Important',
        quote: "It's a pretty cool slider",
    },
]

const initialQuote = {
    name: 'Someone',
    job: 'Important',
    quote: "It's a pretty cool slider",
}

const getQuotes = () => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(itemsFromApi)
        }, 1000),
    )
}

const App = () => {
    React.useEffect(() => {
        getQuotes().then((quotes) => {
            addItems(quotes)
        })
    }, [])
    const { items, addItem, removeItem, addItems } = useStyledSlider({
        initialItems: initialQuote,
        itemsPerSlide: 1,
        gap: 15,
    })
    return (
        <Wrapper>
            {/* <button>Next</button>
      <button>Prev</button>
      <Container>
        {items.map((item) => {
          return (
            <Item>
              <div>
                <img src="//placehold.it/30" alt="Placeholder" />
              </div>
            </Item>
          );
        })}
      </Container>
      <button onClick={addItem}>Add new item </button> */}
        </Wrapper>
    )
}
export default App

const Wrapper = styled.div`
    background: lavenderBlush;
    display: flex;
    align-items: center;
    justify-content: center;
`
