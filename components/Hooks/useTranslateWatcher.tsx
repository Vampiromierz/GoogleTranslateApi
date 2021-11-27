import { useCallback, useEffect, useState } from "react"
import setFetcher from "../FetchHandlers/setFetcher"
import { dataHandler } from "../FetchHandlers/dataHandler"

type TranslateProps = {
  state: object
  updateState: (x: string, y: any) => void
}

type StateProps = {
  toTranslateData: string
  sourceLanguage: string
  targetLanguage: string
}

type Data = {
  translatedString: string
  detectedSourceLanguage: string | undefined
}

export function useTranslateWatcher({ state, updateState }: TranslateProps) {
  // state to store lastRequest to prevent app from send the same req twice
  const [lastRequest, setLastRequest] = useState({})

  const { toTranslateData, sourceLanguage, targetLanguage } =
    state as StateProps

  const setData = useCallback(
    ({ translatedString, detectedSourceLanguage }: Data) => {
      updateState("translatedData", translatedString)
      if (detectedSourceLanguage)
        updateState("sourceLanguage", detectedSourceLanguage)

      setLastRequest({
        toTranslateData,
        sourceLanguage: detectedSourceLanguage || sourceLanguage,
        targetLanguage,
      })
    },
    [toTranslateData, sourceLanguage, targetLanguage, updateState]
  )

  useEffect(() => {
    const isRequestChanged =
      JSON.stringify(lastRequest) !==
      JSON.stringify({ toTranslateData, sourceLanguage, targetLanguage })

    // targetLanguage !== sourceLanguage if to prevent GoogleApi response error
    if (
      isRequestChanged &&
      toTranslateData &&
      targetLanguage !== sourceLanguage
    ) {
      const translate = toTranslateData.split("\n")

      setFetcher({
        url: "/api/translate",
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
          if (error.message.indexOf("Bad language pair") == 0)
            setData({
              translatedString: targetLanguage,
              detectedSourceLanguage: toTranslateData,
            })
          else
            setData({
              translatedString: `--ERROR--\n${error.message}`,
              detectedSourceLanguage: undefined,
            })
        }
      })
    }
    // if target and source is the same, set translatedData to the same value as toTranslateData
    else if (targetLanguage === sourceLanguage) {
      updateState("translatedData", toTranslateData)
    }
  }, [toTranslateData, sourceLanguage, targetLanguage, lastRequest])
}
