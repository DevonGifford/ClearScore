import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";

import App from "../App.tsx";

localStorage.clear();

test("should render initial page", async () => {
  const ui = await App();

  render(ui);

  expect(ui).toMatchSnapshot();
});
