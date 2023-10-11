import { render, screen, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

// Mocking the component as it is giving act warning
// jest.mock("../tree/FileIcon", () => {
//   //content of FileIcon.js
//   return () => {
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "A js library",
    owner: { login: "facebook" },
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />{" "}
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to the github homepage for this respository", async () => {
  const { repository } = renderComponent();

  // last resort to stop act error
  // await act(async () => {
  //   await pause();
  // });

  // to resolve act warning
  await screen.findByRole("img", { name: "Javascript" });

  const link = screen.getByRole("link", {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a fileicon with the appropriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: "Javascript" });

  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponent();

  // to resolve act warning
  await screen.findByRole("img", { name: "Javascript" });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));
