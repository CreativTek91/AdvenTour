import { useState } from "react";
import "./admin.css";

import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

function PanelAddContact() {

  const allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday ",
    "Saturday",
  ];
  const [time, setTime] = useState({
    start: 8,
    end: 4,
  });
  const [contact, setContact] = useState({
    email: "",
    phone: 0,
    country: "",
    city: "",
    street: "",
    number: 0,
    zip: 0,
    days: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("contact", contact);
      await axios.post("http://localhost:8834/api/contact", contact);
    } catch (er) {
      console.log("er", er);
    }
  };

  return (
    <form
      className="truncate bg-[white] border-2 flex flex-col justify:center items-between mx-auto w-screen sm:w-sm md:w-md "
      onSubmit={handleSubmit}
    >
      <h3>Contact</h3>
      <hr />
      <section className="flex flex-col justify-center items-center w-auto sm:flex-row p-1">
        <label
          htmlFor="email"
          className="flex flex-col  sm:flex-row sm:basis-1/2 "
        >
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            className="w-full sm:w-32 "
            value={contact.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="phone" className="flex flex-col  sm:flex-row basis-1/2">
          Phone
          <input
            type="number"
            id="phone"
            name="phone"
            className="w-full sm:w-32"
            value={contact.phone}
            onChange={handleChange}
          />
        </label>
      </section>
      <section className="flex flex-col justify-center items-center w-auto sm:flex-row p-1">
        <label
          className="flex flex-col  sm:flex-row basis-1/2 "
          htmlFor="country"
        >
          Country:
          <input
            type="text"
            id="country"
            name="country"
            className="w-full sm:w-32"
            value={contact.country}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col  sm:flex-row basis-1/2" htmlFor="city">
          City:
          <input
            type="text"
            id="city"
            name="city"
            className="w-full sm:w-32 "
            value={contact.city}
            onChange={handleChange}
          />
        </label>
      </section>
      <section className="flex flex-col  w-auto sm:grid sm:grid-cols-4  p-1">
        <div className="flex flex-col  justify-between  sm:col-start-1 sm:col-span-2">
          <label
            className="flex flex-col justify-center items-center sm:grid sm:col-start-1"
            htmlFor="street"
          >
            Street:
            <input
              type="text"
              id="street"
              name="street"
              className="w-[13rem] sm:col-2 sm:ml-4 sm:w-32 "
              value={contact.street}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex flex-col justify-between sm:col-start-3 sm:col-span-2">
          <label
            className="sm:mr-4 flex flex-col justify-center items-center sm:grid sm:col-start-1"
            htmlFor="number"
          >
            Number:
            <input
              type="number"
              id="number"
              name="number"
              className=" sm:w-[2rem] sm:col-start-10"
              value={contact.number}
              onChange={handleChange}
            />
          </label>
          <label
            className="sm:mr-4 flex flex-col justify-center items-center sm:grid sm:col-start-1"
            htmlFor="zip"
          >
            ZIP:
            <input
              type="number"
              name="zip"
              id="zip"
              className="sm:w-[2rem] sm:col-start-10"
              value={contact.zip}
              onChange={handleChange}
            />
          </label>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center w-auto sm:flex-row p-1"></section>
      <br />
      <hr />
      <section className="flex flex-col gap-4 justify-center ">
        {allDays.map((day) => {
          return (
            <div
              key={day}
              className="grid grid-cols-1 justify-center gap-4  md:grid-cols-5 sm:grid-rows-auto"
            >
              {day}
              <label className="" htmlFor="hourStart">
                Start:
                <input
                  type="number"
                  name="hoursStart"
                  id="hoursStart"
                  className="w-[2rem]"
                  value={time.start}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
              <label className="" htmlFor="hourEnd">
                End:
                <input
                  type="number"
                  id="hoursEnd"
                  name="hoursEnd"
                  className="w-[2rem]"
                  value={time.end}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
            </div>
          );
        })}
      </section>

      <button type="submit" className="buttonForm">
        Add
      </button>
    </form>
  );
}

export default PanelAddContact;
