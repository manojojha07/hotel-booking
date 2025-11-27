import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 cl:px-32 pt-20 pb-30 flex flex-col items-center'>
      <div className="flex justify-between flex-col md:flex-row items-center w-full">
        <Title align='left'  title="Exclusive Offers" subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories." />
        <button className='flex gap-2 items-center group font-medium cursor-pointer max-md:mt-12'>
            View All Offers
            <img  src={assets.arrowIcon} alt="aroowIcon" className='group-hover:translate-x-1 transition-all' />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {
           exclusiveOffers.map((item) => (
            <div className="group realative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center"
             key={item._id} style={{backgroundImage: `url(${item.image})`}}>
                <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-900 font-medium rounded-full'>{item.priceOff}%off</p>
                <div className="">
                    <p className='text-2xl font-medium font-playfair'>{item.title}</p>
                    <p >{item.description}</p>
                    <p className='text-xs text-white/70 mt-3'>Expires: {item.expiryDate}</p>
                </div>
                <button className='flex gap-2 items-center  font-medium cursor-pointer mt-4 mb-5'>
                    View Offers
                    <img src={assets.arrowIcon} alt="arrowIcon" className=' invert group-hover:translate-x-1 transition-all'  />
                </button>
            </div>
           ))
        }
      </div>
    </div>
  )
}

export default ExclusiveOffer
