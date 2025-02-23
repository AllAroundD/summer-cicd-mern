import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewRestaurantForm from "./NewRestaurantForm";

afterEach(cleanup);

describe("NewRestaurantForm", () => {
  it("updates the input value on change", () => {
    const { getByTestId, getByText } = render(<NewRestaurantForm />);
    const nameInput = getByTestId("restaurant-name");
    const addressInput = getByTestId("restaurant-address");
    const phoneInput = getByTestId("restaurant-phone");
    const cuisineInput = getByTestId("restaurant-cuisine");

    // const message = getByTestId("status");

    // window.alert = jest.fn();

    fireEvent.change(nameInput, { target: { value: "Waffle House" } });
    expect(nameInput.value).toBe("Waffle House");
    fireEvent.change(addressInput, { target: { value: "1212 Yonge Street" } });
    expect(addressInput.value).toBe("1212 Yonge Street");
    fireEvent.change(phoneInput, { target: { value: "888-888-8889" } });
    expect(phoneInput.value).toBe("888-888-8889");
    fireEvent.change(cuisineInput, { target: { value: "Chinese" } });
    expect(cuisineInput.value).toBe("Chinese");
    fireEvent.click(getByTestId("submit"));
    // console.log(message.innerText);
    // expect(message.innerText).toBe(
    //   "Your restaurant was successfully submitted!"
    // );

    // expect(window.alert).toHaveBeenCalledWith(
    //   "Your restaurant was successfully submitted!"
    // );

    // TODO: Check for cleared out values
    // expect(nameInput.value).toBe("");
    // expect(addressInput.value).toBe("");
    // expect(phoneInput.value).toBe("");
    // expect(cuisineInput.value).toBe("");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<NewRestaurantForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
