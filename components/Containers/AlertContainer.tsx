import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { forwardRef, SyntheticEvent, useEffect, useState } from "react"

type Alert = {
  message: string
  variant: any
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function AlertContainer({ message, variant }: Alert) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [message])

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  if(!message || !variant) return null

  return (
    <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
      <Alert onClose={handleClose} severity={variant} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
