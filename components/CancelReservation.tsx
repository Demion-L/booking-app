"use client";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDescription } from "./ui/alert";
import { deleteData } from "@/lib/api";

const CancelReservation = ({ reservation }: { reservation: any }) => {
  const router = useRouter();
  const cancelReservation = (id: number) => {
    deleteData(`http://127.0.0.1:1337/api/reservations/${id}`);
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='md'>Cancel Reservation</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {/* dialog header */}
        <AlertDialogHeader>
          <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>{" "}
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* dialog footer */}
        <AlertDialogFooter>
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
          <AlertDialogAction onClick={() => cancelReservation(reservation.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelReservation;
