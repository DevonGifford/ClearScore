import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { RenderResult, render, renderHook } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/components/theme/theme-provider";
import userEvent from "@testing-library/user-event";

describe("Testing ThemeProvider and Theme Functionality", () => {
  // Suite Tear Up
  let getByText: RenderResult["getByText"];
  beforeEach(() => {
    //- Mock component rendered within the Theme Provider/Wrapper
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <p>Current theme: {theme}</p>
          <button onClick={() => setTheme("dark")}>Change to Dark</button>
          <button onClick={() => setTheme("light")}>Change to Light</button>
          <button onClick={() => setTheme("system")}>Revert to System</button>
        </div>
      );
    };
    //- Custom Render
    const renderResult = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    //- Destructure getByText from the render result
    getByText = renderResult.getByText;
  });

  // Suite Tear Down
  afterEach(() => {
    window.sessionStorage.removeItem("THEME_DATA");
  });

  it("retrieves the theme correctly and updates to dark", () => {
    //- Initial theme
    expect(getByText("Current theme: dark")).toBeInTheDocument();

    //- Change the theme to Dark
    const changeButton = getByText("Change to Dark");
    userEvent.click(changeButton);
    expect(getByText("Current theme: dark")).toBeInTheDocument();
  });

  it("retrieves the theme correctly and updates to light", async () => {
    //- Initial theme
    expect(getByText("Current theme: dark")).toBeInTheDocument();

    //- Change the theme to Light
    const changeLightButton = getByText("Change to Light");
    await userEvent.click(changeLightButton);
    expect(getByText("Current theme: light")).toBeInTheDocument();
  });

  it("retrieves the theme correctly, update to light theme and back to dark", async () => {
    //- Existing theme
    expect(getByText("Current theme: dark")).toBeInTheDocument();

    //- Change the theme to Light
    const changeLightButton = getByText("Change to Light");
    await userEvent.click(changeLightButton);
    expect(getByText("Current theme: light")).toBeInTheDocument();

    //- Change the theme back to Dark
    const changeButton = getByText("Change to Dark");
    await userEvent.click(changeButton);
    expect(getByText("Current theme: dark")).toBeInTheDocument();
  });
});

describe("Testing the useTheme Hook", () => {
  it("returns the correct theme and setTheme function", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("dark");
    expect(typeof result.current.setTheme).toBe("function");
  });
});
