import { CompareArrows } from "@mui/icons-material"
import { useState } from "react"
import { IconContainer } from "./IconContainer"
import ComboboxControlled from "./Inputs/ComboboxControlled"

type Props = {
  languages: Array<{ language: string; name: string }>
  targetLanguage: string
  sourceLanguage: string
  setTargetLanguage: (x: string) => void
  setSourceLanguage: (x: string) => void
}

export const LanguageBar = ({
  languages,
  targetLanguage,
  sourceLanguage,
  setTargetLanguage,
  setSourceLanguage,
}: Props) => {
  const [menuItems] = useState(
    languages.map(({ language, name }: { [x: string]: string }) => {
      return { value: language, label: `${language} - ${name}` }
    })
  )

  function switchLanguages() {
    const _targetLanguage = targetLanguage
    const _sourceLanguage = sourceLanguage
    setTargetLanguage(_sourceLanguage)
    setSourceLanguage(_targetLanguage)
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ComboboxControlled
        {...{
          menuItems: [
            { value: "detect", label: "Automatyczne wykrywanie" },
            ...menuItems,
          ],
          label: "Język źródłowy",
          passedValue: sourceLanguage,
          onChangeFn: setSourceLanguage,
          disableClearable: false,
        }}
      />
      <IconContainer
        color="black"
        action={sourceLanguage !== "detect" ? switchLanguages : undefined}
        cursor={sourceLanguage === "detect" ? "no-drop" : undefined}
      >
        <CompareArrows />
      </IconContainer>

      <ComboboxControlled
        {...{
          menuItems: [...menuItems],
          label: "Język docelowy",
          passedValue: targetLanguage,
          onChangeFn: setTargetLanguage,
          disableClearable: true,
        }}
      />
    </div>
  )
}
