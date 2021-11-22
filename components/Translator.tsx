import { CompareArrows } from "@mui/icons-material"
import { useState } from "react"
import { IconContainer } from "./Containers/IconContainer"
import { TranslateBoxContainer } from "./Containers/TranslateBoxContainer"
import { translateWatcher } from "./FetchHandlers/translateWatcher"
import useObject from "./Hooks/useObject"

type TranslatorProps = {
  menuItems: Array<{ value: string; label: string }>
}

export const Translator = ({  menuItems }: TranslatorProps) => {
  const { state, updateState, overrideState } = useObject({
    toTranslateData: "",
    translatedData: "",
    sourceLanguage: "pl",
    targetLanguage: "en",
  })

  translateWatcher({ state, updateState })

  function switchLanguages() {
    overrideState({
      ...state,
      targetLanguage: state.sourceLanguage,
      sourceLanguage: state.targetLanguage,
    })
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TranslateBoxContainer
        flexEnd={true}
        translateProps={{
          passedValue: "",
          label: "Tekst do przetłumaczenia",
          onChangeFn: (value) => updateState("toTranslateData", value),
        }}
        languageProps={{
          menuItems: [
            { value: "detect", label: "Automatyczne wykrywanie" },
            ...menuItems,
          ],
          label: "Język źródłowy",
          passedValue: state.sourceLanguage,
          onChangeFn: (value) => updateState("sourceLanguage", value),
          disableClearable: false,
        }}
      />

      <IconContainer
        color="black"
        action={state.sourceLanguage !== "detect" ? switchLanguages : undefined}
        cursor={state.sourceLanguage === "detect" ? "no-drop" : undefined}
      >
        <CompareArrows />
      </IconContainer>

      <TranslateBoxContainer
        translateProps={{
          passedValue: state.translatedData,
          label: "Tłumaczenie",
        }}
        languageProps={{
          menuItems: [...menuItems],
          label: "Język docelowy",
          passedValue: state.targetLanguage,
          onChangeFn: (value) => updateState("targetLanguage", value),
          disableClearable: true,
        }}
      />
    </div>
  )
}
