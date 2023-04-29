import React, { useEffect, useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

import { Text, Div, Icon, Button, Input } from "atomize"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [response, setResponse] = useState({})
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/Gravatar-default-logo.jpg"
  )

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email")
      return
    }
    if (!token) {
      toast.error("Please enter your token")
      return
    }
    try {
      const response = await axios.post(
        "https://jira-1qw7.onrender.com/api/user",
        {
          email,
          token,
        }
      )
      setIsAuthenticated(true)
      setResponse(response.data)
      localStorage.setItem("response", JSON.stringify(response.data)) // save to local storage
      // add code here to handle successful login
    } catch (error) {
      setIsAuthenticated(false)
      console.error(error)
      // add code here to handle login failure
    }
  }

  // Clear the response from local storage on logout
  const handleLogout = () => {
    localStorage.removeItem("response")
    setIsAuthenticated(false)
  }

  localStorage.setItem("authenticated", JSON.stringify(isAuthenticated))

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("response"))
    if (response) {
      setImage(response.avatarUrls["48x48"])
      setIsAuthenticated(true)
      setResponse(response)
    }
  }, [isAuthenticated])

  console.log(image)

  return (
    <Div
      d="flex"
      flexDir="column"
      border="1px solid"
      borderColor="gray200"
      w={{ xs: "100%", md: "19.5rem" }}
      maxW="100%"
      pos={{ xs: "static", md: "absolute" }}
      m={{ xs: "1rem", md: "0" }}
      right="0"
      top="0"
      rounded="xl"
      h={{ lg: "24rem" }}
      bg="white"
      shadow="4"
      p="2rem"
    >
      <Toaster />
      <Div flexGrow="1">
        {!isAuthenticated ? (
          <Text
            textAlign="center"
            textSize="title"
            m={{ t: "0.5rem", b: "0.5rem" }}
            textWeight="500"
            fontFamily="secondary"
          >
            Get your Jira Account Details
          </Text>
        ) : (
          <Text
            textAlign="center"
            textSize="title"
            m={{ t: "0.5rem", b: "0.5rem" }}
            textWeight="500"
            fontFamily="secondary"
          >
            Welcome {response.displayName}
          </Text>
        )}
        {!isAuthenticated ? (
          <Text
            textColor="light"
            textSize="caption"
            m={{ b: "4rem" }}
            textAlign="center"
          >
            Enter your email and token to get started.
          </Text>
        ) : (
          <Text
            textColor="light"
            textSize="caption"
            m={{ b: "4rem" }}
            textAlign="center"
          >
            AccountID : {response.accountId}
          </Text>
        )}
        {!isAuthenticated ? (
          <Input
            type="email"
            p={{ x: "1rem" }}
            m={{ b: "1rem" }}
            placeholder="johndoe@gmail.com"
            rounded="circle"
            borderColor="gray400"
            focusBorderColor="info700"
            style={{ transform: "translateY(-2rem)" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            suffix={
              <Icon
                pos="absolute"
                name="Email"
                color="light"
                size="18px"
                top="50%"
                transform="translateY(-50%) translateY(-2rem)"
                right="1rem"
              />
            }
          />
        ) : (
          <Div
            h="4rem"
            w="4rem"
            bgImg={image}
            bgSize="cover"
            bgPos="center"
            style={{
              transform: "translateY(-2rem) translateX(6rem)",
            }}
            m={{ r: "1rem" }}
            rounded="circle"
          ></Div>
        )}
        {!isAuthenticated ? (
          <Input
            type="password"
            p={{ x: "1rem" }}
            // m={{ b: "3rem" }}
            placeholder="Token"
            rounded="circle"
            borderColor="gray400"
            focusBorderColor="info700"
            style={{ transform: "translateY(-2rem)" }}
            value={token}
            onChange={e => setToken(e.target.value)}
            suffix={
              <Icon
                pos="absolute"
                name="Eye"
                color="light"
                size="18px"
                top="50%"
                transform="translateY(-50%) translateY(-2rem)"
                right="1rem"
              />
            }
          />
        ) : null}
      </Div>
      {!isAuthenticated ? (
        <Button
          type="submit"
          rounded="circle"
          h="3rem"
          bg="info200"
          hoverBg="info300"
          textColor="info700"
          onClick={handleSubmit}
        >
          Login
        </Button>
      ) : (
        <Button
          type="submit"
          rounded="circle"
          h="3rem"
          bg="info200"
          hoverBg="info300"
          textColor="info700"
          onClick={() =>
            window.open(
              "https://cucoders.atlassian.net/jira/people/" +
                response.accountId,
              "_blank"
            )
          }
        >
          Complete Profile
        </Button>
      )}
      {isAuthenticated ? (
        <Button
          type="submit"
          form="loginForm"
          rounded="circle"
          h="3rem"
          bg="info200"
          hoverBg="info300"
          textColor="info700"
          style={{ transform: "translateY(1rem)" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : null}
      <form id="loginForm" style={{ display: "none" }}></form>
    </Div>
  )
}

export default LoginForm
