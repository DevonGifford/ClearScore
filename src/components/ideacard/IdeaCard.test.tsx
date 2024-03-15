import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import IdeaCard from "./IdeaCard";

const mockCardData = {
  index: 0,
  created: "2024-03-18T08:00:00.000Z",
  edited: "",
  title: "Test Title",
  description: "Test Description",
  handleDeleteIdea: vi.fn(),
  handleUpdateIdea: vi.fn(),
};
describe("IdeaCard", () => {
  const mockCardProps = mockCardData;

  test("renders with correct initial data", () => {
    // Assemble
    render(<IdeaCard {...mockCardProps} />);

    // Assert
    expect(screen.getByTestId("idea-card-title")).toHaveValue("Test Title");
    expect(screen.getByTestId("idea-card-description")).toHaveValue(
      "Test Description"
    );
    expect(screen.getByText(/Created: 2024-03-18/i)).toBeInTheDocument();
    expect(screen.queryByText("Edited:")).not.toBeInTheDocument();
  });

  test("allows editing title", async () => {
    // Assemble
    render(<IdeaCard {...mockCardProps} />);

    // Act
    const titleInput = screen.getByText("Test Title");
    await userEvent.type(titleInput, " - edited");

    // Assert
    expect(titleInput).toHaveValue("Test Title - edited");
  });

  test("allows editing description", async () => {
    // Assemble
    render(<IdeaCard {...mockCardProps} />);

    // Act
    const descriptionInput = screen.getByText("Test Description");
    await userEvent.type(descriptionInput, " - edited");

    // Assert
    expect(descriptionInput).toHaveValue("Test Description - edited");
  });

  test("displays character count and submits edited data", async () => {
    // Assemble
    render(<IdeaCard {...mockCardProps} />);

    // Act
    const descriptionInput = screen.getByTestId("idea-card-description");
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, "New Description");

    // Assert
    await waitFor(() => expect(screen.getByText("125")).toBeInTheDocument()); // Character count
    userEvent.click(screen.getByTestId("submit-save-button"));
    await waitFor(() => {
      expect(mockCardProps.handleUpdateIdea).toHaveBeenCalledWith(
        0,
        "Test Title",
        "New Description"
      );
    });
  });

  test("triggers delete function", async () => {
    // Assemble
    render(<IdeaCard {...mockCardProps} />);

    // Act
    const deleteButton = screen.getByLabelText(
      `delete idea button for Test Title`
    );
    await userEvent.click(deleteButton);
    // Assert
    expect(mockCardProps.handleDeleteIdea).toHaveBeenCalled();
  });

  test("displays validation errors for invalid input", async () => {
    // Assemble
    render(<IdeaCard {...mockCardProps} />);
    const titleInput = screen.getByTestId("idea-card-title");
    const descriptionInput = screen.getByTestId("idea-card-description");

    // Act
    userEvent.clear(titleInput);
    userEvent.clear(descriptionInput);
    userEvent.click(screen.getByTestId("submit-save-button"));

    // Assert
    await waitFor(() => {
      // Wait for validation errors to appear
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });
  });
});
