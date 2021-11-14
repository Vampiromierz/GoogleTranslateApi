import type { GetStaticProps, NextPage } from "next"
import { Layout } from "../components/Layout"
import { Translator } from "../components/Translator"

type Props = {
  menuItems: Array<{ value: string; label: string }>
  api_key: string
  secret_key: string
}

const Home: NextPage = (props) => {
  const { menuItems, api_key, secret_key } = props as Props

  return (
    <Layout {...{ secret_key }}>
      <Translator {...{ menuItems, api_key }} />
    </Layout>
  )
}

// static generate page to get all language options only with one fetch by server
export const getStaticProps: GetStaticProps = async (context) => {
  const api_key = process.env.GOOGLE_API_KEY
  const secret_key = process.env.SECRET_KEY
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2/languages?key=${api_key}`,
    { body: JSON.stringify({ target: "pl" }), method: "POST" }
  )
  const data = await res.json()

  if (!data || data.error) {
    return {
      props: { notFound: true },
      revalidate: 60 * 60, // refetch data every hour if response is invalid
    }
  }

  const menuItems = data.data.languages.map(
    ({ language, name }: { [x: string]: string }) => {
      return { value: language, label: `${language} - ${name}` }
    }
  )

  return {
    props: { menuItems, api_key, secret_key },
    revalidate: 24 * 60 * 60 * 7, // refetch data once a week
  }
}

export default Home
