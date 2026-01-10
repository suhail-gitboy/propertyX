"use client"

import { useRef } from "react"
import { Confetti } from "./Sucess"
import React from "react"
import { Link } from "react-router"
import { FaHome } from "react-icons/fa"

export function ConfettiDemo({ cancel }) {
    const confettiRef = useRef(null)

    return (
        <div className="bg-black relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
            <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl md:text-6xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
                Payment {cancel ? "Cancelled" : "Successful"}
            </span>
            <Link to={"/"} className="flex z-50 mt-10 items-center text-4xl gap-2 text-green-900  font-semibold"><FaHome />Home</Link>

            <Confetti
                ref={confettiRef}
                className="absolute top-0 left-0 z-0 size-full"
                onMouseEnter={() => {
                    confettiRef.current?.fire({})
                }}
            />
        </div>
    )
}
