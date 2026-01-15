import React, { useEffect, useRef } from 'react'

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

const Mainlayout = () => {
  const { popUpinputsuccess, Setpopupinputsuccess, bookingsuccessmodal, SetbookingSuccessfull } = ContextDatas()
  const { loginmdal, signmodal, token } = ContextDatas()
  const dispatch = useDispatch()



  const { data } = useAllPropertiesAdmin()

  const { property } = data || []
  console.log("SERVER URL:", SERVERurl)


  useEffect(() => {
    dispatch(FuncAddallproduct(property))

  }, [data])

  const FooterRef = useRef(null)
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
