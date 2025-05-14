import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Error from "../../components/errors/Error";
import Success from "../../components/success/Success";
import { useNavigate } from "react-router-dom";
import "./login.css";
import useAuthStore from "../../store/useAuthStore";
import { use } from "react";
const LoginPage = () => {
	const navigate = useNavigate();
  const {fetchUser}=useAuthStore();
	  const [login, setLogin] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLogin((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          "http://localhost:8834/api/login",
          login
        );
        setSuccess(res.data.message);
       await fetchUser();
       navigate("/");
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setTimeout(() => {
          setError(null);
          setSuccess(null);
        }, 3000);
        setLogin({
          email: "",
          password: "",
        });
      }
    };
	return (
    <div className="flex flex-col items-center justify-center mx-auto lg:py-0 bg-glass my-10  min-w-8">
      {error && <Error error={error + " Try again!"} />}
      {success && <Success success={success} />}
      <h1 className="text-sm font-500  md:text-2xl ">Sign in your account</h1>
      <form
        method="post"
        className="space-y-2 justify-center items-center flex flex-col p-2 max-w-screen sm:p-4"
        onSubmit={handleSubmit}
      >
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md px-0
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="email"
            onChange={handleChange}
            value={login.email}
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
            className="bg-gray-50 px-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="password"
            onChange={handleChange}
            value={login.password}
          />
        </div>
        <br />
        <button
          type="submit"
          className="text-white bg-[#abc5b677] hover:bg-[#62d49f]  focus:ring-4 
						focus:outline-none focus:ring-[#24292F]/50 
                        font-medium rounded-lg flex gap-2 p-2 items-center w-full text-center justify-center"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm font-light font-bold p-2 ">
        Do not have an account?{" "}
        <NavLink
          to="/register"
          className="font-medium text-primary-600 hover:underline text-green-400 p-2"
        >
          Sign Up
        </NavLink>
      </p>
    </div>
  );
};
export default LoginPage;