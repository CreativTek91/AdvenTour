import { useState } from "react";
import "./admin.css";
import MySelect from "../../components/select/MySelect";
import axios from "axios";


function PanelAddContact() {
  const defaultHours = {
    startHour: 8,
    startMin: 0,
    endHour: 16,
    endMin: 0,
  };
const [day, setDay] = useState("");
  const allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday ",
    "Saturday",
  ];
  const [officeHours, setOfficeHours] = useState(
    allDays.map((day) => ({
      day,
      start: { ...defaultHours },
      end: { ...defaultHours },
    }))
  );
  const [contact, setContact] = useState({
    email: "",
    phone: 0,
    country: "",
    city: "",
    street: "",
    number: 0,
    zip: 0,
    officeHours: [{
      day: "",
      start: { hour: officeHours.startHour, min: officeHours.startMin },
      end: { hour: officeHours.endHour, min: officeHours.endMin },
    }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const officeHourEntries = officeHours.map(({ day, start, end }) => ({
      day,
      start: { hour: start.startHour, min: start.startMin },
      end: { hour: end.endHour, min: end.endMin },
    }));

    const fullContact = {
      ...contact,
      officeHours: officeHourEntries,
    };

    try {
      console.log("contact", fullContact);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/contact`,
        fullContact
      );
    } catch (er) {
      console.log("er", er);
    }
  };
  return (
    <form
      className="truncate bg-[white] border-2 flex flex-col justify:center items-between mx-auto overflow-auto w-fit my-4 p-4 "
      onSubmit={handleSubmit}
    >
      <h3>Contact</h3>
      <hr />
      <section className="sec-1 flex flex-col justify-center items-center w-auto sm:flex-row p-1">
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
      <section className="sec-2 flex flex-col justify-center items-center w-auto sm:flex-row p-1">
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
      <section className="sec-3 flex flex-col  w-auto sm:grid sm:grid-cols-4  p-1">
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
        <div className="flex justify-between sm:col-start-3 sm:col-span-2">
          <label
            className="sm:mr-4 flex flex-col justify-center items-center sm:grid sm:col-start-1"
            htmlFor="number"
          >
            Number:
            <input
              type="number"
              id="number"
              name="number"
              className="sm:col-start-10"
              value={contact.number}
              onChange={handleChange}
            />
          </label>
          <label
            className="sm:mr-4 flex  justify-center items-center sm:grid sm:col-start-1"
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

      <br />
      <hr />
      <section className="flex flex-col gap-4">
        {officeHours.map((entry, index) => (
          <div key={entry.day} className="flex items-center gap-2">
            <span className="w-20">{entry.day}</span>
            <label>
              Start:
              <input
                type="number"
                value={entry.start.startHour}
                onChange={(e) => {
                  const updated = [...officeHours];
                  updated[index].start.startHour = parseInt(e.target.value, 10);
                  setOfficeHours(updated);
                }}
                className="w-12 mx-1"
              />
              h
              <input
                type="number"
                value={entry.start.startMin}
                onChange={(e) => {
                  const updated = [...officeHours];
                  updated[index].start.startMin = parseInt(e.target.value, 10);
                  setOfficeHours(updated);
                }}
                className="w-12 mx-1"
              />
              m
            </label>
            <label>
              End:
              <input
                type="number"
                value={entry.end.endHour}
                onChange={(e) => {
                  const updated = [...officeHours];
                  updated[index].end.endHour = parseInt(e.target.value, 10);
                  setOfficeHours(updated);
                }}
                className="w-12 mx-1"
              />
              h
              <input
                type="number"
                value={entry.end.endMin}
                onChange={(e) => {
                  const updated = [...officeHours];
                  updated[index].end.endMin = parseInt(e.target.value, 10);
                  setOfficeHours(updated);
                }}
                className="w-12 mx-1"
              />
              m
            </label>
          </div>
        ))}
      </section>
      {/* <section className="sec-4 flex flex-col md:flex-row  md:flex-wrap gap-4 justify-between items-center  sm:w-full p-2">
        <label className="" htmlFor="hourStart">
          Start:
          <input
            type="number"
            name="hoursStart"
            id="hoursStartHour"
            className="w-[2rem]"
            value={officeHours.startHour}
            onChange={(e) =>
              setOfficeHours((prev) => ({
                ...prev,
                ...prev.start,
                startHour: e.target.value,
              }))
            }
          />
          hour
          <input
            type="number"
            name="hoursStart"
            id="hoursStartMin"
            className="w-[2rem]"
            value={officeHours.startMin}
            onChange={(e) =>
              setOfficeHours((prev) => ({
                ...prev,
                ...prev.start,
                startMin: e.target.value,
              }))
            }
          />
          min
        </label>
        <label htmlFor="hourEnd">
          End:
          <input
            type="number"
            id="hoursEndHour"
            name="hoursEnd"
            className="w-[2rem]"
            value={officeHours.endHour}
            onChange={(e) =>
              setOfficeHours((prev) => ({
                ...prev,
                ...prev.end,
                endHour: e.target.value,
              }))
            }
          />
          hour
        </label>
        <input
          type="number"
          name="hoursEnd"
          id="hoursEndMin"
          className="w-[2rem]"
          value={officeHours.endMin}
          onChange={(e) =>
            setOfficeHours((prev) => ({
              ...prev,
              ...prev.end,
              endMin: e.target.value,
            }))
          }
        />
        min
        <MySelect
          value={day}
          setValue={setDay}
          options={allDays}
          setIsMultiple={{}}
          isMultiple={false}
        ></MySelect>
        <button onClick={handleClick}>Save</button>
      </section> */}

      <button type="submit" className="buttonForm">
        Add
      </button>
    </form>
  );
}

export default PanelAddContact;
