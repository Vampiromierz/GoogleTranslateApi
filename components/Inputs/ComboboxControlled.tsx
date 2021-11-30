import { Autocomplete, FormControl, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"

type Props = {
  menuItems?: Array<{ value: string; label: string }>
  label?: string
  passedValue: string
  onChangeFn: (x: string) => void
  disableClearable: Boolean
}

function searchMenuItems(
  findValue: string,
  menuItems: Array<{ value: string; label: string }>
) {
  return menuItems.find(({ value }) => value === findValue)
}

const ComboboxControlled = ({
  menuItems = [],
  passedValue = "",
  label = "",
  onChangeFn,
  disableClearable,
}: Props) => {
  const [value, setValue] = useState(searchMenuItems(passedValue, menuItems))

  // standard onChange
  const handleChange = (
    event: any,
    newValue: { value: string; label: string } | undefined
  ) => {
    if (newValue?.value) {
      onChangeFn(newValue.value)
      setValue(newValue)
    } else {
      onChangeFn("detect")
      setValue(searchMenuItems("detect", menuItems))
    }
  }

  // set the proper value, if passedValue changed state uncontrolled
  useEffect(() => {
    if (value?.value !== passedValue && passedValue !== "detect")
      setValue(searchMenuItems(passedValue, menuItems))
  }, [passedValue, menuItems])

  return (
    <FormControl style={{ margin: "15px 15px 15px 15px" }}>
      <Autocomplete
        options={menuItems}
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value}
        onChange={handleChange}
        disableClearable={!!disableClearable}
        id="controllable-states-demo"
        sx={{ width: 250 }}
        // custom equal function cuz object based options
        isOptionEqualToValue={(option, value) =>
          JSON.stringify(option) === JSON.stringify(value)
        }
      />
    </FormControl>
  )
}

export default ComboboxControlled
