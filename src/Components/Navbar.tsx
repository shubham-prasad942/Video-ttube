import { useDispatch } from "react-redux";
import { images } from "/src/assets/images";
import { showMenu } from "/src/redux/Features/menuSlice";
import { useState } from "react";
import { addQuery } from "/src/redux/Features/searchSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [query, upadateQuery] = useState("");
  const dispatch = useDispatch();
  const menuShow = () => {
    dispatch(showMenu());
  };
  const changeQuery = (val: string) => {
    upadateQuery(val);
    dispatch(addQuery(val));
  };
  const handleSearch = async () => {
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
  };
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white  gap-5">
      <div className=" items-center gap-5 flex">
        <img
          onClick={menuShow}
          src={images.menu}
          alt="menu"
          className="h-4.5 cursor-pointer"
        />
        <img
          src={images.logo}
          alt="logo"
          className="w-30 h-auto hidden sm:flex"
        />
      </div>

      <div className="flex-1 mx-4 relative">
        <input
          value={query}
          onChange={(e) => {
            changeQuery(e.target.value);
          }}
          type="text"
          placeholder="Search"
          className="w-full px-3 py-1 sm:1.5 border-gray-400 border-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
        />
        <img
          onClick={handleSearch}
          className="absolute right-2.5 bottom-1.5 cursor-pointer"
          src={images.search}
        />
      </div>

      <div className="flex items-center gap-3">
        <img
          src={images.upload}
          alt="upload"
          className="w-8 h-8 cursor-pointer hidden sm:flex "
        />
        <img
          src={images.more}
          alt="more"
          className="w-6 h-6 cursor-pointer hidden sm:flex "
        />
        <img
          src={images.notification}
          alt="notification"
          className="w-6 h-6 cursor-pointer hidden sm:flex "
        />
        <img
          src={images.user_profile}
          alt="profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
