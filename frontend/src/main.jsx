import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "@/styles/hirenexon.css"
import ScrollToTop from "@/shared/components/common/ScrollToTop";
import PageLoader from "@/shared/components/common/PageLoader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
     <ScrollToTop />
      <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
