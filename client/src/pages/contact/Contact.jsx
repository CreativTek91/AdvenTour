import './contact.css';
import EmailForm from '../../components/email/EmailForm';
import useAuthStore from '../../store/useAuthStore';
function Contact() {
   const { user } = useAuthStore();
  return (
    <div className="flex flex-col justify-center items-center h-screen pt-35 md:pt-0 ">
      <div className="@container @max-sm:text sm:w-3/4 flex flex-col  sm:flex-row justify-center items-center gap-10 @md:gap-0 ">
        <section className="hero-section @max-sm:w-screen   flex flex-col @min-sm:justify-end items-center @min-md:items-start gap-4 basis-[60%]  sm:h-[60vh] ">
          <div className="flex flex-col sm:gap-4 items-center justify-center">
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
          <h3 className="text-left lg:text-4xl p-4">
            Let's plan your next trip
          </h3>
        </section>
        <section className="contact-info flex flex-col  grow-1 gap-1 justify-center items-center">
          <ul className="flex flex-col items-center justify-center ">
            <li>Address: 123 Adventure St, Adventure City, AC 12345</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email:hello@reallegreatsite.com</li>
            <li>Office Hours: Mon-Fri 9am-5pm</li>
          </ul>
          <p>Follow us on social media:</p>
          <ul>
            <li>
              <a href="https://www.facebook.com/AdvenTour">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/AdvenTour">Instagram</a>
            </li>
            <li>
              <a href="https://www.twitter.com/AdvenTour">Twitter</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/AdvenTour">LinkedIn</a>
            </li>
          </ul>
          <p>We look forward to hearing from you!</p>
          <EmailForm className="contact-form" />
          {/* <form className="contact-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <br />
            <button type="submit" className="btnContact">
              Send
            </button>
          </form> */}
          {/* <p>We will get back to you as soon as possible.</p>
          <p>Thank you for your interest in AdvenTour!</p> */}
        </section>
      </div>
    </div>
  );
}

export default Contact