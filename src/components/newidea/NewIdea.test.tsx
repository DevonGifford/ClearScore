import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Modal from "./IdeaModal";
import IdeaForm from "./IdeaForm";

describe("New Idea Modal tests", () => {
  test("renders modal closed initially and correctly", () => {
    // Assemble
    render(
      <Modal open={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    // Assert
    const modalOverlay = screen.queryByTestId("modal-overlay");
    expect(modalOverlay).toHaveClass("invisible");
  });

  test("renders modal open correctly", () => {
    // Assemble
    render(
      <Modal open={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    // Assert
    const modalOverlay = screen.getByTestId("modal-overlay");
    expect(modalOverlay).toBeInTheDocument();
    // Assert
    const modalContent = screen.getByTestId("new-idea-modal");
    expect(modalContent).toBeInTheDocument();
    expect(modalOverlay).toHaveClass("visible");
  });

  test("calls onClose when close button is clicked", async () => {
    // Assemble
    const onCloseMock = vi.fn();
    render(
      <Modal open={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );
    // Assert
    const modalOverlay = screen.getByTestId("modal-overlay");
    expect(modalOverlay).toHaveClass("visible");
    // Act
    const closeButton = screen.getByTestId("close-modal-button");
    await userEvent.click(closeButton);
    // Assert
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("does not close when clicking inside the modal content", async () => {
    // Assemble
    const onCloseMock = vi.fn();
    render(
      <Modal open={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );
    // Act
    const modalContent = screen.getByTestId("new-idea-modal");
    await userEvent.click(modalContent);
    // Assert
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});

describe("New Idea Form tests", () => {
  test("renders form with input fields", () => {
    // Assemble
    render(<IdeaForm closeFormModal={() => {}} handleCreateIdea={() => {}} />);
    const titleInput = screen.getByText("The Title");
    const descriptionInput = screen.getByText("The Description");
    // Assert
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  test("displays error message when title is not provided", async () => {
    // Assemble
    render(<IdeaForm closeFormModal={() => {}} handleCreateIdea={() => {}} />);
    // Act
    const submitButton = screen.getByRole("button", {
      name: /save your idea/i,
    });
    userEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = screen.getByText("Title is required");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays error message when description exceeds maximum length", async () => {
    // Assemble
    render(<IdeaForm closeFormModal={() => {}} handleCreateIdea={() => {}} />);
    // Act
    const descriptionInput = screen.getByPlaceholderText(
      "Your description goes here"
    );
    await userEvent.click(descriptionInput);
    await userEvent.type(descriptionInput, "a".repeat(141)); // Type more than 140 characters
    const submitButton = screen.getByRole("button", {
      name: /save your idea/i,
    });
    await userEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = screen.getByText("Maximum of 140 characters");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
