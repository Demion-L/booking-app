import { IReservations } from "@/utils/types";

interface ReservationsProps {
  reservations: IReservations;
}

const Reservation: React.FC<ReservationsProps> = ({ reservations }) => {
  return <div>Reservation</div>;
};

export default Reservation;
