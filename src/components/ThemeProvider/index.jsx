import React, { createContext, useEffect, useState } from "react";

// Định nghĩa các loại Theme (dạng chuỗi)
// type Theme = "dark" | "light" | "system"

// Khởi tạo trạng thái mặc định cho Context
const initialState = {
  theme: "system",
  setTheme: () => null,
};
const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  // Lấy theme từ localStorage khi khởi tạo, nếu không có thì dùng defaultTheme
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme,
  );

  // useEffect để áp dụng class theme vào thẻ <html> (root) mỗi khi theme thay đổi
  useEffect(() => {
    const root = window.document.documentElement;

    // Xóa các class theme cũ
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Xác định theme hệ thống (dark/light)
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      // Thêm class theme hệ thống
      root.classList.add(systemTheme);
      return;
    }

    // Thêm class theme đã chọn (dark hoặc light)
    root.classList.add(theme);
  }, [theme]);

  // Giá trị cung cấp cho Context
  const value = {
    theme,
    // Hàm setTheme tùy chỉnh: lưu vào localStorage và cập nhật state
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export default ThemeProviderContext;
