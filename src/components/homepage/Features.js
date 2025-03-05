import React, { useEffect, useState } from "react"
import CryptoJS from "crypto-js"
import axios from "axios"
import Cookies from "js-cookie"

import { Div, Text, Row, Col, Container, Image, Icon, Button } from "atomize"

import toast, { Toaster } from "react-hot-toast"

import react from "../../images/react.svg"

import icon1 from "../../images/feature-icons/1.svg"
import icon2 from "../../images/feature-icons/2.svg"
import icon3 from "../../images/feature-icons/3.svg"
import icon4 from "../../images/feature-icons/4.svg"
import icon5 from "../../images/feature-icons/5.svg"
import icon6 from "../../images/feature-icons/6.svg"

const featuresList = [
  {
    icon: icon5,
    heading: "Rest API",
    subheading: "Built on top of a robust Rest API.",
  },
  {
    icon: icon2,
    heading: "XLSX/JSON",
    subheading: "Upload your xlsx/json files and get started.",
  },
  {
    icon: icon4,
    heading: "Jira",
    subheading: "No need to go to Jira, we got you covered.",
  },

  {
    icon: icon6,
    heading: "Test Cases",
    subheading: "Create Test Cases and add them to your Test Plan.",
  },

  {
    icon: icon3,
    heading: "Customisable",
    subheading: "Customise your xlsx/json file as per your needs.",
  },
  {
    icon: icon1,
    heading: "Ligthning Fast",
    subheading: "Create Issues/Test Cases in a jiffy.",
  },
]

export default function Features() {
  const [issues, setIssues] = useState([])
  const [isValid, setIsValid] = useState(false) // added state variable
  const [selectedFileName, setSelectedFileName] = useState(null)

  const [domain, setDomain] = useState("")

  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      setDomain(Cookies.get("domain"))
    }
  }, [])

  const handleFileUpload = event => {
    const selectedFile = event.target.files[0]
    if (!selectedFile) {
      // handle error when user presses "Esc" key or doesn't select a file
      setIsValid(false)
      return
    }
    if (
      selectedFile.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      selectedFile.type !== "application/json"
    ) {
      toast.error("Invalid file format. Please upload xlsx or json file.", {
        duration: 6000,
      })
      setIsValid(false)
      return
    }
    if (selectedFile.name === selectedFileName) {
      toast.error(
        "Attention! A file with the same data has already been uploaded. \nCreating a new issue with the same data may result in duplicates.",
        {
          iconTheme: {
            primary: "#0074D9",
            secondary: "#E6F9FF",
          },
          duration: 6000,
        }
      )

      setIsValid(true)
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    toast.promise(
      fetch("https://jira-backend.vercel.app/api/upload", {
        method: "POST",
        body: formData,
      })
        .then(response => {
          if (response.status === 200) {
            return response.text()
          } else {
            return response.json().then(error => {
              throw new Error(error.message)
            })
          }
        })
        .then(data => {
          const issue = JSON.parse(data).data
          setSelectedFileName(selectedFile.name)
          setIsValid(true)
          setIssues(issue)
          return "File uploaded successfully!"
        })
        .catch(error => {
          setIsValid(false)
          throw new Error(`Error: ${error.message}`)
        }),
      {
        loading: "Loading file...",
        success: message => {
          return message
        },
        error: error => {
          return error.message
        },
        duration: 7000,
      }
    )
  }

  const handleSubmit = async event => {
    // Check if user is authenticated
    if (localStorage.getItem("authenticated") === "false") {
      toast.error("Please log in to submit issues.")
      return
    }
    // Check if a file has been uploaded
    if (!selectedFileName) {
      toast.error("Please upload a file.")
      return
    }

    const promises = issues.map(async issue => {
      const issueData = {
        summary: issue.summary,
        description: issue.description,
        project_key: issue.project_key,
        issuetype_name: issue.issuetype_name,
        assignee_id: issue.assignee_id,
        priority: issue.priority,
        components: issue.components
          ? issue.components.split(", ").map(component => ({
              name: component,
            }))
          : [],
      }
      const plaintext = Cookies.get("jiraToken")
      const secretKey = process.env.GATSBY_SECRET_KEY
      const jiraToken = CryptoJS.AES.encrypt(plaintext, secretKey).toString()
      const payload = {
        domain: Cookies.get("domain"),
        email: Cookies.get("email"),
        jiraToken: jiraToken,
        fields: {
          project: {
            key: issueData.project_key,
          },
          summary: issueData.summary,
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: issueData.description,
                    type: "text",
                  },
                ],
              },
            ],
          },
          issuetype: {
            name: issueData.issuetype_name,
          },
          assignee: {
            id: issueData.assignee_id,
          },
          priority: {
            name: issueData.priority,
          },
          components: issueData.components,
        },
      }
      try {
        const response = await axios.post(
          "https://jira-backend.vercel.app/api/issue",
          payload
        )
        const successMessage = `${response.data}`
        return Promise.resolve({
          status: "fulfilled",
          value: successMessage,
        })
      } catch (error) {
        return Promise.reject({
          status: "rejected",
          reason: error,
          reasonMessage: error.response.data.message,
        })
      }
    })

    setSelectedFileName(null)

    toast.promise(
      Promise.allSettled(promises).then(results => {
        const rejectedPromises = results.filter(
          result => result.status === "rejected"
        )
        if (rejectedPromises.length > 0) {
          const errorMessages = rejectedPromises[0].reason.reasonMessage.split(
            ":"
          )[1]
          const errorMessage = errorMessages.slice(1, errorMessages.length - 2)
          throw new Error(
            `Issues were not created successfully. \n Error: ${errorMessage} \nPlease check your file and try again.`
          )
        }
        const successMessages = results
          .filter(result => result.status === "fulfilled")
          .map(result => result.value)

        const values = successMessages.map(message => message.value)

        values.forEach(message => {
          // Extract the issue key from the response string
          const start = message.indexOf('"') + 1
          const end = message.indexOf('"', start)
          const issueKey = message.slice(start, end)
          // Extract the project key from the issue key
          const projectKey = issueKey.split("-")[0]
          const url = `https://${domain}.atlassian.net/jira/software/c/projects/${projectKey}/issues/${issueKey}`
          toast.success(
            <span>
              Issue created: {issueKey}{" "}
              <button onClick={() => window.open(url, "_blank")}>
                Go to issue
              </button>
            </span>,
            {
              duration: 12000,
            }
          )
        })

        return values
      }),
      {
        loading: "Creating issues...",
        success: `Issues created successfully!`,
        error: error => {
          return error.message
        },
        duration: 7000,
      }
    )
  }

  return (
    <Div tag="section" id="file-upload">
      <Toaster />
      <Container>
        <Div
          p={{ t: "9.5rem", b: "5rem" }}
          border={{ b: "1px solid" }}
          borderColor="gray300"
        >
          <Row>
            <Col
              size={{ xs: 12, md: 5, lg: 4 }}
              d={{ xs: "none", md: "block" }}
            >
              <Div pos="relative" w="100%" p={{ b: "100%" }} m={{ t: "0rem" }}>
                <Div
                  pos="absolute"
                  top="1rem"
                  left="1rem"
                  right="0"
                  bottom="0"
                  rounded="circle"
                  border="2px solid"
                  borderColor="black"
                  opacity="0.1"
                ></Div>
                <Div
                  pos="absolute"
                  top="3rem"
                  left="3rem"
                  right="2rem"
                  bottom="2rem"
                  rounded="circle"
                  border="2px solid"
                  borderColor="black"
                  opacity="0.2"
                ></Div>
                <Div
                  pos="absolute"
                  top="5rem"
                  left="5rem"
                  right="4rem"
                  bottom="4rem"
                  rounded="circle"
                  border="2px solid"
                  borderColor="black"
                  opacity="0.3"
                ></Div>
                <Div
                  pos="absolute"
                  top="7rem"
                  left="7rem"
                  right="6rem"
                  bottom="6rem"
                  rounded="circle"
                  border="2px solid"
                  borderColor="black"
                  opacity="0.4"
                ></Div>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  value=""
                  style={{ display: "none" }}
                />
                <Button
                  pos="absolute"
                  right="0"
                  bottom="4rem"
                  w="10rem"
                  rounded="lg"
                  bg="info700"
                  hoverBg="info600"
                  shadow="3"
                  hoverShadow="4"
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                >
                  Upload File
                </Button>

                {/* Repositioned template download buttons with different colors */}
                {/* Template download buttons with correct paths */}
                                <Button
                                  pos="absolute"
                                  left="2rem"
                                  top="11rem"
                                  w="10rem"
                                  rounded="lg"
                                  bg="warning700"
                                  hoverBg="warning600"
                                  shadow="3"
                                  hoverShadow="4"
                                  marginTop="-7rem"
                                  onClick={() => window.open("/templates/jira_template.xlsx", "_blank")}
                                >
                                  XLSX Template
                                </Button>
                                <Button
                                  pos="absolute"
                                  left="5rem"
                                  bottom="3rem"
                                  w="10rem"
                                  rounded="lg"
                                  bg="danger700"
                                  hoverBg="danger600"
                                  shadow="3"
                                  hoverShadow="4"
                                  marginLeft="10rem"
                                  onClick={() => window.open("/templates/jira_template.json", "_blank")}
                                >
                                  JSON Template
                                </Button>

                {isValid && selectedFileName ? (
                  <Button
                    pos="absolute"
                    right="-5rem"
                    bottom="1rem"
                    w="10rem"
                    rounded="lg"
                    hoverBg="info600"
                    shadow="3"
                    hoverShadow="4"
                    onClick={handleSubmit}
                    onSubmit={handleSubmit}
                    disabled={!isValid}
                  >
                    Submit
                  </Button>
                ) : null}
                <Button
                  pos="absolute"
                  left="2rem"
                  top="7.5rem"
                  w="2.5rem"
                  rounded="circle"
                  bg="warning700"
                  hoverBg="warning600"
                  shadow="3"
                  hoverShadow="4"
                >
                  <Icon name="Plus" color="white" size="18px" />
                </Button>
                <Icon
                  name="CBChecked"
                  pos="absolute"
                  left="5rem"
                  bottom="1rem"
                  color="danger700"
                />
                <Div
                  h="1.5rem"
                  w="2.5rem"
                  p="0.3rem"
                  pos="absolute"
                  top="3rem"
                  right="5rem"
                  rounded="circle"
                  bg="success700"
                  d="flex"
                  align="center"
                  justify="flex-end"
                  shadow="4"
                >
                  <Div h="0.9rem" w="0.9rem" rounded="circle" bg="white"></Div>
                </Div>
                <Div
                  pos="absolute"
                  top="7rem"
                  left="7rem"
                  right="6rem"
                  bottom="6rem"
                  rounded="circle"
                  d="flex"
                  align="center"
                  justify="center"
                >
                  <Image src={react} w="4rem" />
                </Div>
              </Div>
            </Col>
            <Col size={{ xs: 12, md: 6, lg: 7 }} offset={{ xs: 0, md: 1 }}>
              <Div p={{ l: { lg: "1rem" } }}>
                <Text
                  tag="h2"
                  maxW="32rem"
                  fontFamily="secondary"
                  textSize="display2"
                  textWeight="500"
                  textAlign="left"
                  m={{ b: "3rem" }}
                >
                  Jira Wizard streamlines the process of setting up{" "}
                  <span style={{ color: "#06d7ff" }}> Jira Issues</span>
                </Text>
                <Div>
                  <Row>
                    {featuresList.map((feature, index) => (
                      <Col key={index} size={{ xs: 6, lg: 4 }}>
                        <Div m={{ b: "3rem" }} maxW="11rem">
                          <Image
                            src={feature.icon}
                            w="2.5rem"
                            maxW="2.5rem"
                            m={{
                              b: "0.25rem",
                            }}
                          />

                          <Text
                            tag="h3"
                            textSize="subheader"
                            textWeight="500"
                            m={{ b: "0.25rem" }}
                          >
                            {feature.heading}
                          </Text>

                          <Text textSize="body" textColor="medium">
                            {feature.subheading}
                          </Text>
                        </Div>
                      </Col>
                    ))}
                  </Row>
                </Div>
              </Div>
            </Col>
          </Row>
        </Div>
      </Container>
    </Div>
  )
}
