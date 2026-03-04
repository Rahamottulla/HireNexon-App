import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "@/styles/hirenexon.css"
import ScrollToTop from "@/shared/components/common/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
     <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>
);
