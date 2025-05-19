import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { fadeImages } from "../../constants";

export default function SlideShow() {
  return (
    <div className="w-[924px] h-[307px] group">
      <Fade
        autoplay={true}
        duration={2000}
        nextArrow={
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <img
              src="./src/assets/svgs/ic_arows_right.svg"
              alt="ic_arows_right"
            />
          </div>
        }
        prevArrow={
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <img
              src="./src/assets/svgs/ic_arows_left.svg"
              alt="ic_arows_left"
            />
          </div>
        }
      >
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img className="h-[307px] w-[924px]" src={fadeImage.url} />
          </div>
        ))}
      </Fade>
    </div>
  );
}
