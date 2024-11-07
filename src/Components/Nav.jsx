import PinLogo from "/pin-logo.png";
import {HiSearch} from "react-icons/hi";
import {FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div className="w-full h-16 bg-white px-4 py-6 flex border-b-2 gap-5 items-center justify-center ">
      <img
        src={PinLogo}
        alt="Pinterest Logo"
        className="w-12 h-12 bg-white rounded-full p-1 cursor-pointer"
      />

      <button className="font-semibold transition-all hover:bg-red-600 rounded-full hover:text-white px-4 py-2">
        <Link to={"/"}>Home</Link>
      </button>
      <button className="font-semibold transition-all hover:bg-red-600 rounded-full hover:text-white px-4 py-2">
        Create
      </button>
      <div className="w-3/4 bg-gray-200 rounded-full flex gap-3 justify-center items-center px-4 py-2">
        <HiSearch size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full focus:outline-none bg-gray-200 placeholder:text-gray-800"
        />
      </div>
      <div className="cursor-pointer">
        <FaUserCircle size={30} />
      </div>
    </div>
  );
}

export default Nav;
