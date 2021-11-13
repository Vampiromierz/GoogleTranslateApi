import { SetStateAction } from "react"
import TextboxControlled from "./Inputs/TextboxControlled"
import styles from "../styles/Home.module.css"

type Props = {
  translatedData: string
  setToTranslateData: React.Dispatch<SetStateAction<string>>
}

export const TranslateBar = ({ translatedData, setToTranslateData }: Props) => {
  return (
    <div
    className={styles.translatebar}

    >
      <TextboxControlled
        label="Tekst do przetłumaczenia"
        onChangeFn={setToTranslateData}
      />
      <TextboxControlled
        label="Tłumaczenie"
        passedValue={translatedData}
        disabled
      />
    </div>
  )
}
