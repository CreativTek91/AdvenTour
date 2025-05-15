import './admin.css'

function PanelAddContact() {
  return (
    <form className="truncate border-3 flex flex-col mx-auto w-full sm:w-md m-4">
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
            placeholder="email"
            className="w-full md:w-32 lg:w-38"
          />
        </label>
        <label htmlFor="phone" className="flex flex-col  sm:flex-row basis-1/2">
          Phone
          <input type="number" id="phone" className="w-full md:w-32 lg:w-38" />
        </label>
      </section>
      <section className="flex flex-col justify-center items-center w-auto sm:flex-row p-1">
        <label
          className="flex flex-col  sm:flex-row basis-1/2 "
          htmlFor="country"
        >
          Country:
          <input type="text" id="country" className="w-full md:w-32 lg:w-38" />
        </label>
        <label className="flex flex-col  sm:flex-row basis-1/2" htmlFor="city">
          City:
          <input type="text" id="city" className="w-full md:w-32 lg:w-38" />
        </label>
      </section>
      <section className="flex flex-col justify-center items-center w-auto sm:flex-row p-1">
        <label
          className="flex flex-col  sm:flex-row basis-1/2"
          htmlFor="street"
        >
          Street:
          <input type="text" id="street" className="w-full md:w-32 lg:w-38" />
        </label>
        <label
          className="flex flex-col  sm:flex-row basis-1/2"
          htmlFor="number"
        >
          Number:
          <input type="number" id="number" className="w-full md:w-32 lg:w-38" />
        </label>
      </section>
      <section className="flex flex-col justify-center items-center w-auto sm:flex-row p-1">
        <label
          className="flex flex-col  sm:flex-row sm:basis-1/2 "
          htmlFor="zip"
        >
          ZIP:
          <input type="number" id="zip" className="w-full md:w-32 lg:w-38 " />
        </label>
        <select
          name="day"
          id="day"
          className="flex flex-col  sm:flex-row basis-1/2 "
        >
          <option value="">Day</option>
          <option value="Monday">Monday</option>
          <option value="">Tuesday</option>
          <option value="">Wednesday</option>
          <option value="">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </section>
      <br />
      <hr />
      <section className="flex flex-col justify-center items-center w-auto sm:flex-row p-1">
        <label
          className="flex flex-col  sm:flex-row basis-1/2 "
          htmlFor="hourStart"
        >
          HoursStart:
          <input
            type="number"
            id="hoursStart"
            className="w-fll md:w-32 lg:w-38"
          />
        </label>
        <label
          className="flex flex-col  sm:flex-row basis-1/2"
          htmlFor="hourEnd"
        >
          HoursEnd:
          <input
            type="number"
            id="hoursEnd"
            className="w-full md:w-32 lg:w-38"
          />
        </label>
      </section>
      <button>Add</button>
    </form>
  );
}

export default PanelAddContact
