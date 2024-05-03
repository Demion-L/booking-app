import { getRooms } from "@/lib/api";
import RoomList from "./RoomList";

import { RoomsProps } from "@/utils/types";

const Rooms: React.FC<RoomsProps> = async () => {
  const rooms = await getRooms();
  const roomsData = rooms as RoomsProps;

  return (
    <section>
      <div className='container mx-auto'>
        <RoomList rooms={roomsData.data} />
      </div>
    </section>
  );
};

export default Rooms;
