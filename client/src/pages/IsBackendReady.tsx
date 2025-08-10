import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { axiosInstance } from "../lib/axios";

const waitForBackend = async () => {
  let isReady = false;
  let attempts = 0;

  while (!isReady && attempts < 20) {
    try {
      await axiosInstance.get("/health");
      isReady = true;
    } catch {
      await new Promise(res => setTimeout(res, 3000));
      attempts++;
    }
  }

  return isReady;
};

const IsBackendReady = () => (
  <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center">
    <Loader className="size-16 text-emerald-500 animate-spin" />
    <p className="uppercase text-lg font-bold text-center px-6">
      The server may take up to 50 seconds to become active. Thank you for your patience.
    </p>
  </div>
);

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const [backendReady, setBackendReady] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (import.meta.env.MODE === "production") {
      // Only do the backend check in production
      waitForBackend().then((ready) => {
        setBackendReady(ready);
        setChecking(false);
      });
    } else {
      // In development or other envs, skip waiting
      setBackendReady(true);
      setChecking(false);
    }
  }, []);

  if (checking) {
    // While waiting, show loading screen 
    return <IsBackendReady />;
  }

  if (!backendReady) {
    return (
      <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center">
        <p className="uppercase text-lg font-bold text-center px-6 text-red-600">
          The server is currently unreachable. Please try again later.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AppLoader;
