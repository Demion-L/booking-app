import { Room, RoomsProps, RoomDetailsProps } from "@/utils/types";

export async function getRooms(
  params?: RoomDetailsProps
): Promise<RoomsProps | Room> {
  try {
    const baseUrl = `http://127.0.0.1:1337/api/rooms?populate=*`;
    const url = params
      ? `http://127.0.0.1:1337/api/rooms/${params.params.id}?populate=*`
      : baseUrl;

    const res = await fetch(url, {
      next: {
        revalidate: 0,
      },
    });
    const data = await res.json();

    if (params) {
      return data;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    if (params) {
      return {} as Room; // Return empty room object on error for specific room
    } else {
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
      }; // Return empty RoomsProps on error for all rooms
    }
  }
}