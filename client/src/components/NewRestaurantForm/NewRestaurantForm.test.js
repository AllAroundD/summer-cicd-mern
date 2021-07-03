import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewRestaurantForm from "./NewRestaurantForm";

afterEach(cleanup);

describe("NewRestaurantForm", () => {
  it("updates the input value on change", () => {
    const { getByTestId } = render(<NewRestaurantForm />);
    const nameInput = getByTestId("restaurant-name");
    const addressInput = getByTestId("restaurant-address");
    const phoneInput = getByTestId("restaurant-phone");
    const cuisineInput = getByTestId("restaurant-cuisine");
    fireEvent.change(nameInput, { target: { value: "Waffle House" } });
    expect(nameInput.value).toBe("Waffle House");
    fireEvent.change(addressInput, { target: { value: "1212 Yonge Street" } });
    expect(addressInput.value).toBe("1212 Yonge Street");
    fireEvent.change(phoneInput, { target: { value: "888-888-8889" } });
    expect(phoneInput.value).toBe("888-888-8889");
    fireEvent.change(cuisineInput, { target: { value: "Chinese" } });
    expect(cuisineInput.value).toBe("Chinese");
    fireEvent.click(getByTestId("submit"));
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<NewRestaurantForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
