import React from "react"
import { Link } from "gatsby"
import { Div, Text, Row, Col, Container, Image, Tag } from "atomize"

import intro1 from "../../images/icons/intro1.svg"
import intro2 from "../../images/icons/intro2.svg"
import intro3 from "../../images/icons/intro3.svg"
import intro4 from "../../images/icons/intro4.svg"

const list = [
  {
    icon: intro1,
    heading: "Bulk Issues Creation",
    subheading:
      "Easily create multiple Jira issues from a xlsx/json file with just a few clicks with intuitive interface.",
    link: "#",
  },

  {
    icon: intro2,
    heading: "Custom Field Mapping",
    subheading:
      "Map fields from xlsx/json file to Jira issue fields for seamless data transfer.",
    link: "#",
  },

  {
    icon: intro3,
    heading: "Automated Issue Creation",
    subheading:
      "Configure Jira Wizard to automatically create issues from xlsx/json files.",
    link: "#",
  },

  {
    icon: intro4,
    heading: "Error Handling",
    subheading:
      "Receive detailed error reports to quickly resolve any issues during the bulk issue creation process.",
    link: "#",
  },
]

class Introducing extends React.Component {
  render() {
    return (
      <Div tag="section" id="features" p={{ t: "8rem" }}>
        <Container>
          <Tag
            bg="black"
            textColor="white"
            h="2rem"
            p={{ x: "1rem" }}
            rounded="circle"
            m={{ b: "2rem" }}
          >
            Key features
          </Tag>
          <Text
            textSize="display1"
            textWeight="500"
            fontFamily="secondary"
            m={{ b: "1rem" }}
          >
            Why use Jira Wizard?
          </Text>
          <Text
            textSize="subheader"
            textColor="medium"
            maxW="30rem"
            m={{ b: "3rem" }}
          >
            Jira Wizard empowers you to create and manage issues in a style that
            suits your workflow, with fully responsive interfaces for seamless
            project management.
          </Text>
          <Div
            p={{ b: "6rem" }}
            border={{ b: "1px solid" }}
            borderColor="gray300"
          >
            <Row>
              {list.map((item, index) => (
                <Col key={item.id || index} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Div m={{ b: { xs: "1rem", lg: "0" } }}>
                    <Div
                      border="1px solid"
                      borderColor="gray200"
                      h="100%"
                      d="flex"
                      flexDir="column"
                      p="2rem"
                      shadow="3"
                      rounded="xl"
                    >
                      <Div flexGrow="1">
                        <Image
                          src={item.icon}
                          m={{ t: "1rem", b: "2rem" }}
                          w="auto"
                          h="2rem"
                        />
                        <Text
                          textSize="title"
                          textWeight="500"
                          m={{ b: "1rem" }}
                        >
                          {item.heading}
                        </Text>
                        <Text
                          textSize="subheader"
                          textColor="medium"
                          m={{ b: "2rem" }}
                        >
                          {item.subheading}
                        </Text>
                      </Div>
                      <Link to={item.link}>
                        <Text
                          textColor="info700"
                          hoverTextColor="info800"
                          textWeight="500"
                        ></Text>
                      </Link>
                    </Div>
                  </Div>
                </Col>
              ))}
            </Row>
          </Div>
        </Container>
      </Div>
    )
  }
}

export default Introducing
