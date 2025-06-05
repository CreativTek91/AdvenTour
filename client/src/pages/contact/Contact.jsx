// import './contact.css';
// import EmailForm from '../../components/email/EmailForm';
// import useAuthStore from '../../store/useAuthStore';
// function Contact() {
//    const { user } = useAuthStore();
//   return (
//     <div className="flex flex-col justify-center items-center h-screen pt-35 md:pt-0 ">
//       <div className="@container @max-sm:text sm:w-3/4 flex flex-col  sm:flex-row justify-center items-center gap-10 @md:gap-0 ">
//         <section className="hero-section @max-sm:w-screen   flex flex-col @min-sm:justify-end items-center @min-md:items-start gap-4 basis-[60%]  sm:h-[60vh] ">
//           <div className="flex flex-col sm:gap-4 items-center justify-center">
//             <img
//               src="../src/assets/images/location2.svg"
//               alt="location"
//               className="w-10 sm:w-20"
//             />
//             <div>
//               <h3 className="lg:text-4xl font-bold"> AdvenTour</h3>
//               <h6>Travel & Tours</h6>
//             </div>
//           </div>
//           <h3 className="text-left lg:text-4xl p-4">
//             Let's plan your next trip
//           </h3>
//         </section>
//         <section className="contact-info flex flex-col  grow-1 gap-1 justify-center items-center">
//           <ul className="flex flex-col items-center justify-center ">
//             <li>Address: 123 Adventure St, Adventure City, AC 12345</li>
//             <li>Phone: (123) 456-7890</li>
//             <li>Email:hello@reallegreatsite.com</li>
//             <li>Office Hours: Mon-Fri 9am-5pm</li>
//           </ul>
//           <p>Follow us on social media:</p>
//           <ul>
//             <li>
//               <a href="https://www.facebook.com/AdvenTour">Facebook</a>
//             </li>
//             <li>
//               <a href="https://www.instagram.com/AdvenTour">Instagram</a>
//             </li>
//             <li>
//               <a href="https://www.twitter.com/AdvenTour">Twitter</a>
//             </li>
//             <li>
//               <a href="https://www.linkedin.com/company/AdvenTour">LinkedIn</a>
//             </li>
//           </ul>
//           <p>We look forward to hearing from you!</p>
//           <EmailForm className="contact-form" />
//           {/* <form className="contact-form">
//             <label htmlFor="name">Name:</label>
//             <input type="text" id="name" name="name" required />
//             <br />
//             <label htmlFor="email">Email:</label>
//             <input type="email" id="email" name="email" required />
//             <br />
//             <label htmlFor="message">Message:</label>
//             <textarea id="message" name="message" required></textarea>
//             <br />
//             <button type="submit" className="btnContact">
//               Send
//             </button>
//           </form> */}
//           {/* <p>We will get back to you as soon as possible.</p>
//           <p>Thank you for your interest in AdvenTour!</p> */}
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Contact



import "./contact.css";
import EmailForm from "../../components/email/EmailForm";
import useAuthStore from "../../store/useAuthStore";

function Contact() {
  const { currentContact } = useAuthStore();

  return (
    <div className="@container flex flex-col sm:flex-row justify-center items-center ">
      <section className="hero-section @max-sm:w-screen   flex flex-col @min-sm:justify-end items-center @min-md:items-start gap-4 basis-[45%]  sm:h-[60vh]  sm:mx-0 ">
        <div className="flex flex-col sm:gap-4 items-center justify-center ml-5">
          <img
            src="../src/assets/images/location2.svg"
            alt="location"
            className="w-10 sm:w-20"
          />
          <div>
            <h3 className="lg:text-4xl font-bold"> AdvenTour</h3>
            <h6>Travel & Tours</h6>
          </div>
        </div>
        <h3 className="text-left lg:text-4xl p-4">Let's plan your next trip</h3>
      </section>
      <section className="w-full sm:w-auto sm:gap-4 p-4 sm:p-0">
        {currentContact &&
          currentContact.map((con) => (
            <div
              key={con._id + "-container"}
              className="flex flex-col gap-2 p-4 rounded-lg shadow-md w-full sm:w-auto justify-center  lg:ml-[25rem] border-2 sm:border-0"
            >
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
                  <li>
                    Office Hours:
                  </li>
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
