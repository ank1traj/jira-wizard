import React from "react"
import { Link } from "gatsby"
import { Div, Text, Row, Col, Container, Anchor, Icon } from "atomize"

const footerLinks = {
  docs: [
    {
      name: "Installation",
      link: "#",
    },
    {
      name: "Theme Setup",
      link: "#",
    },
    {
      name: "Grid",
      link: "#",
    },
    {
      name: "Functions",
      link: "#",
    },
  ],
  JiraWizard: [
    {
      name: "Features",
      link: "#",
    },
    {
      name: "Design",
      anchor: true,
      link: "#",
    },
    {
      name: "Development",
      link: "#",
    },
  ],
  resources: [
    {
      name: "Github",
      anchor: true,
      link: "#",
    },
  ],
  about: [
    {
      name: "Introduction",
      link: "#",
    },
    {
      name: "Contribute",
      link: "#",
    },
  ],
  extras: [
    {
      name: "Blog",
      anchor: true,
      link:
        "#",
    },
    {
      name: "Need Help?",
      anchor: true,
      link: "mailto:ankit.raj@hackereath.com",
    },
    {
      name: "Give Feedback",
      anchor: true,
      link: "mailto:ankit.raj@hackereath.com",
    },
  ],
}

const mediaLinks = [
  {
    icon: "Github",
    link: "https://github.com/ank1traj",
  },
  {
    icon: "Linkedin",
    link: "https://www.linkedin.com/in/ank1traj/",
  },
]

const Footer = () => {
  return (
    <Div
      tag="footer"
      p={{ t: { xs: "12rem", md: "8rem" }, b: { xs: "4rem", md: "5rem" } }}
      pos="relative"
    >
      <Container>
        <Div m={{ b: "8rem" }} d={{ xs: "none", md: "block" }}>
          <Row>
            {Object.keys(footerLinks).map((key, index) => {
              return (
                <Col
                  key={index}
                  size={{ xs: 6, md: 2 }}
                  offset={{ xs: 0, md: index === 0 && 1 }}
                >
                  <Div
                    p={{ l: { md: "2.5rem" }, b: { xs: "1.5rem", md: "0" } }}
                    textColor="medium"
                  >
                    <Text
                      m={{ b: "1rem" }}
                      textColor="black"
                      textTransform="capitalize"
                      textWeight="500"
                    >
                      {key}
                    </Text>
                    {footerLinks[key].map((link, index) => {
                      if (link.anchor) {
                        return (
                          <Anchor
                            key={`anchor-${index}`}
                            m={{ b: "0.5rem" }}
                            textColor="medium"
                            hoverTextColor="info800"
                            d="block"
                            href={link.link}
                            target="_blank"
                            textWeight="400"
                          >
                            {link.name}
                          </Anchor>
                        )
                      } else {
                        return (
                          <Link key={index} to={link.link}>
                            <Text
                              m={{ b: "0.5rem" }}
                              textColor="medium"
                              hoverTextColor="info800"
                            >
                              {link.name}
                            </Text>
                          </Link>
                        )
                      }
                    })}
                  </Div>
                </Col>
              )
            })}
          </Row>
        </Div>

        <Div d="flex" align="center" justify="center" flexDir="column">
          <Text
            tag="h2"
            textWeight="400"
            textSize="body"
            textAlign="center"
            m={{ b: "1rem" }}
          >
            Designed & Developed by Ankit Raj
          </Text>
          <Div d="flex" align="center" justify="center">
            {mediaLinks.map((link, index) => (
              <Anchor key={index} href={link.link} target="_blank">
                <Icon
                  name={link.icon}
                  size="20px"
                  hoverColor="info800"
                  m={{ r: index !== mediaLinks.length - 1 && "1rem" }}
                  cursor="pointer"
                />
              </Anchor>
            ))}
          </Div>
        </Div>
      </Container>
    </Div>
  )
}

export default Footer
