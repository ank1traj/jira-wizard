import React from "react"
import { Div, Text, Row, Col, Container, Image } from "atomize"

import logoSketch from "../../images/logo-sketch.svg"
import logoReact from "../../images/logo-react.svg"

const DesignDevelopment = () => {
  return (
    <Div tag="section">
      <Container>
        <Div p={{ t: "7.5rem", b: "12rem" }}>
          <Div d="flex" flexDir="column" align="center">
            <Text
              tag="h2"
              fontFamily="secondary"
              textSize="display1"
              textAlign="center"
              textWeight="500"
              maxW="42rem"
              m={{ b: "4rem" }}
            >
              Take your productivity to the next level with our upcoming
              features for Jira Wizard
            </Text>
          </Div>
          <Div>
            <Row>
              <Col size={{ xs: 12, md: 6, lg: 4 }} offset={{ xs: 0, lg: 2 }}>
                <Div
                  shadow="4"
                  border="1px solid"
                  borderColor="gray200"
                  rounded="xl"
                  p="2rem"
                  m={{ b: { xs: "2rem", md: "0" } }}
                >
                  <Image
                    src={logoSketch}
                    h="2.5rem"
                    w="auto"
                    m={{ b: "1rem" }}
                  />
                  <Text m={{ b: "0.5rem" }} textSize="heading" textWeight="500">
                    Schedule Issue Creation
                  </Text>

                  <Text
                    textSize="subheader"
                    textColor="medium"
                    p={{ r: "1rem" }}
                    m={{ b: "1.5rem" }}
                  >
                    Schedule bulk issue creation for future dates and times.
                  </Text>
                </Div>
              </Col>
              <Col size={{ xs: 12, md: 6, lg: 4 }} pos="relative">
                <Div
                  shadow="4"
                  border="1px solid"
                  borderColor="gray200"
                  bg="white"
                  rounded="xl"
                  p="2rem"
                >
                  <Image
                    src={logoReact}
                    h="2.5rem"
                    w="auto"
                    m={{ b: "1rem" }}
                  />
                  <Text m={{ b: "0.5rem" }} textSize="heading" textWeight="500">
                    Sub-Task Creation
                  </Text>
                  <Text
                    textSize="subheader"
                    textColor="medium"
                    p={{ r: "1rem" }}
                    m={{ b: "1.5rem" }}
                  >
                    Create sub-tasks for each issue created.
                  </Text>
                </Div>
              </Col>
            </Row>
          </Div>
        </Div>
      </Container>
    </Div>
  )
}

export default DesignDevelopment
