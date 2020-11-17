import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  TextField
} from '@material-ui/core'

export default function useDialog({
  onConfirm,
  title,
  text,
  action,
  fields = [],
  onClose = () => {}
}) {
  const [open, setOpen] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [error, setError] = useState()

  const handleClose = () => {
    closeDialog()
    onClose()
  }

  const handleChange = e =>
    setFormValues(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleConfirm = async e => {
    e.preventDefault()

    try {
      await onConfirm(formValues)
    } catch (err) {
      return setError(err)
    }

    closeDialog()
  }

  const closeDialog = () => {
    setFormValues({})
    setError()
    setOpen(false)
  }

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleConfirm}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {text && <DialogContentText>{text}</DialogContentText>}
          {fields.map(field => (
            <TextField
              key={field.name}
              autoComplete="off"
              fullWidth
              margin="dense"
              onChange={handleChange}
              value={formValues[field.name] || ''}
              {...field}
            />
          ))}
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" color="primary" type="submit">
            {action}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )

  return [dialog, () => setOpen(true)]
}
