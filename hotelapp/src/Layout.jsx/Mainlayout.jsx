import React, { useEffect, useRef, useState } from 'react'

import { Outlet } from 'react-router'
import Footer from '../Common/Footer'
import { ContextDatas } from '../Common/ContextWrapped'
import TriptoAuthModal from '../Components/modals/Modallogin'
import { AnimatePresence } from 'framer-motion'
import TriptoSignupModal from '../Components/modals/Modalsign'
import { useDispatch } from 'react-redux'
import { FuncAddallproduct, GetApiHotel } from '../redux/ProductSlice'
import ScrollToTop from '../Components/Scrollcomp'
import DetailSucess from '../Components/modals/DetailSucess'
import { useAllPropertiesAdmin } from '../Admin/ApiTanstack/Propertyfetch'
import { addWishlist } from '../redux/BookingSlice'
import { useGetallwishlist } from '../ApiServices/tanstack/PropertyMethod'
import BookingSuccessModal from '../Utils/UILIBRARY/bookedsucesmodal'
import { SERVERurl } from '../ApiServices/MAINapi'
import { Refreshapi } from '../ApiServices/Allapi'
import Loading from '../Components/Loading'

const Mainlayout = () => {
  const { popUpinputsuccess, Setpopupinputsuccess, bookingsuccessmodal, SetbookingSuccessfull } = ContextDatas()
  const { loginmdal, signmodal, token, SetUser } = ContextDatas()
  const dispatch = useDispatch()


  const [load, Setloading] = useState(false)
  const { data } = useAllPropertiesAdmin()

  const { property } = data || []
  console.log("SERVER URL:", SERVERurl)


  useEffect(() => {
    dispatch(FuncAddallproduct(property))

  }, [data])


  useEffect(() => {

    const Refresh = async () => {
      Setloading(true)
      const res = await Refreshapi()


      if (res.status == 200) {
        Setloading(false)
        SetUser(res.data.user)
      } else {
        Setloading(false)
        console.log(res);

      }

    }

    Refresh()

  }, [])

  const FooterRef = useRef(null)
  if (load) {
    return <Loading />
  }

  return (

    <>
      {bookingsuccessmodal && <BookingSuccessModal onClose={() => SetbookingSuccessfull(false)} />}
      {popUpinputsuccess && <DetailSucess />}
      <AnimatePresence>
        {loginmdal && <TriptoAuthModal />}
        {signmodal && <TriptoSignupModal />}
      </AnimatePresence>


      <Outlet context={{ FooterRef }} />
      <Footer ref={FooterRef} />

    </>
  )
}

export default Mainlayout
