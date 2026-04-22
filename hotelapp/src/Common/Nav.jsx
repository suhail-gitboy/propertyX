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
    <>
      <div className={`px-3 z-40  md:px-8 py-2 md:py-5 flex flex-col ${search ? "bg-gray-200" : "bg-white/15"} rounded-3xl m-2 md:m-10 from-neutral-200 to-neutral-300  shadow-md`}>


        <div className="flex justify-between items-center w-full">

          <h3 className={`font-bold text-sm md:text-2xl 
  bg-gradient-to-br ${search ? "from-gray-500 via-gray-700 to-gray-700" : "from-gray-200 via-gray-300 to-gray-700"}
  text-transparent bg-clip-text`}>
            Property
            <span className="bg-gradient-to-br from-violet-400 via-violet-500 to-violet-700 text-transparent bg-clip-text">
              X.in
            </span>
          </h3>



          {/* SEARCH BAR */}
          <div className="md:block hidden">
            {search && (
              <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg relative">
                <p className="text-xs font-bold">{FilterDetails?.city.length < 18 && FilterDetails.city || "Location"}</p>
                <p className="hidden md:block text-xs font-bold border-l px-2">
                  {monthName}
                </p>
                <p className="text-xs font-bold border-l px-2">
                  {FilterDetails.length || 0} Properties
                </p>

                <button
                  className="p-2 bg-black-500 rounded-xl"
                  onClick={() => Setsearchpop(true)}
                >
                  <IoSearchOutline className="text-black text-xl" />
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

          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Always visible */}
            {/* <Link to="/profile/aibot">
          <Tooltip title="AI guidance">
            <SlEarphonesAlt className="text-2xl text-black" />
          </Tooltip>
        </Link> */}

            <Link to="/profile/wishlists">
              <Tooltip title="Wishlist">
                <CiHeart className="text-2xl text-black" />
              </Tooltip>
            </Link>

            <Link
              to="/profile/aibot"
              className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold"
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
                  <CiHome className="text-2xl text-black" />
                </Tooltip>
              </Link>

              <Link to="/profile">
                <Tooltip title="Profile">
                  <VscAccount className="text-2xl text-black" />
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
                  <Link to={"/admin/home"} className="px-4 py-1 bg-black text-white rounded-md">
                    admin
                  </Link>

                </>
              ) : <>
                {profile ? <RiMenu3Fill
                  onClick={() => Setbaropen(!baropen)}
                  className="text-3xl text-black"
                /> : <Link to="/profile">
                  <VscAccount className="text-2xl text-black" />
                </Link>}</>}
            </div>
          )}
        </div>
        {
          search && (
            <div className="block mt-4 md:hidden">
              {search && (
                <div className="flex justify-between items-center space-x-2 bg-gray-100 p-2 rounded-2xl relative">
                  <div className="flex items-center space-x-2">
                    <img src="/images/residential.png" className="w-8 h-9" alt="" />
                    <p className="text-xs font-bold">{FilterDetails?.city.length < 18 && FilterDetails.city || "Location"}</p>
                  </div>
                  <p className="hidden md:block text-xs font-bold border-l px-2">
                    {monthName}
                  </p>

                  <div className="flex items-center text-xs font-semibold space-x-2">
                    <img src="/home.webp" className="w-8 h-8" alt="" />
                    {FilterDetails.length || 0} Properties
                  </div>
                  <button
                    className="p-2 bg-black-500 rounded-xl"
                    onClick={() => Setsearchpop(true)}
                  >
                    <IoSearchOutline className="text-black text-xl" />
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

            </div>
          )
        }
      </div>

    </>
  );
};

export default Nav;
