import { useState } from "react"

type ObjectProps = {
  [x: string]: any
}

export default function useObject(props: ObjectProps) {
  const [state, setState] = useState(props)

  function setDefault() {
    setState(props)
  }

  function overrideState(overrideProps: ObjectProps) {
    setState(overrideProps)
  }

  function updateState(prop: string, value: any) {
    setState((prev) => {
      return {
        ...prev,
        [prop]: value,
      }
    })
  }

  return {
    state,
    updateState,
    overrideState,
    setDefault,
  }
}
