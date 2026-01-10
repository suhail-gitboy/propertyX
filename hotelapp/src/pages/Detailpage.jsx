import React, { useEffect, useState } from 'react'
import Nav from '../Common/Nav'
import { MapPin, Home, Ruler, CheckCircle } from "lucide-react";
import { data, Link, useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Cardhotel from '../Components/Cardhotel';
import { easeIn, motion } from 'framer-motion';
import { FaRegHeart } from 'react-icons/fa';
import { GetApiHotel } from '../redux/ProductSlice';
import { Addapi, AddApiBooking } from '../ApiServices/crud/Adding';
import Wishlist from '../Components/Wishlist';
import { toast } from 'sonner';
import { ContextDatas } from '../Common/ContextWrapped';
import Swal from 'sweetalert2'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { CiShare2 } from "react-icons/ci";
import dayjs from "dayjs";
import { FiMessageCircle } from "react-icons/fi";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import ImagesHotal from '../Components/modals/ImagesHotal';
import Reviews from '../Components/Reviews';
import { AiOutlineMessage } from "react-icons/ai";
import { useGetsingleproperty } from '../ApiServices/tanstack/PropertyMethod';
import RoomPaymentModal from '../Components/modals/Booking';
import { checkAvailabilityApi, NewbookingApi } from '../ApiServices/Allapi';


const Detailpage = () => {


  const { isLogged, SetisLogged, loginmdal, Setloginmodal, User, Booking, Setbooking } = ContextDatas()
  // mapping 
  const [pos, setPos] = useState(null);
  const [Details, Setdetails] = useState(null)
  const [location, Setlocation] = useState("")
  const [Modalimage, Setmodalimage] = useState(false)
  const [Bookingopen, Setbookingopen] = useState(false)
  // bookingopen

  const [ModalBooking, Setmodalbooking] = useState(false)
  console.log(location);


  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
  });
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!location) return;

    fetch(`http://localhost:8000/geocode?q=${location}`)
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          setPos([data[0].lat, data[0].lon]);
        }
      })
      .catch(err => console.error("Frontend fetch error:", err));
  }, [location]);



  const { id } = useParams()
  const { data } = useGetsingleproperty(id)





  // handleshare
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this resort!",
          text: `I found this resort in: ${location}`,
          url: window.location.href, // current page URL
        });
        console.log("Shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // fallback for browsers that don’t support navigator.share
      alert("Share not supported on this browser. Copy the URL manually!");
    }
  };


  const handleChange = (field, value) => {
    Setbooking((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  // propertyId: "",           // 🔑 which property
  // checkin: null,            // Date or dayjs object
  // checkout: null,          
  // rooms: 1,                 
  //                 // optional
  // pricePerRoom: 0,          // fetched from property
  //              // calculated
  // totalPrice: 0,            // calculated
  // paymentMode: "arrival",   // "online" | "arrival"
  // bookingStatus: "pending"
  useEffect(() => {
    if (!data) return;

    Setbooking(prev => {
      const pricePerRoom = data.price || 0;
      const rooms = prev.rooms || 1;

      console.log(Booking);

      return {
        ...prev,
        propertyId: data._id,
        pricePerRoom,
        name: User.name,
        hostId: data.seller.sellerId,
        totalPrice: rooms * pricePerRoom
      };
    });
  }, [data, Booking.rooms]);




  const FunctCheckavailabity = () => {
    if (!Booking.checkin || !Booking.checkout) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }

    checkAvailabilityApi(Booking)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);

          toast.success(`✨ ${res.data.availableRooms} room${res.data.availableRooms > 1 ? 's' : ''} available! Book now!`);

          Setbookingopen(true)
        } else {
          toast.warning(res.data.message)
        }
      })
      .catch((err) => {
        console.error("Error checking availability:", err);
      });
  }


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: easeIn }} className='p-4 md:p-6' >
      {Modalimage && <ImagesHotal images={data?.images} Setmodalimage={Setmodalimage} />}
      {ModalBooking && <RoomPaymentModal
        open={""}
        onClose={() => setOpenPayment(false)}
        pricePerRoom={data?.price}
        nights={""}
        maxRooms={data?.roomsAvailable}
        onConfirm={(data) => console.log(data)}
        Setbookmodal={Setmodalbooking}
      />}
      <Nav />
      <div className="min-h-screen bg-gray-50 flex items-start justify-center mt-5 py-5 ">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md md:p-8 p-4">
          {/* Header */}
          <header className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{data?.title}<span className="text-amber-400">★★★★</span></h1>
              <p className="text-sm text-slate-500 mt-1">{data?.location?.city}, {data?.location?.address}</p>

              {/* Tabs */}
              <nav className="mt-6">
                <ul className="flex gap-6 text-sm font-medium text-slate-600">
                  <li className="border-b-2 border-blue-500 pb-2 text-blue-600">Overview</li>
                  {/* {
                    Details.amenities.map((data)=>(<li className="pb-2">{data}</li>))
                } */}

                </ul>
              </nav>
            </div>

            <div className='flex space-x-2'>
              <div className="flex p-1 rounded-full  border border-gray-400  items-center gap-4">
                <div className=" p-1 md:p-2 hover:bg-gray-200 bg-white transition-colors duration-200 border-1 border-white rounded-full">
                  <FaRegHeart className=' text-md md:text-xl hover:text-rose-600 text-rose-500' />

                </div>

              </div>
              <div className='flex p-1 rounded-full  border border-gray-400  items-center gap-4'>
                <div className=" p-1 md:p-2 hover:bg-gray-200 bg-white transition-colors duration-200 border-1 border-white rounded-full">
                  <CiShare2 className=' text-md md:text-xl hover:text-blue-600 text-blue-500' />

                </div>

              </div>
            </div>
          </header>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Gallery (2/3 width on large screens) */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 row-span-2">
                  <div className="relative rounded-lg overflow-hidden shadow-sm">
                    <img src={data?.images[0].url} alt="Main room" className="w-full h-80 object-cover" />

                    <div className="absolute left-6 bottom-6 bg-white/95 rounded-full px-4 py-2 shadow-sm flex items-center gap-3">
                      <img src={data?.images[2].url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                      <div onClick={() => Setmodalimage(true)} className="text-sm">
                        <div className="text-xs text-slate-400">View</div>
                        <div className="text-sm font-medium text-slate-800">{data?.title}</div>
                      </div>
                      <button className="ml-2 text-slate-500">▾</button>
                    </div>
                  </div>
                </div>

                {
                  data?.images?.slice(0, 4).map((data) => (
                    <div className="rounded-lg overflow-hidden shadow-sm">
                      <img src={data.url} alt="pool" className="w-full h-36 object-cover" />
                    </div>
                  ))

                }



              </div>

              {/* Description */}
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900">Description</h2>
                <p className="mt-3 text-sm text-slate-600 max-w-2xl">{data?.description}
                </p>




              </section>

              {/* Amenities heading (placeholder) */}
              <section className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900">Amenities</h3>
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-4 text-sm text-slate-600">
                  {
                    data?.amenities?.map((data) => (<div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4l3 9 4-18 3 9h4" /></svg>{data}</div>))
                  }

                </div>
              </section>
            </div>

            {/* Right: Booking Card */}
            {
              data?.listingType == "rent" ? <>    <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6">

                    {/* Price Header */}
                    <div className="flex items-baseline justify-between mb-6">
                      <div>
                        <span className="text-2xl font-semibold text-gray-900">
                          ₹{data?.price}
                        </span>
                        <span className="text-sm text-gray-500"> / day</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        ⭐ 4.8 <span className="text-gray-400">( reviews)</span>
                      </div>
                    </div>

                    {/* Date Picker Box */}
                    <div className="border border-gray-300 rounded-xl overflow-hidden">
                      <div className="grid grid-cols-2 divide-x divide-gray-300">
                        <div className="p-3">
                          <label className="block text-[10px] font-semibold text-gray-700 uppercase">
                            Check-in
                          </label>
                          <input
                            value={Booking.checkin ? Booking.checkin.format("YYYY-MM-DD") : ""}
                            onChange={(e) => handleChange("checkin", dayjs(e.target.value))}
                            type="date"
                            className="w-full text-sm mt-1 outline-none"
                          />
                        </div>

                        <div className="p-3">
                          <label className="block text-[10px] font-semibold text-gray-700 uppercase">
                            Check-out
                          </label>
                          <input
                            value={Booking.checkout ? Booking.checkout.format("YYYY-MM-DD") : ""}
                            onChange={(e) => handleChange("checkout", dayjs(e.target.value))}
                            type="date"
                            className="w-full text-sm mt-1 outline-none"
                          />
                        </div>
                      </div>

                      {/* Guests */}
                      <div className="border-t border-gray-300 p-3">
                        <label className="block text-[10px] font-semibold text-gray-700 uppercase">
                          rooms
                        </label>
                        <input
                          min={1}
                          value={Booking.rooms}
                          onChange={(e) => handleChange("rooms", Number(e.target.value))}
                          type="number"
                          placeholder="2 rooms"
                          className="w-full text-sm mt-1 outline-none"
                        />
                      </div>
                    </div>

                    {/* Reserve Button */}
                    {
                      Bookingopen ? <button onClick={() => Setmodalbooking(true)} className="mt-6 w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition">
                        Book now
                      </button> : <button onClick={() => FunctCheckavailabity()} className="mt-6 w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition">
                        check availability
                      </button>
                    }

                    {/* Price Breakdown */}
                    <div className="mt-6 space-y-3 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span className="underline">₹{Booking?.pricePerRoom} × 2 fullday</span>
                        <span>₹{Booking?.totalPrice}</span>
                      </div>


                      <hr />

                      <div className="flex justify-between font-semibold text-gray-900">
                        <span>Total before taxes</span>
                        <span>₹{Booking.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    You won’t be charged yet
                  </p>
                </div>
              </aside></> : (
                <aside className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6">

                      {/* Price Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span className="text-2xl font-semibold text-gray-900">
                            ₹{data?.price?.toLocaleString()}
                          </span>
                          <p className="text-sm text-gray-500">One-time purchase</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                          <CheckCircle size={16} />
                          For Sale
                        </div>
                      </div>

                      {/* Property Meta */}
                      <div className="space-y-4 text-sm text-gray-700">

                        {/* Square Feet */}
                        <div className="flex items-center gap-3">
                          <Ruler className="text-indigo-600" size={18} />
                          <span>
                            <strong>{data?.squareFeet}</strong> sq.ft built-up area
                          </span>
                        </div>

                        {/* Property Type */}
                        <div className="flex items-center gap-3">
                          <Home className="text-indigo-600" size={18} />
                          <span className="capitalize">
                            {data?.propertyType} property
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-3">
                          <MapPin className="text-indigo-600 mt-1" size={18} />
                          <div>
                            <p className="font-medium">{data?.location?.city}</p>
                            <p className="text-xs text-gray-500">
                              {data?.location?.address}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Divider */}
                      <hr className="my-6" />

                      {/* Amenities */}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-3">
                          Amenities
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {data?.amenities?.map((item, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition">
                        Contact Seller
                      </button>
                    </div>

                    <p className="mt-4 text-center text-xs text-gray-500">
                      Verified property · Direct owner listing
                    </p>
                  </div>
                </aside>
              )
            }


          </div>
        </div>
        {/* map */}



      </div>




      {/* hostedby */}


      <div className=" py-4 my-10 flex justify-between items-center border-b border-gray-700/15 px-4 md:px-30">
        <div className="flex items-center gap-4 ">
          <img src={
            typeof data?.seller?.picture === "string"
              ? data.seller.picture
              : data?.seller?.picture?.url
          } alt="" className="w-20 h-20 rounded-full" />
          <div>
            <p className='text-xl pb-1 font-semibold'>Hosted by {data?.seller?.name}</p>
            <p className='text-lg  text-gray-600 font-light'>host . years Hosting</p>
          </div>

        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300
                 hover:bg-gray-100 transition"
          title="Message host"
          onClick={() => console.log("Open chat")}
        >
          <AiOutlineMessage className="text-2xl text-gray-700" />

          <span className="hidden md:block text-xl font-medium text-gray-700">
            For more
          </span>
        </button>

      </div>



      {/* review */}

      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6 px-4 py-2 rounded-md  w-fit flex items-center gap-2">Reviews   <img className='w-15 h-10' src='../../public/comments.png' /></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data?.comments.map((review, index) => (
            <Reviews review={review} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8">
          <button className="border px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
            Show all reviews
          </button>
        </div>
      </section>




      {/* location on. map */}

      <div className='mt-20  p-4 md:p-6'>
        <h3 className='text-3xl font-semibold text-black mb-4'>See property on map</h3>
        <div className='w-full md:w-2/3'>
          {pos ? (
            <MapContainer
              center={pos}
              zoom={15}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={pos}>
                <Popup>{Details.location}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p>Loading map…</p>
          )}
        </div>

      </div>

      {/* <div className='px-5 md:px-15 lg:px-20'>
        <h3 className='text-3xl font-semibold mb-10 mt-10'>Explore Similar Properties</h3>
        <div className='h-[100vw] overflow-y-auto gap-y-3 mb-10'>
          {
            products?.slice(0, 15)?.map((data, id) => {

              return (<Link to={`/roomdetail/${data.id}`}> <Cardhotel data={data} id={id} /></Link>)
            })
          }

        </div>
      </div> */}
    </motion.div>
  )
}

export default Detailpage
