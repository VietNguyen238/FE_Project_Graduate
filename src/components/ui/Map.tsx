import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  height?: string;
  width?: string;
  options?: google.maps.MapOptions;
  position: any;
}

const defaultMapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
};

function Map({
  position,
  center = position,
  zoom = 25,
  height = "100%",
  width = "100%",
  options = defaultMapOptions,
}: MapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 text-red-500">
        Google Maps API key is missing. Please check your environment variables.
      </div>
    );
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-red-500">
        Error loading Google Maps: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ height, width }}
      center={center}
      zoom={zoom}
      options={options}
    >
      <Marker position={position} />
    </GoogleMap>
  );
}

export default React.memo(Map);
