import React, { useRef, useState } from "react";
import { ContextDatas } from "../../Common/ContextWrapped";
import { motion } from "framer-motion";
import { Field, Formik } from "formik";
import { Signupschema } from "../../Common/Hoteldatas";
import { toast } from "sonner";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleRegister, Registeration } from "../../ApiServices/Allapi";

import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode"
import Loading from "../Loading";
import { FaEye } from "react-icons/fa";

export default function TriptoSignupModal() {
  const { Setsignmodal, Setloginmodal, SetUser } = ContextDatas();
  const [loading, Setloading] = useState(false)
  const [VisibleType, SetVisibleType] = useState(false)
  const CloseRef = useRef(null);
  const Navigate = useNavigate()
  const CloseFunc = (e) => {
    if (CloseRef.current === e.target) Setsignmodal(false);
  };

  const Handlesubmit = async (values, { resetForm }) => {
    Setloading(true)
    if (values) {
      const Userdetail = {
        name: values.name,
        email: values.email,
        password: values.password
      }

      const Response = await Registeration(Userdetail)
      if (Response.status == 200) {

        toast.success("Register successfully")
        Setloginmodal(true)
        Setsignmodal(false)
        Setloading(false)

        resetForm()
      } else {
        toast.error("Server Error")
        console.log(Response);
        Setloading(false)

      }

      Setloginmodal(true)
      Setsignmodal(false)

      resetForm()
    }
  };
  const GoogleAuthFunc = async (credentials) => {
    console.log("crdentials", credentials);
    Setloading(true)

    const Decoded = jwtDecode(credentials.credential)
    console.log(Decoded);

    const Response = await GoogleRegister({ username: Decoded.name, picture: Decoded.picture, email: Decoded.email, password: "12121212" })
    console.log(Response.data);
    if (Response.status == 200) {

      Setloading(false)
      sessionStorage.setItem("token", Response.data.Token)
      sessionStorage.setItem("user", JSON.stringify(Response.data.user))
      SetUser(Response.data.user)
      Setloginmodal(false)
      Setsignmodal(false)

      toast.success("login Success", {
        style: {
          background: "#16a34a", // green-600
          color: "#fff",
          border: "1px solid #22c55e"
        }
      });

      if (Response.data.user.role == "admin") {

        Navigate("/admin/home")
      } else {
        Navigate("/")
      }

    } else {
      toast.warning("invalid request")
      Setloading(false)
    }






  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-xl"
        onClick={CloseFunc}
        ref={CloseRef}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-500">Create Account</div>

          <button
            onClick={() => Setsignmodal(false)}
            aria-label="Close"
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">
          Create Your Account
        </h2>

        {/* Formik */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Signupschema}
          onSubmit={Handlesubmit}
        >
          {({ errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <div className="mt-2 flex justify-between w-full px-4 py-3 rounded-lg  bg-white shadow-sm">
                  <Field
                    name="password"
                    type={VisibleType ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full  outline-0 rounded-md focus:outline-none   text-sm"
                  />
                  <button type='button' onClick={() => SetVisibleType(!VisibleType)}><FaEye /></button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
              >
                {loading ? <Loading /> : "Sign-in"}
              </button>
            </form>
          )}
        </Formik>
        <div className='mt-4 mb-4 w-full flex justify-center items-center'>
          <GoogleLogin
            onSuccess={credentialResponse => {
              GoogleAuthFunc(credentialResponse)
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        {/* Switch to Login */}
        <div className="text-xs text-gray-500 text-center mt-5">
          Already have an account?
          <span
            className="text-blue-600 cursor-pointer hover:underline ml-1"
            onClick={() => {
              Setloginmodal(true);
              Setsignmodal(false);
            }}
          >
            Log-in
          </span>
        </div>
      </motion.div>
    </div>
  );
}
