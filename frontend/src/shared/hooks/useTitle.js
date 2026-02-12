// src/shared/hooks/useTitle.js
import { useEffect } from "react";

const BRAND_TITLE = "HireNexon – Where Talent Meets Opportunity";

const useTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `${title} | HireNexon`
      : BRAND_TITLE;
  }, [title]);
};

export default useTitle;
