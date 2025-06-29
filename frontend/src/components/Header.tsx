import searchIcon from "../assets/Search.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import AvatarDropdown from "./AvatarDropdown";
import Notifications from "./Notifications";

function Header() {
  const { isAuthenticated } = useUser();
  const onSearch = () => {};

  return (
    <header className="w-full bg-white shadow-md z-10 flex align-middle items-center my-auto py-6 xs:justify-center md:justify-between xs:gap-4 xs:px-1 md:px-28">
      <Link to="..">
        <img
          className="max-w-32 xs:max-w-26 md:max-w-56"
          src={logo}
          alt="logo"
        />
      </Link>

      <Link className="mt-[6px] xs:hidden md:block" to="..">
        Home
      </Link>

      <div className="flex items-center gap-2">
        <Notifications />

        <div className="relative">
          <input
            className="bg-gray-100 border-gray-200 pl-4 p-2 rounded-md xs:w-40"
            type="text"
            placeholder="Search"
            onChange={onSearch}
          />
          <img
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4"
            src={searchIcon}
            alt="search icon"
          />
        </div>
        {isAuthenticated ? (
          <div className="flex gap-2 items-center text-blue-600">
            <AvatarDropdown />
          </div>
        ) : (
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
