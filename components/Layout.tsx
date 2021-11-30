import { Email, GitHub } from "@mui/icons-material"
import Head from "next/head"
import { IconContainer } from "./Containers/IconContainer"
import { useEffect, useState } from "react"
import PasswordControlled from "./Inputs/PasswordControlled"
import AlertContainer from "./Containers/AlertContainer"
import { Button } from "@mui/material"

type LayoutProps = {
  children: any
  secret_key: string
  isAuth?: Boolean
  setPassword?: (x: string) => void
}

type MessageProps = {
  message: string
  variant: string
}

const ChildrenContainer = ({ isAuth, children, setPassword }: LayoutProps) => {
  const [tempPassword, setTempPassword] = useState("")

  if (isAuth) return children

  if (!isAuth)
    return (
      <div style={{ display: "flex" }}>
        <PasswordControlled onChangeFn={(value) => setTempPassword?.(value)} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPassword?.(tempPassword)}
          disabled={!!!tempPassword?.length}
          style={{ padding: "0 20px 0 20px" }}
        >
          Odblokuj
        </Button>
      </div>
    )
}

const emptyMessege = { message: "", variant: "" }

export const Layout = ({ children, secret_key }: LayoutProps) => {
  const [isAuth, setAuth] = useState<Boolean>(false)
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<MessageProps>(emptyMessege)

  useEffect(() => {
    const key = localStorage.getItem("authKey")
    let msg

    switch (secret_key) {
      case password:
        setAuth(true)
        localStorage.setItem("authKey", secret_key)
        msg = { message: "Wpisano poprawne hasło.", variant: "success" }
        break
      case key:
        setAuth(true)
        msg = { message: "Zalogowano pomyślnie.", variant: "success" }
        break

      default:
        if (!!password?.length)
          msg = { message: "Wpisano błędne hasło.", variant: "error" }
        else msg = { message: "Zaloguj się hasłem.", variant: "info" }
        break
    }
    setMessage(msg || emptyMessege)
  }, [password, secret_key])

  return (
    <div className="container">
      <Head>
        <title>Google Cload Translate</title>
        <meta
          name="description"
          content="Google Translate Api example by Sebastian Drejkarz"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Translator językowy!</h1>

        <p className="description">
          Wykorzystane technologie:{" "}
          <code className="code">
            React + NextJS, TS, GoogleCloadTranslateApi
          </code>
        </p>

        <AlertContainer message={message.message} variant={message.variant} />

        <ChildrenContainer
          {...{
            isAuth,
            secret_key,
            setPassword: (value) => {
              setMessage(emptyMessege)
              setPassword(value)
            },
          }}
        >
          {children}
        </ChildrenContainer>
      </main>

      <footer className="footer">
        &copy;Sebastian Drejkarz
        <IconContainer href={"https://github.com/Vampiromierz"} color="black">
          <GitHub />
        </IconContainer>
        <IconContainer
          href={"sdrejkarz90@gmail.com"}
          color="blue"
          mailTo={true}
        >
          <Email />
        </IconContainer>
      </footer>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0 50px 0 50px;
        }

        .main {
          width: 100%;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .translatebar {
          width: 100%;
          display: flex;
          justify-content: space-around;
          margin-top: 30px;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>
    </div>
  )
}
