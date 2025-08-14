import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "@/App.tsx";
// Internal components
import { Toaster } from "@/components/ui/toaster.tsx";
import { WalletProvider } from "@/components/WalletProvider.tsx";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import { AuthProvider } from "@/contexts/AuthContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
            <WrongNetworkAlert />
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </WalletProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
