import Navbar from "../navbar/Navbar";
import "./header.css";
function Header() {
  return (
    <header className="flex flex-col bg-gray-600 p-4 justify-between items-center w-full main-header sm:flex-row">
      <a href="/">
        <img
          src="../../src/assets/images/BG1.png"
          alt="logo"
          className="size-10 logo"
        />
      </a>
      <Navbar />
    </header>
  );
}

export default Header;
