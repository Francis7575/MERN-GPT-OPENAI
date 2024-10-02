import { RouterProvider } from "react-router-dom"
import { Box } from "@mui/material";
import { Suspense } from "react";
import { PAGE_DATA } from './utils/pageData'
import LoadingPage from './pages/LoadingPage'

const App = () => {
  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={PAGE_DATA} />
      </Suspense>
    </Box>
  )
}

export default App