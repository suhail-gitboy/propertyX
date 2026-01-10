import React from 'react'
import { NavLink } from "react-router-dom"
import {
    FiMessageCircle,
    FiHeart,
    FiCalendar,
    FiHome,
    FiCpu,
    FiUser
} from "react-icons/fi";
import { LuSun } from "react-icons/lu";
import { Link, Outlet, useLocation } from 'react-router';
import { ContextDatas } from './ContextWrapped';

const Homenav = () => {
    const { User } = ContextDatas()
    const isHost = User?.role === "host"

    const linkBase =
        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
    const active =
        "bg-gray-900 text-white shadow-md"
    const inactive =
        "text-gray-600 hover:bg-gray-100"


    return (
        <aside className="h-screen w-64 bg-white shadow-xl rounded-r-3xl p-5 flex flex-col">

            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900">Dashoard</h2>
                <p className="text-xs text-gray-500">
                    Manage your activity
                </p>
            </div>


            <nav className="flex flex-col gap-2">
                {/* Messages */}
                <NavLink
                    to="/profile/messages"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? active : inactive}`
                    }
                >
                    <FiMessageCircle className="text-lg" />
                    Messages
                </NavLink>

                {/* Wishlist (User only) */}
                {!isHost && (
                    <NavLink
                        to="/profile/wishlists"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? active : inactive}`
                        }
                    >
                        <FiHeart className="text-lg" />
                        Wishlist
                    </NavLink>
                )}

                {/* Bookings */}
                <NavLink
                    to="/profile/bookings"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? active : inactive}`
                    }
                >
                    <FiCalendar className="text-lg" />
                    {isHost ? "Manage Bookings" : "My Bookings"}
                </NavLink>


                {isHost && (
                    <NavLink
                        to="/profile/dashboard"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? active : inactive}`
                        }
                    >
                        <FiHome className="text-lg" />
                        Host Dashboard
                    </NavLink>
                )}


                <NavLink
                    to="/profile/aibot"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? active : inactive}`
                    }
                >
                    <FiCpu className="text-lg" />
                    AI Support
                </NavLink>

                {/* Profile */}
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? active : inactive}`
                    }
                >
                    <FiUser className="text-lg" />
                    Profile
                </NavLink>
            </nav>


            <div className="mt-auto pt-6 border-t text-xs text-gray-400">
                © 2026 PropertyX
            </div>
        </aside>
    )
}

export default Homenav
