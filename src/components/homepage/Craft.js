import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import { Div, Text, Container, Image, Icon } from "atomize"
import codeTheme from "../common/codeTheme"
import "./craft.css"

// import craftImage from "../../images/craft.png"
import boy from "../../images/avatar/boy.png"
import FollowCard from "./uicomponents/FollowCard"

const Craft = () => {
  return (
    <Div
      w="100vw"
      p={{ y: "8rem" }}
      overflow="hidden"
      border={{ b: "1px solid" }}
      borderColor="gray300"
    >
      <Container>
        <Text
          tag="h2"
          textSize="display2"
          textAlign="center"
          fontFamily="secondary"
          textWeight="500"
          maxW="40rem"
          m={{ b: "6rem", x: "auto" }}
        >
          Optimize your workflow with Jira Wizard's powerful bulk upload code
        </Text>
        {/* <Row>
          <Col size={{ xs: 12, md: 10 }} offset={{ md: 1 }}>
            <Div p={{ y: "2rem" }}>
              <Row>
                {list.map((item, index) => (
                  <Col
                    key={index}
                    size={{ xs: 12, sm: 6, lg: 3 }}
                    d="flex"
                    align="center"
                    flexDir="column"
                  >
                    <Div
                      d="flex"
                      maxW="12rem"
                      flexDir="column"
                      align="center"
                      m={{ b: "2rem" }}
                    >
                      <Image src={item.image} w="4.5rem" m={{ b: "1rem" }} />
                      <Text
                        textAlign="center"
                        textSize="subheader"
                        textColor="medium"
                      >
                        {item.content}
                      </Text>
                    </Div>
                  </Col>
                ))}
              </Row>
            </Div>
          </Col>
        </Row> */}
        <Div d="flex" pos="relative" justify="center">
          <Div
            w="100%"
            m={{
              b: { xs: "70%", sm: "auto" },
              r: { xs: "0", md: "4rem" },
              l: "0",
            }}
          >
            <Div
              pos="relative"
              w="100%"
              bg="brandgray"
              p={{ b: { xs: "70%", md: "72%", lg: "53%" } }}
              overflow="hidden"
              style={{ filter: "invert(1)", borderRadius: "24px" }}
            >
              <Div
                pos="absolute"
                top="1rem"
                left="1rem"
                bottom="0"
                right="1rem"
                overflow="hidden"
              >
                <Highlight
                  {...defaultProps}
                  theme={{
                    ...codeTheme,
                    plain: { ...codeTheme.plain, backgroundColor: "#f7f5f4" },
                  }}
                  code={code}
                  language="jsx"
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre className={className} style={style}>
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </Div>
            </Div>
            <Div className="translate-container">
              <Div pos="relative">
                <div className="translate">
                  <AnimatingBlock />
                </div>
                <Div pos="absolute" top="100%" left="0" right="0">
                  <div className="translate">
                    <AnimatingBlock />
                  </div>
                </Div>
                <Div
                  h="1rem"
                  pos="absolute"
                  bottom="0"
                  height="1rem"
                  left="0"
                  bg="white"
                  zIndex="10"
                  right="0"
                ></Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Container>
    </Div>
  )
}

export default Craft

const AnimatingBlock = () => (
  <Div p={{ b: "1rem" }}>
    <Div bg="white" shadow="2" rounded="xl" m={{ b: "1rem" }} p="1.5rem">
      <Div
        border={{ b: "1px solid" }}
        borderColor="gray300"
        p={{ b: "0.75rem" }}
      >
        <Text textSize="title" textWeight="500">
          Created a new issue
        </Text>
        <Text textSize="caption" textColor="light">
          "id":"42586","key":"NAV-232"
        </Text>
      </Div>
      <Div d="flex" justify="space-between" p={{ t: "1rem", b: "1.5rem" }}>
        <Div>
          <Text textSize="caption" textColor="dark">
            Severity
          </Text>
          <Text textSize="caption" textColor="light">
            {/* select one item random from array of string */}
            {
              ["Critical", "Major", "Moderate", "Minor"][
                Math.floor(Math.random() * 3)
              ]
            }
          </Text>
        </Div>
        <Div>
          <Div d="flex" h="20px">
            {[1, 2, 3, 4, 5].map(num => (
              <Icon
                key={num}
                name="StarSolid"
                size="14px"
                color={num === 5 ? "gray400" : "info700"}
                m={{ r: "0.125rem" }}
              />
            ))}
          </Div>
          <Text textSize="caption" textColor="light">
            Priority
          </Text>
        </Div>
      </Div>
    </Div>
    {/* <UserEdit d={{ xs: "none", xl: "flex" }} pos="static" m={{ b: "1rem" }} /> */}
    <FollowCard maxW="100%" pos="static" m={{ b: "1rem" }} />
    <Div
      p="1rem"
      bg="white"
      d="flex"
      shadow="2"
      align="center"
      rounded="xl"
      justify="space-between"
    >
      <Div d="flex" align="center">
        <Image
          src={boy}
          rounded="circle"
          h="2.5rem"
          w="2.5rem"
          m={{ r: "1rem" }}
        />
        <Text textWeight="500">Ankit Raj</Text>
      </Div>
      <Icon name="Add" color="info700" size="20px" />
    </Div>
  </Div>
)

const code = `import openpyxl, requests, json
url, auth = "https://yourcompany.atlassian.net/rest/api/2/issue/", ("yourusername", "yourapikey")
wb, sheet = openpyxl.load_workbook('issue_details.xlsx'), openpyxl.load_workbook('issue_details.xlsx').active
for row in sheet.iter_rows(min_row=2, values_only=True):
    summary, description, project_key, issuetype_name, assignee_id, priority, *components = row
    payload =
    {
      "fields":
        {
          "project": {"key": project_key},
          "summary": summary,
          "description":
                      {
                          "type": "doc", "version": 1,
                          "content": [{"type": "paragraph",
                          "content": [{"text": description, "type": "text"}]}]
                        },
          "issuetype": {"name": issuetype_name},
          "assignee": {"id": assignee_id},
          "priority": {"name": priority},
          "components": [{"name": component} for component in components if component]} }
    response = requests.post(url, headers={"Content-Type": "application/json"}, auth=auth, data=json.dumps(payload))
    if response.status_code != 201: print(f"Failed to create issue. Status code: {response.status_code}, response: {response.content}")
    else: print(f"Issue created successfully: {response.json()['key']}")

`
