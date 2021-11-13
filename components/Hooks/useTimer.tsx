import { useEffect } from "react"

type Props = {
  timeout?: number
  triggerValue: string
  fn?: () => void
}

// do passed function everytime triggerValue changes
export default function useTimer({ fn, timeout = 1000, triggerValue }: Props) {
  useEffect(() => {
    let timer = setTimeout(() => {
      fn?.()
    }, timeout)

    return () => clearTimeout(timer)
  }, [triggerValue])
}
