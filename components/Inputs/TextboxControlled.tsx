import { FormControl, TextField } from "@mui/material"
import React, { SetStateAction, useEffect, useState } from "react"
import useTimer from "../Hooks/useTimer"

type Props = {
  passedValue?: string
  label?: string
  onChangeFn?: React.Dispatch<SetStateAction<string>>

  //all other props
  [x: string]: any
}

const TextboxControlled = ({
  passedValue = "",
  label = "",
  onChangeFn,
  ...rest
}: Props) => {
  const [tempValue, setValue] = useState(passedValue)

  // standard onChange
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value || "")
  }

  // set timeout to prevent from triggering setter (onCHangeFn) every key pressed
  useTimer({ triggerValue: tempValue, fn: () => onChangeFn?.(tempValue) })

  // set visible value
  useEffect(() => {
    setValue(passedValue)
  }, [passedValue])

  return (
    <FormControl fullWidth style={{ margin: "0 15px 0 15px" }}>
      <TextField
        id="outlined-multiline-flexible"
        label={label}
        multiline
        maxRows={10}
        minRows={10}
        value={tempValue || passedValue}
        // defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      />
    </FormControl>
  )
}

export default TextboxControlled
