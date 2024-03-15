import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";

import App from "../App.tsx";

test("single demo snapshot test - renders app in default state", async () => {
  localStorage.clear();
  const ui = render(<App />);
  expect(ui).toMatchSnapshot();
});
