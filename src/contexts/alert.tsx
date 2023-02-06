import CloseIcon from "@mui/icons-material/Close"
import { IconButton, Snackbar } from "@mui/material"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

type SnackbarType = "success" | "error" | "default"
interface SnackbarMessage {
  key: number
  type: SnackbarType
  content: string
}
export type AddAlertType = (content: string, type?: SnackbarType) => void

const AlertContext = createContext<AddAlertType>(() => null)

export const useAlert = () => useContext(AlertContext)
export const AlertProvider = (props: { children: React.ReactNode }) => {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([])
  const [open, setOpen] = useState(false)
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarMessage | null>(null)

  useEffect(() => {
    if (snackPack.length && !snackbarInfo) {
      setSnackbarInfo({ ...snackPack[0] })
      setSnackPack((prev) => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && snackbarInfo && open) setOpen(false)
  }, [open, snackPack, snackbarInfo])
  const addAlert = useCallback((content: string, type: SnackbarType = "default") => {
    if (!content.length) return
    setSnackPack((prev) => [...prev, { type, content, key: new Date().getTime() }])
  }, [])
  const handleClose = useCallback((_: unknown, reason?: string) => {
    if (reason === "clickaway") return
    setOpen(false)
  }, [])

  const handleExited = useCallback(() => {
    setSnackbarInfo(null)
  }, [])

  return (
    <AlertContext.Provider value={addAlert}>
      <Snackbar
        key={snackbarInfo ? snackbarInfo.key : undefined}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        disableWindowBlurListener
        message={snackbarInfo ? snackbarInfo.content : undefined}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor:
              snackbarInfo?.type === "success"
                ? "success.main"
                : snackbarInfo?.type === "error"
                ? "error.main"
                : undefined,
          },
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      {props.children}
    </AlertContext.Provider>
  )
}
