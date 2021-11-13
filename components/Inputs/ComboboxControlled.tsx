import {
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import React, { SetStateAction, useEffect, useState } from "react"

type Props = {
  menuItems?: Array<{ value: string; label: any }>
  label?: string
  passedValue: string
  onChangeFn: (x: string) => void
  disableClearable: Boolean
}

const ComboboxControlled = ({
  menuItems = [],
  passedValue = "",
  label = "",
  onChangeFn,
  disableClearable,
}: Props) => {
  const [value, setValue] = useState<{ value: string; label: any } | undefined>(
    menuItems.find(({ value }) => value === passedValue)
  )

  console.log(
    "value",
    value,
    "item",
    menuItems[0],
    "equeal",
    JSON.stringify(value) === JSON.stringify(menuItems[0])
  )

  // standard onChange
  const handleChange = (
    event: any,
    newValue: { value: string; label: any } | undefined
  ) => {
    onChangeFn(newValue?.value || "detect")
    setValue(newValue)
  }

  // set the proper value, if passedValue changed state uncontrolled
  useEffect(() => {
    if (value?.value !== passedValue && passedValue !== "detect")
      setValue(menuItems.find(({ value }) => value === passedValue))
  }, [passedValue])

  return (
    <FormControl style={{ margin: "0 15px 0 15px" }}>
      <Autocomplete
        options={menuItems}
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value}
        onChange={handleChange}
        disableClearable={!!disableClearable}
        id="controllable-states-demo"
        sx={{ width: 300 }}
      />
    </FormControl>
  )
}

export default ComboboxControlled
