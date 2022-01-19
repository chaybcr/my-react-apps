import Async from "./Async";
import { render, screen } from "@testing-library/react";

describe("Async Component", () => {
  test("renders posts if request succeeds", async () => {
    // mock function
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json:async ()=> [{id:'p1',title:'first post'}]
    });

    render(<Async />);

    //https://www.w3.org/TR/html-aria/#docconformance

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
