import { javascript } from "@codemirror/lang-javascript"
import { Box } from "@mui/material"
import { tokyoNightInit } from "@uiw/codemirror-theme-tokyo-night"
import ReactCodeMirror from "@uiw/react-codemirror"

interface Props {
  value: string
  onChange: (value: string) => void
}
const Editor = ({ value, onChange }: Props) => {
  return (
    <Box sx={{ position: "relative", "& .cm-theme, & .cm-editor": { height: "100%" } }}>
      <ReactCodeMirror
        value={value}
        onChange={onChange}
        theme={tokyoNightInit({ theme: "dark" })}
        extensions={[javascript()]}
      />
    </Box>
  )
}

export default Editor
