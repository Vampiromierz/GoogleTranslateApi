import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material"
import React, { useState } from "react"
import useTimer from "../Hooks/useTimer"

type Props = {
  passedValue?: string
  label?: string
  placeholder?: string
  onChangeFn?: (x: string) => void

  //all other props
  [x: string]: any
}

const PasswordControlled = ({
  label,
  placeholder = "Wpisz hasło od autora",
  onChangeFn,
  ...rest
}: Props) => {
  const [tempValue, setValue] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // standard onChange
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value || "")
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  // set timeout to prevent from triggering setter (onCHangeFn) every key pressed
  useTimer({ triggerValue: tempValue, fn: () => onChangeFn?.(tempValue) })

  return (
    <FormControl fullWidth style={{ margin: "0 15px 0 15px" }}>
      <OutlinedInput
        id="outlined-password-input"
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...rest}
      />
    </FormControl>
  )
}

export default PasswordControlled
