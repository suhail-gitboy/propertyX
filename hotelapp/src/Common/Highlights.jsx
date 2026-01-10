import React from 'react'
import { useDispatch } from 'react-redux'
import { SearchFilter } from '../redux/ProductSlice'

const Highlights = ({Getsuggestion,Setsuggestion,Setsearchpop}) => {
  const Dispatch=useDispatch()
  return (
    <div className='w-full h-120 overflow-scroll mt-5 border border-gray-700/20 rounded-lg z-30'>
        <ul>
{
    Getsuggestion.map((data,id)=>(
       
            <li key={id} className='text-gray-700 text-md py-4 px-4 hover:bg-gray-200 transition-colors duration-150' onClick={()=>{Dispatch(SearchFilter(data));Setsearchpop(false);Setsuggestion([])}} > {data} </li>
        

    ))
}
</ul>
    </div>
  )
}

export default Highlights
