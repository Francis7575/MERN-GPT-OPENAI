import { RouterProvider } from "react-router-dom"
import { Box } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { PAGE_DATA } from './utils/pageData'
import LoadingPage from './pages/LoadingPage'

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Suspense fallback={loading ? <LoadingPage /> : null}>
        <RouterProvider router={PAGE_DATA} />
      </Suspense>
    </Box>
  )
}

export default App