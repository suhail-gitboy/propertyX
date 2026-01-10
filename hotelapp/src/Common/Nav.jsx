import React, { useState } from "react";
import { ContextDatas } from "./ContextWrapped";
import { IoSearchOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { CiHome, CiHeart } from "react-icons/ci";
import { SlEarphonesAlt } from "react-icons/sl";
import { RiMenu3Fill } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";
import AutocompleteTwo from "./Autocomplete";

const Nav = ({
  search,
  Setpage,
  baropen,
  Setbaropen,
  profile,
  homesearch,
}) => {
  const { User, Setloginmodal } = ContextDatas();
  const { FilterDetails } = useSelector((state) => state.Product);

  const [searchpop, Setsearchpop] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = new Date();
  const monthName = monthNames[date.getMonth()];

  const keralaPlaces = [ /* same list as before */];

  return (
    <div className="px-8 py-5 flex justify-between items-center shadow-md">

      {/* LOGO */}
      <h3 className="font-bold text-sm md:text-2xl bg-linear-to-br from-blue-400 via-blue-600 to-yellow-500 text-transparent bg-clip-text">
        Property<span className="bg-linear-to-br from-blue-400 via-yellow-400 to-yellow-700 text-transparent bg-clip-text">X.in</span>
      </h3>

      {/* SEARCH BAR */}
      {search && (
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg relative">
          <p className="text-xs font-bold">{FilterDetails.district || "Location"}</p>
          <p className="hidden md:block text-xs font-bold border-l px-2">
            {monthName}
          </p>
          <p className="text-xs font-bold border-l px-2">
            {FilterDetails.length || 0} Properties
          </p>

          <button
            className="p-2 bg-blue-500 rounded-xl"
            onClick={() => Setsearchpop(true)}
          >
            <IoSearchOutline className="text-white text-xl" />
          </button>

          {searchpop && (
            <AutocompleteTwo
              Setpage={Setpage}
              keralaDistricts={keralaPlaces}
              Setsearchpop={Setsearchpop}
            />
          )}
        </div>
      )}

      {/* DESKTOP ACTIONS */}
      <div className="hidden md:flex items-center space-x-4">

        {/* Always visible */}
        <Link to="/profile/aibot">
          <Tooltip title="AI guidance">
            <SlEarphonesAlt className="text-2xl text-blue-800" />
          </Tooltip>
        </Link>

        <Link to="/profile/wishlists">
          <Tooltip title="Wishlist">
            <CiHeart className="text-2xl text-blue-800" />
          </Tooltip>
        </Link>

        <Link
          to="/profile/aibot"
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
        >
          AI Assistant
        </Link>

        {/* CONDITIONAL SECTION */}
        {!User ? (
          <Button onClick={() => Setloginmodal(true)} text="Login" />
        ) : User.role == "admin" ? (

          <>
            <Link to={"/admin/home"} className="px-4 py-1 bg-blue-950 text-white rounded-md">
              admin
            </Link>


          </>
        ) : <>
          <Link to="/">
            <Tooltip title="Home">
              <CiHome className="text-2xl text-blue-800/60" />
            </Tooltip>
          </Link>

          <Link to="/profile">
            <Tooltip title="Profile">
              <VscAccount className="text-2xl text-blue-800" />
            </Tooltip>
          </Link>
        </>}
      </div>

      {/* MOBILE MENU */}
      {(profile || homesearch) && (
        <div className="md:hidden flex items-center space-x-3">
          {!User ? (
            <Button onClick={() => Setloginmodal(true)} text="Login" />
          ) : User.role == "admin" ? (
            <>
              <Link to={"/admin/home"} className="px-4 py-1 bg-blue-950 text-white rounded-md">
                admin
              </Link>

            </>
          ) : <>
            {profile ? <RiMenu3Fill
              onClick={() => Setbaropen(!baropen)}
              className="text-3xl text-blue-500"
            /> : <Link to="/profile">
              <VscAccount className="text-2xl text-blue-800" />
            </Link>}</>}
        </div>
      )}
    </div>
  );
};

export default Nav;
