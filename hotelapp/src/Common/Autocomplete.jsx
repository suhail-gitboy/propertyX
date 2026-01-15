import React, { useCallback, useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Highlights from './Highlights';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { SearchFilter } from '../redux/ProductSlice';
import { useAllPropertiesAdmin } from '../Admin/ApiTanstack/Propertyfetch';

const AutocompleteTwo = ({ Setsearchpop, Setpage, placeholder, keralaDistricts, onSelect }) => {
    const [loading, Setloading] = useState(false)
    const [error, Seterror] = useState(null)
    const [Getsuggestion, Setsuggestion] = useState([])
    const [userinput, Setuserinput] = useState("")
    const [allsearchkey, Setsearchkey] = useState([])
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.Product)

    const { data } = useAllPropertiesAdmin()

    const { property } = data || []
    useEffect(() => {
        if (!property?.length) return;

        const allkey = property
            .flatMap((item) => [
                item?.location?.city,
                item?.location?.address,
                item?.title,
            ])
            .filter(Boolean)
            .map((text) => text.toLowerCase())

        Setsearchkey([...new Set(allkey)]);
    }, [property]);




    const GetdatasSearch = (query) => {
        Setloading(true)
        Seterror(null)
        try {
            let result;
            if (allsearchkey) {


                result = allsearchkey.filter((data, key) => {
                    return data.includes(query.toLowerCase())
                })


            } else {

            }
            Setsuggestion(result)




        } catch (error) {
            Seterror(error)
        } finally {
            Setloading(false)
        }
    }
    // const DebouncingSuggestion = useCallback(debounce(GetdatasSearch, 100), [])

    useEffect(() => {
        if (userinput.length > 1) {
            GetdatasSearch(userinput)
        } else {
            Setsuggestion([])
        }



        dispatch(SearchFilter(userinput))

        Setpage(1)


    }, [userinput])
    return (
        <div className='transition-all duration-300'>
            <div className='z-20 w-full absolute left-0 bottom-0 top-0 border-neutral-900 rounded-lg  transition-all duration-300 bg-gray-100 flex justify-between px-2 items-center'><input type="text" placeholder={placeholder} value={userinput} onChange={(e) => Setuserinput(e.target.value)} className='w-full placeholder:text-blue-500 md:py-2 outline-none focus:outline-none focus:ring-0' /><IoSearchOutline onClick={() => Setsearchpop(false)} className='text-blue-600 text-xl md:text-3xl' /></div>
            <div className='absolute z-40 left-0 mt-5 bg-white w-full'>
                {
                    (Getsuggestion?.length > 0 || error || loading) && (<>
                        {loading && <p>loading...</p>}
                        {error && <p>{error}</p>}
                        <Highlights Setsearchpop={Setsearchpop} Setsuggestion={Setsuggestion} Getsuggestion={Getsuggestion} /></>)
                }
            </div>
        </div>
    )
}

export default AutocompleteTwo
