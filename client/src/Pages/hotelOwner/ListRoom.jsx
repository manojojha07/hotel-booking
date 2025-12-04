import React, { useEffect, useState } from 'react'
import Title from '../../Components/Title';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';

const ListRoom = () => {
  const { axios, getToken, user, currency} = useAppContext();

  const [rooms, setRooms] = useState([]);

  //fetching room of Hotel isOwner

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/romms/owner', {headers:{
        Authorization: `Bearer ${await getToken()}`
      }})
      if(data.success){
        setRooms(data.rooms)
      }
      else(
        toast.error(data.message)
      )
    } catch (error) {
        toast.error(error.message)
    }
  }
       // toogle availability of the room
       const toggleAvailability = async (roomId)=> {
     const { data} = await axios.post('/api/romms/toggle-availability', {roomId} ,
      {headers:{
        Authorization: `Bearer ${await getToken()}` 
       }})
       if(data.success){
        toast.success(data.message)
        fetchRooms();
       }else{
        toast.error(data.message)
       }
       }

  useEffect(()=> {
  if(user){
    fetchRooms();
  }
  }, [user])

  return (
    <div>
      <Title align='left' font='outfit' title='Room Listings' subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.' />
      <p className='text-gray-500 mt-8'>Total Hotels</p>

      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className="w-full">
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Faciity</th>
              <th className='py-3 px-4 text-gray-800 font-medium '>Price / night</th>
              <th className='py-3 px-4 text-gray-800 text-center font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {
              rooms.map((item, index) => (
                <tr key={index} >
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    {item.roomType}
                  </td>
                  <td className='py-3 px-4 text-gray-700 border-t max-sm:hidden border-gray-300'>
                    {item.amenities.join(', ')}
                  </td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {currency}   {item.pricePerNight}
                  </td>
                  <td className='py-3 px-4 text-red-500 text-sm border-t border-gray-300'>
                   <label htmlFor="" className='relative inline-flex items-center cursor-pointer textgray-900 gap-3'>
                    <input onChange={()=> toggleAvailability(item._id)} type="checkbox" className='sr-only peer' checked={item.isAvailable} />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200"></div>
                    <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                   </label>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom
