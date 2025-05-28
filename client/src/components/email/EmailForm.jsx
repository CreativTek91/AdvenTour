import axios from "axios";
import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import "./email.css";

export default function EmailForm() {
  const {user} = useAuthStore();
  const [form, setForm] = useState({
    name: user.name,
    from: user.email,
    to: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
const handleChange= (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
       `${import.meta.env.VITE_BACKEND_URL}/email`,
      form
    );
    if (res.status === 200) {
      setSuccess(res.data.message);
     setForm({
      name: user.name,
      to: " ",
      from: user.email,
      subject: "",
      message: "",
    });
    } else {
      alert("Something went wrong. Please try again later.");
    }
  };
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        className="text-black"
        type="text"
        id="name"
        name="name"
        required
        value={form.name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="email">From:</label>
      <input
        className="text-black"
        type="email"
        id="email"
        name="from"
        required
        value={form.from}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="email">To:</label>
      <input
        className="text-black"
        type="email"
        id="email"
        name="to"
        placeholder="hello@reallegreatsite.com"
        required
        value={form.to}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="subject">Subject:</label>
      <input
        className="text-black"
        name="subject"
        id="subject"
        type="text"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="message">Message:</label>
      <textarea
        rows="3"
        id="message"
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        required
      ></textarea>
      <br />
      <button type="submit" className="btnContact">
        Send Email
      </button>
    </form>
  );
}
