import { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";



const defaultHours = {
  startHour: 8,
  startMin: 0,
  endHour: 16,
  endMin: 0,
};

const allDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday ",
  "Saturday",
];

function PanelAddContact() {
  const { currentContact, fetchCurrentContact } = useAuthStore();
  const [officeHours, setOfficeHours] = useState(
    allDays.map((day) => ({
      day,
      start: { startHour: 8, startMin: 0 },
      end: { endHour: 16, endMin: 0 },
    }))
  );
  const [contact, setContact] = useState({
    _id: "",
    email: "",
    phone: 0,
    country: "",
    city: "",
    street: "",
    number: 0,
    zip: 0,
    officeHours: [
      {
        day: "",
        start: { hour: officeHours.startHour, min: officeHours.startMin },
        end: { hour: officeHours.endHour, min: officeHours.endMin },
      },
    ],
  });
  useEffect(() => {
       fetchCurrentContact();
  }, [fetchCurrentContact]);
 const handleShowOldContact = (e) => {
  e.preventDefault();
    if (currentContact) {
   
currentContact.map((con) => {
  setOfficeHours(
    con.officeHours.map(({ day, start, end }) => ({
      day,
      start: { startHour: start.hour, startMin: start.min },
      end: { endHour: end.hour, endMin: end.min },
    }))
  );
  setContact({
    _id: con._id,
    email: con.email,
    phone: con.phone,
    country: con.address.country,
    city: con.address.city,
    street: con.address.street,
    number: con.address.number,
    zip: con.address.zip,
    officeHours:officeHours,
  });
})} }
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url= e.target.id === "btnAdd" ?
      `${import.meta.env.VITE_BACKEND_URL}/contact` :
      `${import.meta.env.VITE_BACKEND_URL}/contact/${contact._id}`;
    
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
      switch (e.target.id) {
        case "btnAdd":{
          await axios.post(url, fullContact);
          break;
        }
        case "btnUpdate": {
          await axios.put(url,fullContact);
          break;
        }
        case "btnUpdatePart": {
          console.log("Updating part of contact", fullContact);
          await axios.patch(url, fullContact);
          break;
        }
        case "btnDelete": {
          await axios.delete(url);
          setContact({
            _id: "",
            email: "",
            phone: 0,
            country: "",  
            city: "",
            street: "",
            number: 0,
            zip: 0,
            officeHours: [
              {
                day: "",
                start: { hour: defaultHours.startHour, min: defaultHours.startMin },
                end: { hour: defaultHours.endHour, min: defaultHours.endMin },
              },
            ],
          });
          break;
        }
        default:
          console.error("Unrecognized button ID");
          return;
    } }catch (er) {
      console.error("Fehler:", er);
    }
  };
  // const handleSubmit2 = async (e) => {
  //   e.preventDefault();
  //   const officeHourEntries = officeHours.map(({ day, start, end }) => ({
  //     day,
  //     start: { hour: start.startHour, min: start.startMin },
  //     end: { hour: end.endHour, min: end.endMin },
  //   }));
  //   const fullContact = {
  //     ...contact,
  //     officeHours: officeHourEntries,
  //   };

  //   try {
  //     await axios.put(
  //       `${import.meta.env.VITE_BACKEND_URL}/contact/${contact._id}`,
  //       fullContact
  //     );
     
  //   } catch (er) {
  //     console.error("Fehler:", er);
  //   }
  // };
  return (
    <div>
      <form
        className="truncate bg-[white] border-2 flex flex-col justify:center items-between mx-auto overflow-auto w-fit my-4 p-4 "
        id="form"
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
              placeholder="Email"
              className="w-full sm:w-32 "
              value={contact.email}
              onChange={handleChange}
            />
          </label>
          <label
            htmlFor="phone"
            className="flex flex-col  sm:flex-row basis-1/2"
          >
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
          <label
            className="flex flex-col  sm:flex-row basis-1/2"
            htmlFor="city"
          >
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
            <div key={entry.day} className="flex items-center gap-4 flex-wrap">
              <span className="w-24 font-semibold">{entry.day}</span>
              <label>
                Start:
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={entry.start.startHour}
                  onChange={(e) => {
                    const updated = [...officeHours];
                    updated[index].start.startHour = e.target.value;
                    setOfficeHours(updated);
                  }}
                  className="w-12 mx-1"
                />
                :
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={entry.start.startMin}
                  onChange={(e) => {
                    const updated = [...officeHours];
                    updated[index].start.startMin = e.target.value;
                    setOfficeHours(updated);
                  }}
                  className="w-12 mx-1"
                />
              </label>
              <label>
                End:
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={entry.end.endHour}
                  onChange={(e) => {
                    const updated = [...officeHours];
                    updated[index].end.endHour = e.target.value;
                    setOfficeHours(updated);
                  }}
                  className="w-12 mx-1"
                />
                :
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={entry.end.endMin}
                  onChange={(e) => {
                    const updated = [...officeHours];
                    updated[index].end.endMin = e.target.value;
                    setOfficeHours(updated);
                  }}
                  className="w-12 mx-1"
                />
              </label>
            </div>
          ))}
        </section>
        <section className="flex flex-col md:flex-row gap-4 justify-between items-center p-2">
          <button
            type="submit"
            id="btnAdd"
            className="buttonForm"
            onClick={handleSubmit}
          >
            Add
          </button>

          <button
            type="submit"
            id="btnUpdate"
            className="buttonForm"
            onClick={handleSubmit}
          >
            Update
          </button>
          <button
            type="submit"
            id="btnUpdatePart"
            className="buttonForm"
            onClick={handleSubmit}
          >
            Update Part
          </button>
          <button
            type="submit"
            id="btnDelete"
            className="buttonForm"
            onClick={handleSubmit}
          >
            Delete
          </button>
          <button
            type="submit"
            className="buttonForm"
            onClick={handleShowOldContact}
          >
            Show Old Contact
          </button>
        </section>
      </form>
    </div>
  );
}

export default PanelAddContact;
