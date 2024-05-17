"use client";

import { IReservations, IRoom } from "@/utils/types";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isPast } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import AlertMessage from "./AlertMessage";
import { postData } from "@/lib/api";

interface ReservationsProps {
  reservations: IReservations;
  roomData: IRoom;
  isUserAuthenticated: boolean;
  userData: KindeUser | null;
}

const Reservation: React.FC<ReservationsProps> = ({
  reservations,
  roomData,
  isUserAuthenticated,
  userData,
}) => {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckoutDate] = useState<Date>();
  const [alertMessage, setAllertMessage] = useState<{
    message: string;
    type: "error" | "success" | null;
  } | null>();

  const router = useRouter();

  const formatDateForStrapi = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllertMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertMessage]);

  const saveReservation = () => {
    if (!checkInDate || !checkOutDate) {
      return setAllertMessage({
        message: "Please select check-in and check-out dates",
        type: "error",
      });
    } else if (checkInDate.getTime() === checkOutDate.getTime()) {
      setAllertMessage({
        message: "Check-in and check-out dates cannot be the same",
        type: "error",
      });
    } else {
      // console.log(reservations);

      const isReserved = reservations.data
        .filter(
          (item: any) => item.attributes.room.data.id === roomData.data.id
        )
        .some((item: any) => {
          const existingCheckIn = new Date(item.attributes.checkIn).setHours(
            0,
            0,
            0,
            0
          );
          const existingCheckOut = new Date(item.attributes.checkOut).setHours(
            0,
            0,
            0,
            0
          );

          const checkInTime = checkInDate.setHours(0, 0, 0, 0);
          const checkOutTime = checkOutDate.setHours(0, 0, 0, 0);

          const isReservedBetweenDates =
            (checkInTime >= existingCheckIn &&
              checkInTime < existingCheckOut) ||
            (checkOutTime >= existingCheckIn &&
              checkOutTime < existingCheckOut) ||
            (existingCheckIn > checkInTime && existingCheckIn < checkOutTime) ||
            (existingCheckOut > checkInTime &&
              existingCheckOut <= checkOutTime);

          return isReservedBetweenDates;
        });

      if (isReserved) {
        setAllertMessage({
          message:
            "This room is already booked for selected dates. Please choose different dates or another room",
          type: "error",
        });
      } else {
        const data = {
          data: {
            firstname: userData?.family_name,
            lastname: userData?.given_name,
            email: userData?.email,
            checkIn: checkInDate ? formatDateForStrapi(checkInDate) : null,
            checkOut: checkOutDate ? formatDateForStrapi(checkOutDate) : null,
            room: roomData.data.id,
          },
        };

        postData("http://127.0.0.1:1337/api/reservations", data);

        setAllertMessage({
          message:
            "Your booking has been successfully confirmed! We are looking forward to welcoming you on your selected dates.",
          type: "success",
        });

        router.refresh();
      }
    }
  };

  return (
    <div>
      <div className='bg-tertiary h-[320px] mb-4'>
        {/* top */}
        <div className='bg-accent py-4 text-center relative mb-2'>
          <h4 className='text-xl text-white'>Book your room</h4>
          {/* triangle */}
          <div className='absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h-0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent'></div>
        </div>
        <div className='flex flex-col gap-4 w-full py-6 px-8'>
          {/* Check in */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='default'
                size='md'
                className={cn(
                  "w-full flex justify-start text-left font-semibold",
                  !checkInDate && "text-secondary"
                )}>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {checkInDate ? (
                  format(checkInDate, "PPP")
                ) : (
                  <span>Check in</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
                disabled={isPast}
              />
            </PopoverContent>
          </Popover>
          {/* Check out */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='default'
                size='md'
                className={cn(
                  "w-full flex justify-start text-left font-semibold",
                  !checkOutDate && "text-secondary"
                )}>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {checkOutDate ? (
                  format(checkOutDate, "PPP")
                ) : (
                  <span>Check out</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={checkOutDate}
                onSelect={setCheckoutDate}
                initialFocus
                disabled={isPast}
              />
            </PopoverContent>
          </Popover>

          {/* conditional rendering of the booking button based on an user authentication status */}

          {isUserAuthenticated ? (
            <Button onClick={() => saveReservation()} size='md'>
              Book now
            </Button>
          ) : (
            <LoginLink>
              <Button className='w-full' size='md'>
                Book now
              </Button>
            </LoginLink>
          )}
        </div>
      </div>
      {alertMessage && (
        <AlertMessage message={alertMessage.message} type={alertMessage.type} />
      )}
    </div>
  );
};

export default Reservation;
