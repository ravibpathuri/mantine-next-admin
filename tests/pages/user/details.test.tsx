import { render, screen, waitFor } from "@testing-library/react";
import Details from "../../../src/pages/user/[userName]/details";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      query: { userid: "123" },
    };
  },
}));

describe("<Details /> component", () => {
  it("should  *SHOW* error messages on form has *IN-VALID* data", async () => {
    render(<Details />);

    const email = screen.getByRole("textbox", { name: "User Name" });
    const btn = screen.getByRole("button", { name: /submit/i });
    const user = userEvent.setup();
    await user.type(email, "R");

    await user.click(btn);

    expect(email).toBeInTheDocument();
    expect(screen.getByText("Please accect terms")).toBeInTheDocument();
    expect(screen.getByText("Invalid User Name")).toBeInTheDocument();
    expect(
      screen.getByText("First name must have at least 2 letters")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Last name must have at least 2 letters")
    ).toBeInTheDocument();
  });

  it("should clear error messages on reset button click", async () => {
    render(<Details />);
    const btn = screen.getByRole("button", { name: /submit/i });
    const resetBtn = screen.getByRole("button", { name: /Reset/i });
    const user = userEvent.setup();

    // should show errors
    await user.click(btn);
    expect(screen.getByText("Please accect terms")).toBeInTheDocument();
    expect(screen.getByText("Invalid User Name")).toBeInTheDocument();
    expect(
      screen.getByText("First name must have at least 2 letters")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Last name must have at least 2 letters")
    ).toBeInTheDocument();

    // should clear errors
    await user.click(resetBtn);
    expect(screen.queryByText("Please accect terms")).toBeNull();
    expect(screen.queryByText("Invalid User Name")).toBeNull();
    expect(
      screen.queryByText("First name must have at least 2 letters")
    ).toBeNull();
    expect(
      screen.queryByText("Last name must have at least 2 letters")
    ).toBeNull();
  });

  it("should *NOT* show error messages on form has *VALID* data", async () => {
    // arrange
    const callbk = jest.fn();
    render(<Details onSubmit={callbk} />);

    const userName = screen.getByRole("textbox", { name: "User Name" });
    const firstName = screen.getByRole("textbox", { name: "First Name" });
    const lastName = screen.getByRole("textbox", { name: "Last Name" });
    const terms = screen.getByRole("checkbox", {
      name: "I agree to sell my privacy",
    });
    const btn = screen.getByRole("button", { name: /submit/i });
    const user = userEvent.setup();

    // act
    await user.type(userName, "ravibpathuri");
    await user.type(firstName, "Ravi");
    await user.type(lastName, "Paturi");
    await user.click(terms);

    await user.click(btn);

    // assert
    expect(callbk).toBeCalledTimes(1);
  });
});
