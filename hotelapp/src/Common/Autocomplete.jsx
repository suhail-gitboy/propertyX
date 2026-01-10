import React, { useCallback, useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Highlights from './Highlights';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { SearchFilter } from '../redux/ProductSlice';

const AutocompleteTwo = ({Setsearchpop,Setpage , placeholder, keralaDistricts, onSelect}) => {
 const [loading,Setloading]=useState(false)
    const [error,Seterror]=useState(null)
    const [Getsuggestion,Setsuggestion]=useState([])
    const [userinput,Setuserinput]=useState("")
    const dispatch=useDispatch()


    const GetdatasSearch=(query)=>{
        Setloading(true)
        Seterror(null)
        try {
            let result;
            if(keralaDistricts){
                result=keralaDistricts.filter((data,key)=>{
                    return data.toLowerCase().includes(query.toLowerCase()) 
                })
            }
            Setsuggestion(result)
            
            
        } catch (error) {
            Seterror(error)
        }finally{
            Setloading(false)
        }
    }
const DebouncingSuggestion=useCallback(debounce(GetdatasSearch,200),[])

    useEffect(()=>{
        if(userinput.length>0){
            DebouncingSuggestion(userinput)
        }
        Setsuggestion([])

    if(userinput.length>2){
            dispatch(SearchFilter(userinput))
    }
Setpage(1)
        

    },[userinput])
  return (
   <div className='transition-all duration-300'>
   <div className='z-20 w-full absolute left-0 bottom-0 top-0 border-neutral-900 rounded-lg  transition-all duration-300 bg-gray-100 flex justify-between px-2 items-center'><input type="text" placeholder={placeholder} value={userinput} onChange={(e)=>Setuserinput(e.target.value)} className='w-full placeholder:text-blue-500 md:py-2 outline-none focus:outline-none focus:ring-0' /><IoSearchOutline onClick={()=>Setsearchpop(false)} className='text-blue-600 text-xl md:text-3xl'/></div>
   <div className='absolute z-40 left-0 mt-5 bg-white w-full'>
{
  (Getsuggestion.length>0 || error || loading)&&(<>
  {loading&&<p>loading...</p>}
  {error&&<p>{error}</p>}
  <Highlights Setsearchpop={Setsearchpop} Setsuggestion={Setsuggestion} Getsuggestion={Getsuggestion} /></>)
}
   </div>
   </div>
  )
}

export default AutocompleteTwo
