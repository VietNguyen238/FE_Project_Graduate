import StoreSystemCard from "../components/ui/StoreSystemCard";
import TitleCategory from "../components/ui/TitleCategory";
import VideoYoutobe from "../components/ui/VideoYoutobe";
import { dataStoreSystem } from "../constants";

export default function StoreSystem() {
  return (
    <div className="h-full w-full">
      <TitleCategory title={"Hệ thống cửa hàng"} />
      {dataStoreSystem.map((item, index) => (
        <StoreSystemCard
          key={index}
          title={item.title}
          address={item.address}
          phone1={item.phone1}
          phone2={item.phone2}
          technicalNumber={item.technicalNumber}
          workingTime={item.workingTime}
          image={item.image}
          map={item.map}
        />
      ))}
      <div className="bg-white p-4">
        <VideoYoutobe />
      </div>
    </div>
  );
}
