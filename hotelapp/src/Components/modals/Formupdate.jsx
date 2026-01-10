import React from 'react'
import { ContextDatas } from '../../Common/ContextWrapped'

const Formupdate = ({ Updatedata, Setmodal }) => {
  const { Booking, Setbooking } = ContextDatas()
  return (
    <div>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white w-[350px] p-5 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Booking</h2>

          {/* CHECK-IN */}
          <div className="mb-4">
            <label className="block text-xs text-slate-500">Check-in</label>
            <input
              type="date"
              value={Booking.checkin}
              onChange={(e) =>
                Setbooking({ ...Booking, checkin: e.target.value })
              }
              className="mt-2 bg-blue-300 py-2 px-4 text-sm w-full rounded"
            />
          </div>

          {/* CHECK-OUT */}
          <div className="mb-4">
            <label className="block text-xs text-slate-500">Check-out</label>
            <input
              type="date"
              value={Booking.checkout}
              onChange={(e) =>
                Setbooking({ ...Booking, checkout: e.target.value })
              }
              className="mt-2 bg-blue-300 py-2 px-4 text-sm w-full rounded"
            />
          </div>

          {/* ADULT + TOTAL */}
          <div className="mb-4">
            <label className="block text-xs text-slate-500">Adults</label>
            <input
              type="number"
              value={Booking.adult}

              onChange={(e) => Setbooking({
                ...Booking, adult: e.target.value, total: Booking?.priceTotal * Number(e.target.value || 0)
              })}
              className="mt-2 bg-blue-300 py-2 px-4 text-sm w-full rounded"
            />
          </div>

          {/* TOTAL DISPLAY */}
          <div className="mb-4">
            <p className="text-sm font-medium">
              Total Price: <span className="font-bold">₹{Booking.total}</span>
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button onClick={Updatedata} className="w-full bg-blue-500 text-white py-2 rounded">
            edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Formupdate
