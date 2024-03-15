import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

import Footer from "./Footer";

test("Footer contains Project Source Code links with proper attributes", () => {
  render(<Footer />);

  const projectSourceCodeText = screen.getByText("Project Source Code");
  expect(projectSourceCodeText).toBeInTheDocument();

  const projectSourceCodeLink = screen.getByLabelText("Link to source code");
  expect(projectSourceCodeLink).toBeInTheDocument();
  expect(projectSourceCodeLink).toHaveAttribute(
    "href",
    "https://github.com/DevonGifford/ClearScore"
  );
  expect(projectSourceCodeLink).toHaveAttribute("target", "_blank");
});

test("Footer contains Portfolio link with proper attributes", () => {
  render(<Footer />);

  const portfolioLink = screen.getByLabelText(
    "Visit Devon's Portfolio website"
  );
  expect(portfolioLink).toBeInTheDocument();
  expect(portfolioLink).toHaveAttribute(
    "href",
    "https://devongifford.vercel.app/"
  );
  expect(portfolioLink).toHaveAttribute("target", "_blank");
});

test("Footer contains LinkedIn profile link with proper attributes", () => {
  render(<Footer />);

  const linkedinLink = screen.getByLabelText("Visit Devon's LinkedIn profile");
  expect(linkedinLink).toBeInTheDocument();
  expect(linkedinLink).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/dbgifford/"
  );
  expect(linkedinLink).toHaveAttribute("target", "_blank");
});

test("Footer contains GitHub profile links with proper attributes", () => {
  render(<Footer />);

  const githubLink = screen.getByLabelText("Visit Devon's GitHub profile");
  expect(githubLink).toBeInTheDocument();
  expect(githubLink).toHaveAttribute("href", "https://github.com/DevonGifford");
  expect(githubLink).toHaveAttribute("target", "_blank");
});
