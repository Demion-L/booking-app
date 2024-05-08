export interface Room {
  id: number;
  data: any;
  attributes: {
    capacity: number;
    createdAt: string;
    description: string;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
        id: number;
      };
    };
    price: number;
    publishedAt: string;
    reservations?: {
      data?: [];
    };
    size: string;
    title: string;
    type: string;
    updatedAt: string;
  };
}

export interface RoomsProps {
  data: Room[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface RoomDetailsProps {
  params: {
    id: number;
  };
}

export interface IReservations {
  data: Array<{}>;
  meta: any;
}
