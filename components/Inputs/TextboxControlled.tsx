import { TextField } from "@mui/material"
import React, { useState } from "react"



const TextboxControlled = ({ defaultValue = String }) => {

    const [value, setValue] = useState(defaultValue)

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { value } = event.target as HTMLSelectElement
        setValue(value)
    }

    return <div>
        <TextField
            id="outlined-multiline-flexible"
            label="Tłumaczenie"
            multiline
            maxRows={4}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
        />
    </div>
}

export default TextboxControlled