import { screen, render } from "@testing-library/react";

import RepositoriesSummary from "./RepositoriesSummary";

test("display information about the repository", () => {
  const repository = {
    stargazers_count: 4,
    open_issues: 10,
    forks: 200,
    language: "Javascript",
  };

  render(<RepositoriesSummary repository={repository} />);

  for (const key in repository) {
    const element = screen.getByText(new RegExp(repository[key]));

    expect(element).toBeInTheDocument();
  }
});
