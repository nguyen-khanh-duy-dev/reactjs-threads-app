import { useTheme } from "../ThemeProvider/hook.js";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span>Current Theme: {theme}</span>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}

export default ThemeToggle;
