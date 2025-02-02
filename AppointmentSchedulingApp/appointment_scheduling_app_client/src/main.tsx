import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PatientRoutes  from "./routes/PatientRoutes.tsx";
import ReceptionistApp from "./ReceptionistApp.tsx";
import { useState } from "react";

const App = () => {
  const [userRole, setUserRole] = useState("patient");

  return (
    <StrictMode>
      {userRole === "patient" ? <PatientRoutes /> : <ReceptionistApp />}
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
