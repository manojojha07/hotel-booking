import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home';
import Footer from './Components/Footer';
import AllRooms from './Pages/AllRooms';
import RoomDetials from './Pages/RoomDetials';
import MyBooking from './Pages/MyBooking';
import HotelReg from './Components/HotelReg';
import Layout from './Pages/hotelOwner/Layout';
import Dashboard from './Pages/hotelOwner/Dashboard';
import ListRoom from './Pages/hotelOwner/ListRoom';
import AddRoom from './Pages/hotelOwner/AddRoom';

const App = () => {
  
const  isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
    { !isOwnerPath && <Navbar />  }
   {false && <HotelReg /> }
    <div className='min-h-[70vh]'>
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/rooms' element={<AllRooms /> } />
      <Route path='/rooms/:id' element={<RoomDetials /> } />
      <Route path='/my-bookings' element={<MyBooking /> } />
     <Route path='/owner' element={<Layout />}>
        <Route index element={<Dashboard /> } />
        <Route path='add-room' element={<AddRoom /> } />
        <Route path='list-room' element={<ListRoom /> } />
     </Route>
    </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
