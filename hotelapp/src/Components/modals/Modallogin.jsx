import React, { useState, useRef } from "react";
import { ContextDatas } from "../../Common/ContextWrapped";
import { motion } from "framer-motion";
import { Formik, Field } from "formik";
import { LoginSchema } from "../../Common/Hoteldatas";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode"
import { GoogleLogin } from '@react-oauth/google';
import { GoogleAuth, Login } from "../../ApiServices/Allapi";
import { useNavigate } from "react-router";
import Loading from "../Loading";
import { FaEye } from "react-icons/fa";

export default function TriptoAuthModal() {
  const { loginmdal, Setloginmodal, SetUser, token, Settoken, signmodal, Setsignmodal, isLogged, SetisLogged, profile } = ContextDatas()
  const Navigate = useNavigate()
  const [loading, Setloading] = useState(false)
  const [VisibleType, SetVisibleType] = useState(false)
  const CloseRef = useRef(null)
  const Closefunc = (e) => {
    if (CloseRef.current == e.target) {
      Setloginmodal(false)
    }
  }


  const Submitdata = async (values) => {
    console.log(values);
    Setloading(true)

    try {
      const Response = await Login(values)

      if (Response.status == 200) {

        sessionStorage.setItem("user", JSON.stringify(Response.data.user))
        sessionStorage.setItem("token", Response.data.Token)
        SetUser(Response.data.user);
        Settoken(Response.data.Token);
        console.log(Response);
        if (Response.data.user.role == "host") {
          setTimeout(() => {
            toast.success("You're all set! Start hosting and earn today 🏠", {
              style: {
                background: "#0f172a", // slate-900
                color: "#ffffff",
                border: "1px solid #38bdf8",
              },
            });

          }, 10000);


        }
        setTimeout(() => {
          Setloading(false)
          if (Response.data.user.role == "admin") {

            Navigate("/admin/home")
          } else {
            Navigate("/")
          }
          Setloginmodal(false)
          Setsignmodal(false)
          toast.success("login Success", {
            style: {
              background: "#16a34a", // green-600
              color: "#fff",
              border: "1px solid #22c55e"
            }
          });


        }, 2000);
      } else {
        console.log(Response);
        Setloading(false)
        toast.error(Response.response.data)
      }

    } catch (error) {
      toast.error(error.response?.data || "login failed");

    }
  }


  const GoogleAuthFunc = async (credentials) => {



    const Decoded = jwtDecode(credentials.credential)
    console.log(Decoded);

    const Response = await GoogleAuth({ username: Decoded.name, picture: Decoded.picture, email: Decoded.email, password: "12121212" })

    if (Response.status == 200) {
      sessionStorage.setItem("token", Response.data.Token)
      sessionStorage.setItem("user", JSON.stringify(Response.data.user))
      SetUser(Response.data.user);
      Settoken(Response.data.Token);

      if (Response.data.user.role == "host") {
        setTimeout(() => {
          toast.success("You're all set! Start hosting and earn today 🏠", {
            style: {
              background: "#0f172a", // slate-900
              color: "#ffffff",
              border: "1px solid #38bdf8",
            },
          });

        }, 10000);


      }

      if (Response.data.user.role == "admin") {

        Navigate("/admin/home")
      } else {
        Navigate("/")
      }
      Setloginmodal(false)
      Setsignmodal(false)
      toast.success("login Success", {
        style: {
          background: "#16a34a", // green-600
          color: "#fff",
          border: "1px solid #22c55e"
        }
      })

    } else {
      toast.warning("invalid request")
    }






  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-xl" ref={CloseRef}
        onClick={Closefunc}
      />

      {/* modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0.3 }}
        className="relative z-10 w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-500">Login</div>
          <button
            onClick={() => Setloginmodal(false)}
            aria-label="Close"
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">Welcome Back</h2>

        {/* Email */}

        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={Submitdata}
        >
          {({ errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <div>


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

              <div className="mb-5">
                <label className="block text-sm text-gray-600 mb-1">Password</label>
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
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3 ${loading ? "bg-blue-200" : " bg-blue-600"} flex items-center justify-center  text-white rounded-md text-sm font-medium mb-4`}
              >
                {loading ? <Loading /> : "Login"}
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
        {/* Divider */}
        <div className="text-xs mt-6 text-gray-500 text-center">
          Don’t have an account?
          <span className="text-blue-600 cursor-pointer hover:underline ml-1" onClick={() => { Setsignmodal(true); Setloginmodal(false) }}>
            Sign Up
          </span>
        </div>
      </motion.div>

    </div>
  );
}