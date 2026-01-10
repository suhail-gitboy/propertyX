import React, { forwardRef } from "react";



 const Footer=forwardRef((ref)=> {
  return (
    <footer ref={ref} className="bg-black text-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">

        {/* Logo + Description */}
        <div className="col-span-2">
         <h3 className='font-bold text-2l md:text-4xl  bg-linear-to-br from-blue-400 via-blue-600 to-yellow-500  text-transparent bg-clip-text '>Mytrip<span className='text-transparent bg-linear-to-br from-blue-400 via-yellow-400 to-yellow-700 bg-clip-text'>.in</span></h3>

          <p className="text-gray-300 mb-6 leading-relaxed">
            We help you find and book the perfect stay from cozy guesthouses to 
            top hotels — with ease, trust, and the best deals.
          </p>

          {/* App Store buttons */}
     
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Trending Destinations</li>
            <li>Summer Hotspots</li>
            <li>Winter Getaways</li>
            <li>Weekend Deals</li>
            <li>Family-Friendly Stays</li>
          </ul>
        </div>

        {/* Property Types */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Property Types</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Hotels</li>
            <li>Apartments</li>
            <li>Villas</li>
            <li>Cabins</li>
            <li>Glamping</li>
            <li>Domes</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Help Centre</li>
            <li>Live Chat Support</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">©️ 2025 Tripto. All rights reserved.</p>

        {/* Payment Icons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <img src="/visa.png" alt="visa" className="w-10" />
          <img src="/mastercard.png" alt="mastercard" className="w-10" />
          <img src="/stripe.png" alt="stripe" className="w-10" />
          <img src="/gpay.png" alt="google pay" className="w-10" />
          <img src="/applepay.png" alt="apple pay" className="w-10" />
        </div>
      </div>
    </footer>
  );
})
export default Footer