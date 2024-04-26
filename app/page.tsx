import Rooms from "@/components/Rooms";
import Image from "next/image";

const Home = () => {
  return (
    <main>
      <Rooms
        data={[]}
        meta={{
          pagination: {
            page: 0,
            pageCount: 0,
            pageSize: 0,
            total: 0,
          },
        }}
      />
    </main>
  );
};

export default Home;
