import RoomList from "./RoomList";

import { Room, RoomsProps } from "@/utils/types";

async function getRooms(): Promise<RoomsProps> {
  try {
    const res = await fetch(`http://127.0.0.1:1337/api/rooms?populate=*`, {
      next: {
        revalidate: 0,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching rooms: ", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 0,
          pageCount: 0,
          pageSize: 0,
          total: 0,
        },
      },
    };
  }
}

const Rooms: React.FC<RoomsProps> = async () => {
  const rooms = await getRooms();

  return (
    <section>
      <div className='container mx-auto'>
        <RoomList rooms={rooms.data} />
      </div>
    </section>
  );
};

export default Rooms;
