import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { axiosInstance } from "../lib/axios";

const waitForBackend = async () => {
  let isReady = false;
  let attempts = 0;

  while (!isReady && attempts < 20) {
    try {
      await axiosInstance.get("/health");
      isReady = true;
    } catch {
      await new Promise((res) => setTimeout(res, 3000));
      attempts++;
    }
  }

  return isReady;
};

const CenteredContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      px: 3,
      textAlign: "center",
      gap: 2,
    }}
  >
    {children}
  </Box>
);

const IsBackendReady = () => (
  <CenteredContainer>
    <CircularProgress color="success" size={48} />
    <Typography marginTop={2}
      variant="h6"  textTransform="uppercase" maxWidth={600}>
      The server may take up to 50 seconds to become active. Thank you for your patience.
    </Typography>
  </CenteredContainer>
);

const ErrorMessage = () => (
  <CenteredContainer>
    <Typography
      variant="h6"
      fontWeight="bold"
      textTransform="uppercase"
      color="error"
      maxWidth={400}
    >
      The server is currently unreachable. Please try again later.
    </Typography>
  </CenteredContainer>
);

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const [backendReady, setBackendReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      if (import.meta.env.MODE === "production") {
        const ready = await waitForBackend();
        setBackendReady(ready);
      } else {
        setBackendReady(true);
      }
      setLoading(true);
    };

    checkBackend();
  }, []);

  if (loading) return <IsBackendReady />;
  if (!backendReady) return <ErrorMessage />;

  return <>{children}</>;
};

export default AppLoader;
