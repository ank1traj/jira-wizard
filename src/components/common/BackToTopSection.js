import React from "react"
import { Div, Container, Button } from "atomize"

export default function BackToTopSection() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Div p={{ y: "3.5rem" }}>
      <Container>
        <Div d="flex" justify="center">
          <Button
            rounded="circle"
            shadow="1"
            hoverShadow="4"
            w={{ xs: "8rem", md: "12rem" }}
            h="3rem"
            p={{ x: { xs: "1rem", md: "3.5rem" } }}
            onClick={handleClick}
          >
            Back To Top
          </Button>
        </Div>
      </Container>
    </Div>
  )
}
