import { useContext } from "react";
import ThemeProviderContext from ".";

// Custom hook để sử dụng theme và hàm setTheme
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
