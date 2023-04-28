import React, { useState } from "react"
import axios from "axios"
import { Div, Text, Row, Col, Container, Image, Icon, Button } from "atomize"

import * as XLSX from "xlsx"
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
    heading: "XLSX",
    subheading: "Upload your XLSX files and get started.",
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
    subheading: "Customise your XLSX file as per your needs.",
  },
  {
    icon: icon1,
    heading: "Ligthning Fast",
    subheading: "Create Issues/Test Cases in a jiffy.",
  },
]

export default function Features() {
  const [file, setFile] = useState(null)
  const [isValid, setIsValid] = useState(false) // added state variable
  const [isSubmitting, setIsSubmitting] = useState(false) // new state variable
  const [selectedFileName, setSelectedFileName] = useState("hello")
  const email = "navaneethakrishnan@hackerearth.com"
  const token = "ZvCGnS4bjsMlhOgZ7xCM1D7D"

  const handleFileUpload = event => {
    const selectedFile = event.target.files[0]
    if (!selectedFile) {
      // handle error when user presses "Esc" key or doesn't select a file
      setIsValid(false)
      return
    }
    if (
      selectedFile.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      toast.error("Error: Invalid file format")
      setIsValid(false)
      return
    }
    if (selectedFile.name === selectedFileName) {
      toast.error("Error: Same file uploaded")
      setIsValid(true)
      return
    }

    toast.promise(
      new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          try {
            const workbook = XLSX.read(fileReader.result, { type: "binary" })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const headers = Object.keys(worksheet)
              .filter(key => key[1] === "1")
              .map(key => worksheet[key].v)

            const data = []
            const range = XLSX.utils.decode_range(worksheet["!ref"])
            for (let i = range.s.r + 1; i <= range.e.r; i++) {
              const row = {}
              for (let j = range.s.c; j <= range.e.c; j++) {
                const cellAddress = XLSX.utils.encode_cell({ r: i, c: j })
                const cellValue = worksheet[cellAddress]
                  ? worksheet[cellAddress].v
                  : null
                const columnName = headers[j - range.s.c]
                row[columnName] = cellValue
              }
              data.push(row)
            }

            const requiredFields = [
              "summary",
              "description",
              "project_key",
              "issuetype_name",
              "assignee_id",
              "priority",
            ]
            const missingFields = requiredFields.filter(
              field => !headers.includes(field)
            )
            if (missingFields.length === 0) {
              setSelectedFileName(selectedFile.name)
              setFile(data)
              setIsValid(true)
              resolve("Success: File uploaded successfully")
            } else {
              reject(`Error: Fields missing: ${missingFields.join(", ")}`)
              setIsValid(false)
            }
          } catch (error) {
            reject("Error: Invalid file format")
            setIsValid(false)
          }
        }
        fileReader.readAsBinaryString(selectedFile)
      }),
      {
        loading: "Loading file...",
        success: message => {
          return message
        },
        error: message => {
          return message
        },
      }
    )
  }

  const createIssue = async (data, email, token) => {
    console.log(`Creating issue for ${data.summary}`)

    const url = "https://hackerearth.atlassian.net/rest/api/3/issue"
    const headers = {
      Authorization: `Basic ${Buffer.from(`${email}:${token}`).toString(
        "base64"
      )}`,
      "Content-Type": "application/json",
    }
    const requestBody = {
      fields: {
        project: { key: data.project_key },
        summary: data.summary,
        description: data.description,
        issuetype: { name: data.issuetype_name },
        assignee: { id: data.assignee_id },
        priority: { name: data.priority },
      },
    }
    try {
      const response = await axios.post(url, requestBody, {
        headers: headers,
      })
      return { success: true, data: response.data }
    } catch (error) {
      if (error.response) {
        return { success: false, message: error.message }
      } else if (error.request) {
        return { success: false, message: "No response received from server." }
      } else {
        return { success: false, message: error.message }
      }
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true) // set isSubmitting to true

    try {
      // Call the createIssue function for each row of data and wait for all promises to resolve
      const promises = file.map(rowData => createIssue(rowData, email, token))
      const results = await Promise.all(promises)

      // Check for any errors and handle them appropriately
      const errors = results.filter(result => !result.success)
      if (errors.length > 0) {
        console.error(errors)
        return
      }

      // Log the success messages for each issue
      const successMessages = results.map(result => result.data.key)
      toast.success(`Issues created: ${successMessages.join(", ")}`)

      setFile(null)
      setIsValid(false)
    } catch (error) {
      toast.error(error)
    } finally {
      setFile(null)
      setIsSubmitting(false)
      setIsValid(false)
    }
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
                {file ? (
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
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
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
                {/* <Image
                    src={features}
                    pos="absolute"
                    top="0"
                    left="0"
                    w="100%"
                  /> */}
              </Div>
            </Col>
            <Col size={{ xs: 12, md: 6, lg: 7 }} offset={{ xs: 0, md: 1 }}>
              <Div p={{ l: { lg: "1rem" } }}>
                {/* <Tag
                    bg="black"
                    textColor="white"
                    h="2rem"
                    p={{ x: "1rem" }}
                    rounded="circle"
                    m={{ b: "2rem" }}
                  >
                    Key features
                  </Tag> */}

                <Text
                  tag="h2"
                  maxW="32rem"
                  fontFamily="secondary"
                  textSize="display2"
                  textWeight="500"
                  textAlign="left"
                  m={{ b: "3rem" }}
                >
                  Jira Wizard features a sleek and consistent{" "}
                  <span style={{ color: "#06d7ff" }}> user interface</span>.
                </Text>
                <Div>
                  <Row>
                    {featuresList.map((feature, index) => (
                      <Col size={{ xs: 6, lg: 4 }}>
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