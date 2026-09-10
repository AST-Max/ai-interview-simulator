import React from "react";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { InterviewSessionProvider } from "./context/InterviewSessionContext";

export default function App() {
  return (
    <InterviewSessionProvider>
      <Navbar />
      <main className="min-h-screen">
        <AppRoutes />
      </main>
    </InterviewSessionProvider>
  );
}
