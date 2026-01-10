import React from 'react'

const Button = ({text,onClick,user}) => {
  return (
  <>
  <button onClick={onClick} className={` ${user?"hidden":""} px-4 py-2 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-400 transition-colors duration-300`}>{text}</button>
  </>
  )
}

export default Button
