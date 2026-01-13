import React, { useState } from "react";
import { ContextDatas } from "../Common/ContextWrapped";
import { motion } from "framer-motion";
import { Field, Formik } from "formik";
import { Hostschema } from "../Common/Hoteldatas";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { RegisterAshost, RegisterAshostGoogle } from "../ApiServices/Allapi";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import Loading from "../Components/Loading";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi"
const HostRegister = () => {
    const { Setsignmodal, Setloginmodal, SetUser } = ContextDatas();
    const [load, Setload] = useState(false)
    const [VisibleType, SetVisibleType] = useState(false)

    const navigate = useNavigate();

    const Handlesubmit = async (values, { resetForm }) => {
        Setload(true)
        try {
            const response = await RegisterAshost(values);
            if (response.status === 200) {
                Setload(false)
                toast.success("Registered successfully");
                Setloginmodal(true);
                Setsignmodal(false);
                resetForm();



            }
        } catch {
            toast.error("Server error");

            Setload(false)
        }
    };

    const GoogleAuthFunc = async (credentials) => {

        const decoded = jwtDecode(credentials.credential);
        const response = await RegisterAshostGoogle({
            username: decoded.name,
            picture: decoded.picture,
            email: decoded.email,
            password: "12121212",

        });

        if (response.status === 200) {
            sessionStorage.setItem("token", response.data.Token);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            SetUser(response.data.Token);

            toast.success("Login successful");

            navigate(response.data.user.role === "admin" ? "/admin/home" : "/");
            Setloginmodal(false);
            Setsignmodal(false);

        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{
                    backgroundImage:
                        "url(https://uploads.prod01.london.platform-os.com/instances/831/assets/images/What%20Makes%20a%20Building%20a%20Skyscraper%20by%20Fred%20Mills%20via%20The%20B1M.jpg)",
                }}
            />


            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md 
                           bg-white/90 backdrop-blur-xl 
                           rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] 
                           px-7 py-8"
            >

                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create Host Account
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Start hosting with us today
                    </p>
                </div>

                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        phone: null,
                    }}
                    validationSchema={Hostschema}
                    onSubmit={Handlesubmit}
                >
                    {({ errors, touched, handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* NAME */}
                            <div>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Field
                                        name="name"
                                        placeholder="Full Name"
                                        className="w-full pl-10 pr-4 py-3 
                                                   border border-gray-300 rounded-lg
                                                   focus:ring-2 focus:ring-blue-500
                                                   focus:border-transparent transition"
                                    />
                                </div>
                                {errors.name && touched.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* EMAIL */}
                            <div>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                                                   focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>
                                {errors.email && touched.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                                                   focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>
                                {errors.password && touched.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                                                   focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* PHONE */}
                            <div>
                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Field
                                        name="phone"
                                        placeholder="Phone Number"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                                                   focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>
                                {errors.phone && touched.phone && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* SUBMIT */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                className="w-full py-3 mt-2
                                           bg-blue-600 hover:bg-blue-700
                                           text-white font-medium rounded-lg
                                           transition shadow-md"
                            >
                                {load ? <Loading /> : "Create Account"}
                            </motion.button>
                        </form>
                    )}
                </Formik>

                {/* GOOGLE LOGIN */}
                <div className="mt-5 flex justify-center">
                    <GoogleLogin
                        onSuccess={GoogleAuthFunc}
                        onError={() => toast.error("Google login failed")}
                    />
                </div>

                {/* FOOTER */}
                <p className="text-center text-sm text-gray-500 mt-5">
                    Already have an account?
                    <span
                        className="text-blue-600 font-medium cursor-pointer ml-1 hover:underline"
                        onClick={() => {
                            Setloginmodal(true)
                            Setsignmodal(false)
                        }}
                    >
                        Login
                    </span>
                </p>
            </motion.div>
        </div>
    );
};

export default HostRegister;
