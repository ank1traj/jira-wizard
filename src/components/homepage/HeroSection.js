import React, { useState, useEffect } from "react"

import { Modal, Button, Container, Text, Div, Icon, Anchor } from "atomize"

import FollowCard from "./uicomponents/FollowCard"
import UserEdit from "./uicomponents/UserEdit"
import Buttons from "./uicomponents/Buttons"
import CardComponent from "./uicomponents/CardComponent"
import LoginForm from "./uicomponents/LoginForm"

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        // Close the modal when the ESC key is pressed
        setIsModalOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      // Remove the event listener when the component is unmounted
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const scroll = () => {
    const section = document.querySelector("#file-upload")
    section.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <>
      <Div tag="section" p={{ t: { xs: "6rem", md: "10rem" } }}>
        <Container d="flex" flexDir="column" align="center">
          <Text
            tag="h1"
            textWeight="500"
            textAlign="center"
            textSize="display3"
            fontFamily="secondary"
            m={{ b: "1rem" }}
          >
            Effortlessly create bulk issues.
          </Text>
          <Text
            tag="h2"
            textWeight="400"
            maxW="36rem"
            textSize="subheader"
            textAlign="center"
            fontFamily="secondary"
            textColor="medium"
            m={{ b: "2.5rem" }}
          >
            Streamline issue creation with bulk upload, saving you time and
            effort!
          </Text>

          <Div
            d="flex"
            w="100%"
            justify="center"
            flexDir={{ xs: "column", sm: "row" }}
          >
            <Anchor onClick={scroll}>
              <Button
                h="3rem"
                w={{ xs: "100%", sm: "11rem" }}
                bg="info700"
                hoverBg="info600"
                rounded="lg"
                m={{ r: "1rem", b: { xs: "1rem", sm: "0" } }}
              >
                Get Started Now
              </Button>
            </Anchor>

            <Button
              h="3rem"
              w={{ xs: "100%", sm: "11rem" }}
              bg="transparent"
              hoverBg="gray200"
              border="1px solid"
              borderColor="gray400"
              hoverBorderColor="gray600"
              rounded="lg"
              p={{ l: "0.5rem", r: "1rem" }}
              textColor="medium"
              prefix={
                <Icon
                  name="Play"
                  size="18px"
                  m={{ r: "0.5rem" }}
                  color="black400"
                />
              }
              onClick={() => setIsModalOpen(true)}
            >
              Watch Video
            </Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              m={{ y: "5rem", x: { xs: "1rem", lg: "auto" } }}
              maxW="60rem" // Set the maximum width of the Modal to 60rem
              maxH="80vh" // Set the maximum height of the Modal to 80vh
            >
              <iframe
                width="100%"
                height="500" // Set the height of the iframe to 500px
                src="https://www.youtube.com/embed/EkDnSyit4mw"
                title="Demo Video"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </Modal>
          </Div>
        </Container>
      </Div>
      <Div
        tag="section"
        w="100vw"
        p={{ t: { xs: "3rem", md: "6rem" } }}
        overflow="hidden"
      >
        <Container>
          <Div
            d="flex"
            justify="center"
            p={{ b: "10.5rem" }}
            border={{ b: "1px solid" }}
            borderColor="gray300"
          >
            <Div
              minW={{ xs: "100%", md: "44rem", lg: "59rem" }}
              d="flex"
              align="center"
              flexDir="column"
              h={{ xs: "auto", md: "21rem", lg: "20rem" }}
              pos="relative"
            >
              {/* Button Components */}
              <Buttons />

              {/* Follow Component */}
              <FollowCard />

              {/* Card Component */}
              <CardComponent />

              {/* Notification Component */}
              {/* <Notification /> */}

              {/* Form Component */}
              <LoginForm />

              {/* User Component */}
              <UserEdit />
            </Div>
          </Div>
        </Container>
      </Div>
    </>
  )
}
