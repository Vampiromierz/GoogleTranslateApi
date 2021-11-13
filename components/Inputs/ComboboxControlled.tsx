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
  const [value, setValue] = useState<
    { value: string; label: string } | undefined
  >(menuItems.find(({ value }) => value === passedValue))

  // standard onChange
  const handleChange = (
    event: any,
    newValue: { value: string; label: string } | undefined
  ) => {
    console.log(newValue)
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
