import { useEffect, useRef, useState } from "react";
import "./admin.css";
import useAuthStore from "../../store/useAuthStore";
import $api from "../../http/api";
import Error from "../../components/errors/Error";
import Success from "../../components/success/Success";
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
  
  const [success, setSuccess] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const { currentContact, fetchCurrentContact ,setCurrentContact} = useAuthStore();
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
    if(currentContact && !refresh) {
      currentContact?.map((con) => {
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
          officeHours: officeHours,
        });
        
      });
    }
    if (refresh) {
      setOfficeHours(
        allDays.map((day) => ({
          day,
          start: { startHour: defaultHours.startHour, startMin: defaultHours.startMin },
          end: { endHour: defaultHours.endHour, endMin: defaultHours.endMin },
        }))
      );
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
            start: {
              hour: defaultHours.startHour,
              min: defaultHours.startMin,
            },
            end: { hour: defaultHours.endHour, min: defaultHours.endMin },
          },
        ],
      });
      
    }
   
    setRefresh(!refresh);
  };
  console.log(" Contact:", contact._id);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let url =
      e.target.id === "btnAdd"
        ? `/contact`
        : contact ?  `/contact/${contact._id}`
        : `/contact/${currentContact._id}`;

    const officeHourEntries = officeHours.map(({ day, start, end }) => ({
      day,
      start: { hour: start.startHour, min: start.startMin },
      end: { hour: end.endHour, min: end.endMin },
    }));
    const dataToSend = { };
  
    if (contact.email) dataToSend.email = contact.email;
    if (contact.phone) dataToSend.phone = contact.phone;
    if (contact.country) dataToSend.country = contact.country;
    if (contact.city) dataToSend.city = contact.city;
    if (contact.street) dataToSend.street = contact.street;
    if (contact.number) dataToSend.number = contact.number;
    if (contact.zip) dataToSend.zip = contact.zip;
    if (officeHourEntries.length > 0) dataToSend.officeHours = officeHourEntries;

    // const fullContact = {
     
    //   // ...contact,
    //   // officeHours: officeHourEntries,
    // };
    try {
      switch (e.target.id) {
        case "btnAdd": {
        const res=  await $api.post(url, dataToSend);
          console.log("Adding contact", dataToSend);
          console.log("Response from adding contact:", res.data.newContact);
          if( res.data.newContact) {
            setSuccess("Contact added successfully");
          }
          setCurrentContact((res.data.newContact));
          break;
        }
        case "btnUpdate": {
          console.log("Current url update:", url);
          console.log("Updating contact", dataToSend);
          dataToSend.id = contact._id; // Ensure _id is included for update
        const res =  await $api.put(url, dataToSend);
          console.log("Response from updating contact:", res.data.updatedContact);
          if( res.data.updatedContact) {
            setSuccess(res.data.message || "Contact updated successfully");
          }
          setCurrentContact((res.data.updatedContact));
          break;
        }
        case "btnUpdatePart": {
          console.log("Updating part of contact", dataToSend);
        const res=  await $api.patch(url, dataToSend);
          console.log("Response from updating part of contact:", res.data.updatedContact);
          if( res.data.updatedContact) {
            setSuccess(res.data.message || "Contact updated successfully");
          }
          setCurrentContact((res.data.updatedContact));
          break;
        }
        case "btnDelete": {
        const res=  await $api.delete(url);
          console.log("Deleting contact", dataToSend);
          console.log("Response from deleting contact:", res.data.deletedContact);
          if (res.data.deletedContact) {
            setSuccess(res.data.message || "Contact deleted successfully");
          }
          setCurrentContact(null);
          // Reset contact state to initial values
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
                start: {
                  hour: defaultHours.startHour,
                  min: defaultHours.startMin,
                },
                end: { hour: defaultHours.endHour, min: defaultHours.endMin },
              },
            ],
          });
          break;
        }
        default:
          console.error("Unrecognized button ID");
          return;
      }
    } catch (er) {
      console.error("Fehler:", er);
    }
  };
  
  return (
    <div>
      {success && <Success success={success} />}
      {error && <Error error={error} />}
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
        </section>
      </form>
      {currentContact && (
        <button
          className={`buttonForm ${refresh ? " resetButton "  : ""}`}
          onClick={handleShowOldContact}
        >
          {refresh ? "refresh" : "Show current contact"}
        </button>
      )}
    </div>
  );
}

export default PanelAddContact;