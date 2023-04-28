import React, { useState } from "react"
import axios from "axios"
import {
  Div,
  Text,
  Row,
  Col,
  Container,
  Image,
  Icon,
  Button,
  Tag,
} from "atomize"

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
    heading: "Atomic",
    subheading: "Based on Atomic Design Methodology.",
  },
  {
    icon: icon2,
    heading: "Theme Setup",
    subheading: "Auto updating colors and Styleguide.",
  },

  {
    icon: icon4,
    heading: "Components",
    subheading: "Ever-increasing list of components.",
  },

  {
    icon: icon6,
    heading: "Responsive",
    subheading: "Build fully responsive structures easily.",
  },

  {
    icon: icon3,
    heading: "Customisation",
    subheading: "Multiple customisations to suit your style.",
  },
  {
    icon: icon1,
    heading: "Icon System",
    subheading: "An inbuilt Icon system for faster development.",
  },
]

export default function Features() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [isValid, setIsValid] = useState(false) // added state variable
  const JIRA_API_BASE_URL = "https://hackerearth.atlassian.net/rest/api/3"

  const handleFileUpload = event => {
    const selectedFile = event.target.files[0]
    if (
      selectedFile.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      toast.error("Error: Invalid file format")
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      try {
        const workbook = XLSX.read(fileReader.result, { type: "binary" })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        // Extract headers from first row
        const headers = Object.keys(worksheet)
          .filter(key => key[1] === "1")
          .map(key => worksheet[key].v)

        const data = []
        // Iterate over rows, starting from row 2
        for (let i = 2; i <= worksheet["!ref"].split(":")[1][1]; i++) {
          const row = {}
          // Iterate over columns
          for (let j = 0; j < headers.length; j++) {
            const key = headers[j]
            const cell = worksheet[String.fromCharCode(65 + j) + i]
            row[key] = cell ? cell.v : null
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
          setError(null)
          setFile(data)
          setIsValid(true) // update state variable
          toast.success("Success: File uploaded successfully")
        } else {
          toast.error(`Error: Fields missing: ${missingFields.join(", ")}`)
          setIsValid(false) // update state variable
        }
      } catch (error) {
        toast.error("Error: Invalid file format")
        setIsValid(false) // update state variable
      }
    }
    fileReader.readAsBinaryString(selectedFile)
  }

  console.log(error)

  const handleSubmit = async event => {
    event.preventDefault()
    if (!file) {
      toast.error("Error: Please upload a file")
      return
    }
    const auth = {
      username: "your-jira-email@example.com",
      password: "your-jira-api-token",
    }
    const headers = {
      "Content-Type": "application/json",
    }
    const createIssueUrl = `${JIRA_API_BASE_URL}/issue`
    console.log(createIssueUrl)
    const data = XLSX.utils.sheet_to_json(
      XLSX.read(file, { type: "binary" }).Sheets[
        XLSX.read(file, { type: "binary" }).SheetNames[0]
      ],
      {
        header: [
          "summary",
          "description",
          "project_key",
          "issuetype_name",
          "assignee_id",
          "priority",
        ],
      }
    )
    for (const item of data) {
      const requestBody = {
        fields: {
          summary: item.summary,
          description: item.description,
          project: {
            key: item.project_key,
          },
          issuetype: {
            name: item.issuetype_name,
          },
          assignee: {
            id: item.assignee_id,
          },
          priority: {
            name: item.priority,
          },
        },
      }
      try {
        const response = await axios.post(
          createIssueUrl,
          JSON.stringify(requestBody),
          {
            auth,
            headers,
          }
        )
        console.log("Issue created:", response.data.key)
      } catch (error) {
        console.log("Error creating issue:", error.message)
      }
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
                {error && <p>{error}</p>}
                <input type="file" onChange={handleFileUpload} />
                {file && <p>Success</p>}
                {fileName && <p>File Name: {fileName}</p>}
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
                  // disabled={!isValid} // disable button if file is invalid
                >
                  Submit
                </Button>
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
