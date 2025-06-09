import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";

const NotFoundPage = () => {
const navigate = useNavigate();
  const goBackHome = () => {
    navigate("/");
  };
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor: "#f5f5f3",
        backgroundImage: "url('/404error.jpg')",
      }}
    >
      <div
        className="bg-white bg-opacity-75 p-6 rounded-lg max-w-md mx-auto"
        style={{ backgroundColor: "#f5f5f3" }}
      >
        <h1 className="text-6xl font-bold text-black">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-black">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-900 mt-2">
          The page you’re looking for doesn’t exist.
        </p>

        <Button onClick={goBackHome} classBtnName="btn-not-found" />
      </div>
    </div>
  );
};

export default NotFoundPage;