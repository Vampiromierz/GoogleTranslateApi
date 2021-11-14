import ComboboxControlled from "../Inputs/ComboboxControlled"
import TextboxControlled from "../Inputs/TextboxControlled"

type LanguageProps = {
  menuItems: Array<{ value: string; label: string }>
  passedValue: string
  onChangeFn: (x: string) => void
  label: string
  disableClearable: Boolean
}

type TranslateProps = {
  passedValue?: string
  label?: string
  onChangeFn?: (x: string) => void
}

type TranslateBoxProps = {
  languageProps: LanguageProps
  translateProps: TranslateProps
  flexEnd?: Boolean
}

// label: "Język źródłowy",
// menuItems: [
//     { value: "detect", label: "Automatyczne wykrywanie" },
//     ...menuItems,
//   ],

export const TranslateBoxContainer = ({
  languageProps,
  translateProps,
  flexEnd,
}: TranslateBoxProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: flexEnd ? "flex-end" : undefined,
        width: '100%'
      }}
    >
      <ComboboxControlled {...languageProps} />

      <TextboxControlled {...translateProps} />
    </div>
  )
}
