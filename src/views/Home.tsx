import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 1 }}
      >
        <Typography variant="h1" sx={{ lineHeight: 1 }}>
          Quizathon
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", columnGap: 2 }}>
          <Button onClick={() => navigate("/quiz/infra")}>Infra</Button>
          <Button onClick={() => navigate("/quiz/developer")}>Développeur</Button>
          <Button onClick={() => navigate("/quiz/cyber")}>Cyber</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
