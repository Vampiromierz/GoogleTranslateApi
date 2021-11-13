import { useEffect, useState } from "react"
import useFetcher from "../Hooks/useFetcher"
import { dataHandler } from "./dataHandler"

type StateProps = {
  api_key: string
  toTranslateData: string
  sourceLanguage: string
  targetLanguage: string
  setTranslatedData: (x: string) => void
  setSourceLanguage: (x: string) => void
}

type Data = {
  translatedString: string
  detectedSourceLanguage: string | undefined
}

export function translateWatcher({
  toTranslateData,
  sourceLanguage,
  targetLanguage,
  setTranslatedData,
  setSourceLanguage,
  api_key,
}: StateProps) {
  // state to store lastRequest to prevent app from send the same req twice
  const [lastRequest, setLastRequest] = useState<object>()

  function setData({ translatedString, detectedSourceLanguage }: Data) {
    setTranslatedData(translatedString)
    if (detectedSourceLanguage) setSourceLanguage(detectedSourceLanguage)

    setLastRequest({
      toTranslateData,
      sourceLanguage: detectedSourceLanguage || sourceLanguage,
    })
  }

  useEffect(() => {
    const isRequestChanged =
      JSON.stringify(lastRequest) !==
      JSON.stringify({ toTranslateData, sourceLanguage })
    // targetLanguage !== sourceLanguage if to prevent GoogleApi response error
    if (
      isRequestChanged &&
      toTranslateData &&
      targetLanguage !== sourceLanguage
    ) {
      const translate = toTranslateData.split("\n")

      useFetcher({
        url: `https://translation.googleapis.com/language/translate/v2?key=${api_key}`,
        body: {
          q: translate,
          target: targetLanguage,
          source: sourceLanguage === "detect" ? null : sourceLanguage,
          format: "text",
        },
      }).then(({ data, error }) => {
        if (data) {
          setData(dataHandler(data))
        } else if (error) {
          console.error(error)

          // if target and source is the same, set translatedData to the same value as toTranslateData
          // and set the sourceLanguage to the targetLanguage
          if (error.message.indexOf("Bad language pair") == 0) {
            setData({
              translatedString: targetLanguage,
              detectedSourceLanguage: toTranslateData,
            })
          }
        }
      })
    }
    // if target and source is the same, set translatedData to the same value as toTranslateData
    else if (targetLanguage === sourceLanguage) {
      setTranslatedData(toTranslateData)
    }
  }, [toTranslateData, sourceLanguage, targetLanguage])
}
