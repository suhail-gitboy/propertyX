import React, { createContext, useContext, useEffect, useState } from 'react'
const MainCotext = createContext()
const ContextWrapped = ({ children }) => {
  const [loginmdal, Setloginmodal] = useState(false)
  const [signmodal, Setsignmodal] = useState(false)
  const [isLogged, SetisLogged] = useState(false)
  const [loading, Setloading] = useState(false)
  const [bookingsuccessmodal, SetbookingSuccessfull] = useState(false)
  const [bookingID, SetbookingID] = useState(null)
  const [Booking, Setbooking] = useState({
    propertyId: "",
    hostId: "",// 🔑 which property
    checkin: null,            // Date or dayjs object
    checkout: null,
    rooms: 1,
    name: "",
    phone: null,
    // optional
    pricePerRoom: 0,          // fetched from property
    // calculated
    totalPrice: 0,            // calculated
    paymentMode: "arrival",   // "online" | "arrival"
    bookingStatus: "pending"

  })
  const [notidyuser, Setnotifydata] = useState(null)
  const [popUpinputsuccess, Setpopupinputsuccess] = useState(false)
  const [RecipientId, setRecipientId] = useState(null)

  // for the upload property 
  const [property, setProperty] = useState({

    title: "",
    description: "",
    propertyType: "",
    listingType: "",
    price: "",
    description: "",
    squareFeet: null,
    roomsAvailable: null,

    amenities: [],
    // 👈 ARRAY HERE
    seller: {
      sellerId: "",
      sellerName: "",
      sellerEmail: "",
      sellerPhone: ""

    },
    location: {
      address: "",
      city: "",
      pincode: null,
      lat: null,
      lng: null,
    },
    images: [],
  });



  const [User, SetUser] = useState(null)
  const [token, Settoken] = useState(null)
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const Token = sessionStorage.getItem("token");

    if (userData && Token) {
      SetUser(userData);
      Settoken(Token);
      SetisLogged(true);
    } else {
      SetUser(null);
      Settoken(null);
      SetisLogged(false);
    }
  }, []);


  const [baropen, Setbaropen] = useState(false)

  return (
    <>
      <MainCotext.Provider value={{ RecipientId, setRecipientId, bookingID, SetbookingID, notidyuser, Setnotifydata, bookingsuccessmodal, SetbookingSuccessfull, loading, Setloading, User, SetUser, token, Settoken, popUpinputsuccess, Setpopupinputsuccess, property, setProperty, loginmdal, Setloginmodal, Booking, Setbooking, isLogged, SetisLogged, signmodal, Setsignmodal, baropen, Setbaropen }}  >
        {children}
      </MainCotext.Provider>

    </>
  )
}

export default ContextWrapped
export const ContextDatas = () => useContext(MainCotext)
