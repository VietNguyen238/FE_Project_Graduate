import YouTube, { YouTubeProps } from "react-youtube";

export default function VideoYoutobe() {
  const opts: YouTubeProps["opts"] = {
    height: "400px",
    width: "100%",
  };

  return <YouTube videoId="MROUeV1K5oM" opts={opts} />;
}
