import Map from "./Map";

interface Props {
  title: string;
  workingTime: string;
  address: string;
  phone1: string;
  technicalNumber: string;
  image: string;
  map: any;
}

export default function StoreSystemCard({
  title,
  workingTime,
  address,
  phone1,
  technicalNumber,
  image,
  map,
}: Props) {
  return (
    <div className="">
      <div className="w-full h-full bg-white p-4 grid grid-cols-2">
        <div className="col-span-1 text-h3 text-title_color">
          <div className="text-title font-medium mb-2">{title}</div>
          <p>
            Thời gian làm việc:{" "}
            <span className="font-medium">{workingTime}</span>
            , chủ nhật nghỉ
            <br />
            Địa chỉ: {address}
            <br />
            Bán hàng:{" "}
            <a
              className="text-link hover:text-title_color"
              href={`tel:${phone1}`}
            >
              {phone1}
            </a>{" "}
            <br />
            Kỹ thuật :{" "}
            <a
              href={`tel:${technicalNumber}`}
              className="text-link hover:text-title_color"
            >
              {technicalNumber}
            </a>
            <br />
            📧 info@vshopvn.com
          </p>
          <div className="w-full mt-8 flex justify-center items-center">
            <img src={image} alt={image} className="w-[320px]" />
          </div>
        </div>
        <div className="col-span-1">
          <Map position={map} />
        </div>
      </div>
      <div className="px-6 bg-white">
        <hr className="border border-zinc-200"></hr>
      </div>
    </div>
  );
}
