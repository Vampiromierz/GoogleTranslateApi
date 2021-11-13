import { Autocomplete, FormControl, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"

type Props = {
  menuItems?: Array<{ value: string; label: string }>
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
  function searchMenuItems(findValue: string) {
    return menuItems.find(({ value }) => value === findValue)
  }

  const [value, setValue] = useState(searchMenuItems(passedValue))

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
      setValue(searchMenuItems("detect"))
    }
  }

  // set the proper value, if passedValue changed state uncontrolled
  useEffect(() => {
    if (value?.value !== passedValue && passedValue !== "detect")
      setValue(searchMenuItems(passedValue))
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
        sx={{ maxWidth: 300, minWidth: 200 }}
        // custom equal function cuz object based options
        isOptionEqualToValue={(option, value) =>
          JSON.stringify(option) === JSON.stringify(value)
        }
      />
    </FormControl>
  )
}

export default ComboboxControlled
