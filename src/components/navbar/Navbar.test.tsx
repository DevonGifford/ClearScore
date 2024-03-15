import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Navbar from "./Navbar";

describe("Navbar", () => {
  const mockHandleCreateIdea = vi.fn();
  const mockhandleSortIdeas = vi.fn();

  test("renders with correct elements", () => {
    // Assemble
    render(
      <Navbar
        handleCreateIdea={mockHandleCreateIdea}
        handleSortIdeas={mockhandleSortIdeas}
      />
    );

    // Assert
    expect(screen.getByText("IdeaBoard")).toBeInTheDocument();
    expect(screen.getByText("Technical Assessment")).toBeInTheDocument();
    expect(screen.getByRole("sort-dropdown")).toBeInTheDocument();
    expect(screen.getByText("New Idea")).toBeInTheDocument();
    expect(screen.getByRole("themeButton")).toBeInTheDocument();
  });

  test("opens and closes sort dropdown menu when sort button is clicked", async () => {
    // Assemble
    render(
      <Navbar
        handleCreateIdea={mockHandleCreateIdea}
        handleSortIdeas={mockhandleSortIdeas}
      />
    );

    // Act
    const sortButtonTrigger = screen.getByRole("sort-dropdown");
    const defaultOption = screen.queryByText("Default");
    expect(defaultOption).not.toBeInTheDocument();
    await userEvent.click(sortButtonTrigger);

    // Assert
    const defaultOptionAfterClick = screen.getByText("Default");
    expect(defaultOptionAfterClick).toBeInTheDocument();
  });
});
