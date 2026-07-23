"use client";

import { cn } from "@/shared/lib/utils";
import { useFindMedicalCenter } from "./context";
import { useEffect, useId, useState } from "react";

export function FindMedicalCenterMap() {
  const id = useId();
  const { selectedItem } = useFindMedicalCenter();
  const [kakaoMap, setKakaoMap] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (kakaoMap) return;

    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById(id);
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        setKakaoMap(new window.kakao.maps.Map(mapContainer, mapOption));
      });
    }
  }, []);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const address = `${selectedItem.address}`;

    if (window.kakao) {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            kakaoMap.setCenter(coords);
            kakaoMap.setLevel(3);
            const marker = new window.kakao.maps.Marker({
              position: coords,
            });
            marker.setMap(kakaoMap);
          }
        });
      });
    }
  }, [selectedItem]);

  return (
    <div className={cn("h-full w-full overflow-hidden rounded-xl bg-dd-gray-lighter")}>
      <div id={id} className={cn("h-full w-full bg-dd-gray-lighter")} />
    </div>
  );
}
