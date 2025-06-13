import "./contact.css";
import EmailForm from "../../components/email/EmailForm";
import useAuthStore from "../../store/useAuthStore";

function Contact() {
  const { currentContact } = useAuthStore();
  return (
    <div className="@container flex flex-col sm:flex-row justify-end items-center mt-10 text-gray-800 ">
      <section className="hero-section @max-sm:w-screen lg:mx-auto  flex flex-col @min-sm:justify-end items-center @min-md:items-start gap-4 basis-[45%]  sm:h-[60vh]  sm:mx-0 ">
        <div className="flex flex-col sm:gap-4 items-center justify-center ml-15">
          <img
            src="../src/assets/images/location2.svg"
            alt="location"
            className="w-10 sm:w-20 ml-6"
          />
          <div>
            <h3 className="lg:text-4xl font-bold"> AdvenTour</h3>
            <h6>Travel & Tours</h6>
          </div>
        </div>
        <h3 className="text-left lg:text-4xl p-4">Let's plan your next trip</h3>
      </section>
      <section className="w-full sm:w-auto sm:gap-4 p-4 sm:p-0 mt-5 mr-5">
        {currentContact &&
          currentContact.map((con) => (
            <div
              key={con._id + "-container"}
              className="flex flex-col gap-2 p-4 rounded-lg shadow-md w-full sm:w-auto justify-center  lg:ml-[25rem] border-2 sm:border-0"
            >
              {console.log("Current Con:", con)}
              <div className="ext-lg font-semibold  flex flex-row items-center justify-between gap-2 inline-flex">
                <strong>Email:</strong> {con.email}
              </div>
              <div className="text-lg font-semibold  flex flex-row items-center justify-between gap-2 inline-flex">
                <strong>Phone:</strong> +{con.phone}
              </div>
              {con.address && (
                <>
                  <div className="text-lg font-semibold  flex flex-row items-center justify-between gap-2 inline-flex">
                    <strong>Address:</strong> {con.address.number}{" "}
                    {con.address.street}
                  </div>
                  <div className="text-lg font-semibold  flex flex-row items-center justify-between gap-2 inline-flex">
                    <strong>City:</strong> {con.address.city}
                  </div>
                  <div className="text-lg font-semibold  flex flex-row items-center justify-between gap-2 inline-flex">
                    <strong> {con.address.zip} </strong> {con.address.country}
                  </div>
                </>
              )}
              <hr />
              <ul className="flex flex-row justify-center items-center gap-1">
                <li key="facebook">
                  <a href="https://www.facebook.com/AdvenTour">Facebook</a>
                </li>
                <li key="instagram">
                  <a href="https://www.instagram.com/AdvenTour">Instagram</a>
                </li>
                <li key="twitter">
                  <a href="https://www.twitter.com/AdvenTour">Twitter</a>
                </li>
                <li key="linkedin">
                  <a href="https://www.linkedin.com/company/AdvenTour">
                    LinkedIn
                  </a>
                </li>
              </ul>
              <p className="">We look forward to hearing from you!</p>
              <div className="flex flex-row gap-2">
                <ul className="flex flex-col items-start">
                  <li>Office Hours:</li>
                  {con.officeHours.map((oh, idx) => (
                    <li key={`${con._id}-${oh.day}-${idx}`}>
                      {oh.day} {oh.start.hour.toString().padStart(2, "0")}:
                      {oh.start.min.toString().padStart(2, "0")} -{" "}
                      {oh.end.hour.toString().padStart(2, "0")}:
                      {oh.end.min.toString().padStart(2, "0")}
                    </li>
                  ))}
                </ul>
                <EmailForm className="contact-form" />
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default Contact;
