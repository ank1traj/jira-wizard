import React, { useEffect, useState } from "react"
import CryptoJS from "crypto-js"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

import { Text, Div, Icon, Button, Input } from "atomize"

const LoginForm = () => {
  const [domain, setDomain] = useState("")
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [response, setResponse] = useState({})
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/Gravatar-default-logo.jpg"
  )

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginButtonClicked, setLoginButtonClicked] = useState(false)

  const handleLogin = async e => {
    e.preventDefault()
    const errors = []

    if (!domain) {
      errors.push("domain")
    }
    if (!email) {
      errors.push("email")
    }
    if (!token) {
      errors.push("token")
    }

    if (errors.length) {
      toast.error(`Please enter your ${errors.join(", ")}`)
      return
    }

    const emailRegex = /^([\w.%+-]+)(@)([\w-]+\.)+([\w]{2,})$/
    const match = email.match(emailRegex)

    if (!match) {
      toast.error("Please enter a valid email address")
      return
    }

    try {
      const plaintext = token
      const secretKey = "mysecretkey"
      const jiraToken = CryptoJS.AES.encrypt(plaintext, secretKey).toString()
      const response = await toast.promise(
        axios.post("http://localhost:4000/api/user", {
          domain,
          email,
          jiraToken,
        }),
        {
          loading: "Authenticating...",
          success: "Authentication successful. Now upload your file!",
          error: response => {
            if (response.response.status === 401) {
              return `Authentication failed: ${response.response.data.message}`
            }
            return "Something went wrong"
          },
        }
      )

      setLoginButtonClicked(true)
      setIsAuthenticated(true)
      setResponse(response.data)
      localStorage.setItem("response", JSON.stringify(response.data)) // save to local storage\
      localStorage.setItem("domain", domain)
      localStorage.setItem("email", email)
      localStorage.setItem("jiraToken", token)
    } catch (error) {
      setIsAuthenticated(false)
    }
  }

  // Clear the response from local storage on logout
  const handleLogout = async () => {
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          localStorage.removeItem("response")
          setIsAuthenticated(false)
          resolve()
        }),
        {
          success: "Bye bye! See you soon " + response.displayName,
          error: "Logout failed",
        }
      )
    } catch (error) {
      toast.error(error)
    }
  }

  if (typeof localStorage !== "undefined") {
    // access localStorage here
    localStorage.setItem("authenticated", JSON.stringify(isAuthenticated))
  }

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("response"))
    if (response) {
      setImage(response.avatarUrls["48x48"])
      setIsAuthenticated(true)
      setResponse(response)
    }
  }, [isAuthenticated])

  const scroll = () => {
    const section = document.querySelector("#file-upload")
    section.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    // If login button is clicked and authentication is true, scroll to the file upload section
    const authenticated = JSON.parse(localStorage.getItem("authenticated"))
    if (loginButtonClicked && authenticated) {
      scroll()
    }
  }, [loginButtonClicked, isAuthenticated])

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
      id="login-form"
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
            Login to Jira
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
            Enter your domain, email and token to get started.
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
            type="text"
            p={{ x: "1rem" }}
            m={{ b: "1rem" }}
            placeholder="domain"
            rounded="circle"
            borderColor="gray400"
            focusBorderColor="info700"
            style={{ transform: "translateY(-2rem)" }}
            value={domain}
            onChange={e => setDomain(e.target.value)}
            suffix={
              <Icon
                pos="absolute"
                name="User"
                color="light"
                size="18px"
                top="50%"
                transform="translateY(-50%) translateY(-2rem)"
                right="1rem"
              />
            }
          />
        ) : null}
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
                name="Lock"
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
          onClick={handleLogin}
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
