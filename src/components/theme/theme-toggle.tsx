import { useTheme } from "./theme-provider";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8 mt-1"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Sun
          className="h-[0.9rem] w-[0.9rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          aria-label="Light theme icon"
        />
      ) : (
        <Moon
          className="absolute h-[0.9rem] w-[0.9rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          aria-label="Dark theme icon"
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
