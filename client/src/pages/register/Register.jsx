import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { useState } from "react";
import Error from "../../components/errors/Error";
import Success from "../../components/success/Success";
import useAuthStore from "../../store/useAuthStore";

function Register() {
  const navigate = useNavigate();
   const { setUser } = useAuthStore();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/register`,
        register
      );
    
        await setUser(register);
        console.log("success", res.data);
        setSuccess(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      
    } catch (err) {
      console.log("Error", err.response.data.error);
      setError(err.response.data.error);
    }
    finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      setRegister({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mx-auto  my-2 p-0 min-w-8 bg-glass sm:mt-[8rem]">
      {error && <Error error={error + " Try again!"} />}
      {success && <Success success={success} />}
      <h1 className="font-500 text-left text-sm">Sign Up to your account</h1>
      <form
        method="post"
        className="md:space-y-6  sm:p-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-white-900"
          >
            Your name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm  block w-full py-1 px-2"
            placeholder="name"
            onChange={handleChange}
            value={register.name}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white-900"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm  block w-full py-1 px-2"
            placeholder="email"
            onChange={handleChange}
            value={register.email}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white-900"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm  block w-full py-1 px-2"
            placeholder="password"
            onChange={handleChange}
            value={register.password}
          />
        </div>
        <br />
        <button
          type="submit"
          className="text-white bg-[#abc5b677] hover:bg-[#62d49f]  focus:ring-4 
						focus:outline-none focus:ring-[#24292F]/50 
                        font-medium rounded-sm flex p-2 items-center w-full text-center justify-center"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm font-light font-bold ">
        Have an account?{" "}
        <NavLink
          to="/login"
          className="font-medium text-primary-600 hover:underline text-green-400 p-2"
        >
          Sign Up
        </NavLink>
      </p>
    </div>
  );
}

export default Register;
