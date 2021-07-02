import React, { useState } from "react";
import axios from "axios";

const NewRestaurantForm = () => {
  const [name, setName] = useState("");

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    phone: "",
    cuisine: "",
  });

  const onChange = (name) => {
    return ({ target: { value } }) => {
      setNewRestaurant((prevRestaurant) => ({
        ...prevRestaurant,
        [name]: value,
      }));
    };
  };

  const saveFormData = async () => {
    axios
      .post("/api/restaurants", newRestaurant)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveFormData();
      alert("Your restaurant was successfully submitted!");
      setNewRestaurant({ name: "", address: "", phone: "", cuisine: "" });
      window.location.reload();
    } catch (err) {
      alert(`Restaurant submission failed! ${err.message}`);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name: *
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          data-testid="restaurant-name"
          name="name"
          value={newRestaurant.name}
          onChange={onChange("name")}
          required
        />
        <label htmlFor="address" className="form-label">
          Address: *
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          data-testid="restaurant-address"
          name="address"
          value={newRestaurant.address}
          onChange={onChange("address")}
          required
        />
        <label htmlFor="phone" className="form-label">
          Phone: *
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          data-testid="restaurant-phone"
          name="phone"
          value={newRestaurant.phone}
          maxLength="12"
          onChange={onChange("phone")}
          required
        />
        <label htmlFor="cuisine" className="form-label">
          Cuisine: *
        </label>
        <input
          type="text"
          className="form-control"
          id="cuisine"
          data-testid="restaurant-cuisine"
          name="cuisine"
          value={newRestaurant.cuisine}
          onChange={onChange("cuisine")}
          required
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            !newRestaurant.name ||
            !newRestaurant.address ||
            !newRestaurant.phone ||
            !newRestaurant.cuisine
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewRestaurantForm;
