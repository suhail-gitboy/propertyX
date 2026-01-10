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
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url(https://uploads.prod01.london.platform-os.com/instances/831/assets/images/What%20Makes%20a%20Building%20a%20Skyscraper%20by%20Fred%20Mills%20via%20The%20B1M.jpg)",
                }}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50" />

            {/* CONTENT */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl px-6 py-8"
            >
                <h2 className="text-center text-lg font-semibold mb-6">
                    Create Your Host Account
                </h2>

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
                            {["name", "email", "password", "confirmPassword", "phone"].map((field) => (
                                <div key={field}>
                                    <Field
                                        name={field}
                                        type={field.includes("password") ? "password" : "text"}
                                        placeholder={field.replace(/([A-Z])/g, " $1")}
                                        className="w-full px-4 py-3 border border-black/15 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors[field] && touched[field] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[field]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                            >
                                {load ? <Loading /> : "   Create Account"}
                            </button>
                        </form>
                    )}
                </Formik>

                <div className="mt-4 flex justify-center">
                    <GoogleLogin
                        onSuccess={GoogleAuthFunc}
                        onError={() => toast.error("Google login failed")}
                    />
                </div>

                <p className="text-center text-xs text-gray-500 mt-4">
                    Already have an account?
                    <span
                        className="text-blue-600 cursor-pointer ml-1"
                        onClick={() => {
                            Setloginmodal(true);
                            Setsignmodal(false);
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
