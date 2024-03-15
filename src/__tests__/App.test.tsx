import { describe, test, expect } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App.tsx";
import { multipleMockIdeas, singleMockIdea } from "./utils/TestIdeaData.ts";

describe("Testing the 'Create' Idea functionality", () => {
  test("Creating new idea via Modal", async () => {
    // Assemble
    localStorage.clear();
    const { getByRole, getByPlaceholderText, getByText, getByTestId } = render(
      <App />
    );

    // Act
    const openModalButton = getByTestId("create idea");
    userEvent.click(openModalButton);

    const titleInput = getByPlaceholderText("Your title goes here");
    const descriptionInput = getByPlaceholderText("Your description goes here");
    await userEvent.type(titleInput, "New Idea Title");
    await userEvent.type(descriptionInput, "New Idea Description");
    await userEvent.tab(); // simulate tabbing to trigger onBlur event

    const submitButton1 = getByRole("button", { name: "Save your Idea" });
    await userEvent.click(submitButton1);

    // Assert
    await waitFor(() => {
      const newIdeaCard = getByText("New Idea Title");
      expect(newIdeaCard).toBeInTheDocument();
    });

    // TEAR DOWN
    localStorage.clear();
  });

  test("Generate Fake Ideas via Modal Button", async () => {
    // Assemble
    localStorage.clear();
    render(<App />);

    // Act
    const openModalButton = screen.getByTestId("create idea");
    userEvent.click(openModalButton);

    const generateFakeIdeaButton = screen.getByRole("button", {
      name: "Generate Fake Ideas",
    });
    await userEvent.click(generateFakeIdeaButton);

    // Assert
    const localStorageCheck = localStorage.getItem("IDEA_DATA");
    await waitFor(() => {
      expect(localStorageCheck).not.toBeNull();
    });

    // TEAR DOWN
    localStorage.clear();
  });
});

describe("Testing the 'Delete' Idea functionality", () => {
  test("Testing the 'Delete' Idea functionality", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(multipleMockIdeas));
    render(<App />);

    // Assert
    const IdeaA = screen.getByText("A Test Idea");
    const IdeaB = screen.getByText("B Test Idea");
    const IdeaC = screen.getByText("C Test Idea");
    expect(IdeaA).toBeInTheDocument();
    expect(IdeaB).toBeInTheDocument();
    expect(IdeaC).toBeInTheDocument();

    // Act
    const title = "A Test Idea";
    const deleteButton = screen.getByLabelText(
      `delete idea button for ${title}`
    );
    await userEvent.click(deleteButton);

    // Assert
    waitFor(() => {
      const deletedIdea = screen.queryByText("A Test Idea");
      expect(deletedIdea).not.toBeInTheDocument();
      expect(IdeaA).not.toBeInTheDocument();
      expect(IdeaB).toBeInTheDocument();
      expect(IdeaC).toBeInTheDocument();
    });
    // Tear Down
    localStorage.clear();
  });
});

describe("Testing the 'Edit' Idea functionality", () => {
  test("Testing ability to update/edit existing card Title", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(multipleMockIdeas));
    render(<App />);

    // Act
    const titleCardA = screen.getByText("A Test Idea");
    await userEvent.type(titleCardA, " (edited Title)");

    const submitButton = screen.getByRole("button", { name: "Save Edit" });
    await userEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      const newTitleCardA = screen.getByText("A Test Idea (edited Title)");
      expect(newTitleCardA).toBeInTheDocument();
    });
    // Tear Down
    localStorage.clear();
  });

  test("Testing ability to update/edit existing card Description", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(multipleMockIdeas));
    render(<App />);

    // Act
    const descriptionCardB = screen.getByText("Description B");
    await userEvent.type(descriptionCardB, " (edited Description)");
    const submitButton2 = screen.getByRole("button", { name: "Save Edit" });
    await userEvent.click(submitButton2);

    // Assert
    await waitFor(() => {
      const newTitleCardB = screen.getByText(
        "Description B (edited Description)"
      );
      expect(newTitleCardB).toBeInTheDocument();
    });
    // Tear Down
    localStorage.clear();
  });

  test("Testing ability to update/edit existing card Title & Description", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(multipleMockIdeas));
    render(<App />);

    // Act
    const titleCardC = screen.getByText("C Test Idea");
    const descriptionCardC = screen.getByText("Description C");
    await userEvent.type(titleCardC, " (edited Title)");
    await userEvent.type(descriptionCardC, " (edited Description)");

    const submitButton = screen.getByRole("button", { name: "Save Edit" });
    await userEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      const newTitleCardC = screen.getByText(
        "Description C (edited Description)"
      );
      const newDescriptionCardC = screen.getByText(
        "Description C (edited Description)"
      );
      expect(newTitleCardC).toBeInTheDocument();
      expect(newDescriptionCardC).toBeInTheDocument();
    });
    // Tear Down
    localStorage.clear();
  });
});

describe("Testing forbidden 'Edits' to existing cards", () => {
  test("Test having over 140 characters in description is forbidden to submit", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(singleMockIdea));
    render(<App />);

    // Act
    const descriptionTextArea = screen.getByPlaceholderText(
      "Write your description here"
    );
    await userEvent.type(descriptionTextArea, "a".repeat(141)); // Set character count to 141

    // Assert
    const submitButton = screen.getByRole("button", { name: "Save Edit" });
    expect(submitButton).toBeDisabled();
    // Tear Down
    localStorage.clear();
  });

  test("Test leaving title & description blank is forbidden w/ error message", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(singleMockIdea));
    render(<App />);

    // Act
    const titleInput = screen.getByPlaceholderText("Write your title here");
    const descriptionInput = screen.getByPlaceholderText(
      "Write your description here"
    );

    userEvent.clear(titleInput);
    userEvent.tab(); // Trigger blur to show error message

    userEvent.clear(descriptionInput);
    userEvent.tab(); // Trigger blur to show error message

    const submitButton = screen.getByRole("button", { name: "Save Edit" });
    await userEvent.click(submitButton);

    // Assert
    const TitleErrorMessage = await screen.findByText("Title is required");
    const descriptionErrorMessage = await screen.findByText(
      "Description is required"
    );
    expect(TitleErrorMessage).toBeInTheDocument();
    expect(descriptionErrorMessage).toBeInTheDocument();
    // Tear Down
    localStorage.clear();
  });
});

describe("Testing Sorting Functionality", () => {
  test("check functionality of sorting by title A-Z", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(multipleMockIdeas));
    render(<App />);

    //- Open Sort Dropdown and click button
    const dropdownTrigger = screen.getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
    const alphabeticalButton = screen.getByText("Title A-Z");
    await userEvent.click(alphabeticalButton);
    //-Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = screen.getAllByTestId("idea-card-title");
    //-Extract the text content of each title
    const titleTexts = ideaCardTitles.map(
      (titleElement) => titleElement.textContent
    );
    //-Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map((title) =>
      multipleMockIdeas.find((idea) => idea.title === title)
    );
    //-Check if the ideas are in the correct reverse-sorted order by title
    const reverseSortedIdeas = [...multipleMockIdeas].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    // Assert
    expect(sortedIdeas).toEqual(reverseSortedIdeas);
    // Tear Down
    localStorage.clear();
  });

  test("check functionality of sorting by title Z-A", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(multipleMockIdeas));
    render(<App />);

    //- Open Sort Dropdown and click button
    const dropdownTrigger = screen.getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
    const alphabeticalReversedButton = screen.getByText("Title Z-A");
    await userEvent.click(alphabeticalReversedButton);
    //-Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = screen.getAllByTestId("idea-card-title");
    //-Extract the text content of each title
    const titleTexts = ideaCardTitles.map(
      (titleElement) => titleElement.textContent
    );
    //-Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map((title) =>
      multipleMockIdeas.find((idea) => idea.title === title)
    );
    //-Check if the ideas are in the correct reverse-sorted order by title
    const reverseSortedIdeas = [...multipleMockIdeas].sort((a, b) =>
      b.title.localeCompare(a.title)
    );

    // Assert
    expect(sortedIdeas).toEqual(reverseSortedIdeas);
    // Tear Up
    localStorage.clear();
  });

  test("check functionality of sorting by date", async () => {
    // Assemble
    localStorage.setItem("IDEA_DATA", JSON.stringify(multipleMockIdeas));
    render(<App />);

    //- Open Sort Dropdown and click button
    const dropdownTrigger = screen.getByRole("sort-dropdown");
    await userEvent.click(dropdownTrigger);
    const dateButton = screen.getByText("Date");
    await userEvent.click(dateButton);
    //- Get all the elements with the test id of "idea-card-title"
    const ideaCardTitles = screen.getAllByTestId("idea-card-title");
    //- Extract the text content of each title
    const titleTexts = ideaCardTitles.map(
      (titleElement) => titleElement.textContent
    );
    //- Map titles to idea objects based on title
    const sortedIdeas = titleTexts.map((title) =>
      multipleMockIdeas.find((idea) => idea.title === title)
    );
    //- Check if the ideas are in the correct sorted order by date
    const sortedByDate = [...multipleMockIdeas].sort((a, b) => {
      const dateA = a.edited || a.created;
      const dateB = b.edited || b.created;
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    // Assert
    expect(sortedIdeas).toEqual(sortedByDate);
    // Tear Down
    localStorage.clear();
  });
});
