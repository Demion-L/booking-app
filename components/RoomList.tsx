"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";

const RoomList = ({ rooms }: { rooms: any }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {rooms.data.map((room: any) => {
        const imgUrl = `http://127.0.0.1:1337${room.attributes.image.data?.attributes.url}`;
        return (
          <div key={room.id}>
            <Link href={`/room/${room.id}`}>
              <div className='relative w-full h-[300px] overflow-hidden mb-6'>
                <Image
                  src={imgUrl}
                  fill
                  priority
                  className='object-cover'
                  alt='appartmen'
                />
              </div>
            </Link>
            <div className='h-[134px]'>
              <div className='flex items-center justify-between mb-6'>
                <div>Capacity: {room.attributes.capacity} person</div>
                <div className='flex gap-1 text-accent'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>
              </div>
              <Link href={`/room/${room.id}`}>
                <h3 className='h3'>{room.attributes.title}</h3>
              </Link>
              <p className='h3 font-secondary font-medium text-accent mb-4'>
                {room.attributes.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomList;
