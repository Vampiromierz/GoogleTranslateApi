import { useState } from "react"
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

  return (
    <div>
      <ComboboxControlled
        {...{
          menuItems: [
            { value: "detect", label: "Automatyczne wykrywanie" },
            ...menuItems,
          ],
          label: "",
          passedValue: sourceLanguage,
          onChangeFn: setSourceLanguage,
          disableClearable: false,
        }}
      />
      <ComboboxControlled
        {...{
          menuItems: [...menuItems],
          label: "",
          passedValue: targetLanguage,
          onChangeFn: setTargetLanguage,
          disableClearable: true,
        }}
      />
    </div>
  )
}
