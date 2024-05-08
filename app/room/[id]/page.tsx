import Image from "next/image";

import { getReservationData, getRooms } from "@/lib/api";
import { IReservations, RoomDetailsProps } from "@/utils/types";
import React from "react";
import { TbArrowsMaximize, TbUsers } from "react-icons/tb";
import Reservation from "@/components/Reservation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const RoomDetails: React.FC<RoomDetailsProps> = async ({ params }) => {
  const { data } = await getRooms({ params });
  const imageUrl = `http://127.0.0.1:1337${data.attributes.image.data.attributes.url}`;
  const reservations: IReservations = await getReservationData();
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const userData = await getUser();

  return (
    <section className='min-h-[80vh]'>
      <div className='container mx-auto py-8'>
        <div className='flex flex-col lg:flex-row lg:gap-12 h-full'>
          {/* img & text */}
          <div className='flex-1'>
            {/* image */}
            <div className='relative h-[360px] lg:h-[420px] mb-8'>
              <Image
                src={imageUrl}
                fill
                className='object-cover'
                alt='room photo'
              />
            </div>
            <div className='flex flex=1 flex-col mb-8'>
              {/* title & price */}
              <div className='flex justify-between items-center mb-4'>
                <h3 className='h3'>{data?.attributes?.title}</h3>
                <p className='h3 font-secondary font-medium text-accent'>
                  {data?.attributes?.price}
                  <span className='text-base text-secondary'>/ night</span>
                </p>
              </div>
              {/* info */}
              <div className='flex items-center gap-8 mb-4'>
                <div className='flex items-center gap-2'>
                  <div className='text-2xl text-accent'>
                    <TbArrowsMaximize />
                  </div>
                  <p>
                    {data?.attributes?.size} m <sup>2</sup>
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='text-2xl text-accent'>
                    <TbUsers />
                  </div>
                  <p>{data?.attributes?.capacity} Guests</p>
                </div>
              </div>
              <p>{data?.attributes?.description}</p>
            </div>
            {/* reservation */}
          </div>
          <div className='w-full lg:max-w-[360px] h-max'>
            <Reservation
              reservations={reservations}
              data={data}
              isUserAuthenticated={isUserAuthenticated}
              userData={userData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
