"use client";

import { useState, useLayoutEffect, useCallback } from "react";

export function useMediaQuery() {
  const [mounted, setMounted] = useState(false);
  const [device, setDevice] = useState("pc");
  const [orientation, setOrientation] = useState("landscape");

  useLayoutEffect(() => {
    setMounted(true);

    function updateDeviceType() {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice("mobile");
      } else if (width < 1449) {
        setDevice("tablet");
      } else {
        setDevice("pc");
      }
    }

    function updateOrientation() {
      if (window.innerHeight > window.innerWidth) {
        setOrientation("portrait");
      } else {
        setOrientation("landscape");
      }
    }

    updateDeviceType();
    updateOrientation();

    window.addEventListener("resize", updateDeviceType);
    window.addEventListener("resize", updateOrientation);

    const portraitMQ = window.matchMedia("(orientation: portrait)");
    const landscapeMQ = window.matchMedia("(orientation: landscape)");

    function handleOrientationChange(e) {
      if (e.matches) {
        setOrientation(e.media.includes("portrait") ? "portrait" : "landscape");
      }
    }

    portraitMQ.addEventListener("change", handleOrientationChange);
    landscapeMQ.addEventListener("change", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", updateDeviceType);
      window.removeEventListener("resize", updateOrientation);
      portraitMQ.removeEventListener("change", handleOrientationChange);
      landscapeMQ.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  const getValue = useCallback(
    ({ mobile, tablet, pc }) => {
      switch (device) {
        case "mobile":
          return mobile ?? tablet ?? pc;
        case "tablet":
          return tablet ?? pc;
        default:
          return pc;
      }
    },
    [device],
  );

  const getOrientationValue = useCallback(
    ({ portrait, landscape }) => {
      return orientation === "portrait" ? portrait : landscape;
    },
    [orientation],
  );

  return {
    device,
    orientation,
    getValue,
    getOrientationValue,
    mounted,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
  };
}

export function useMediaQueryValue({ mobile, tablet, pc }) {
  const { device } = useMediaQuery();

  switch (device) {
    case "mobile":
      return mobile ?? tablet ?? pc;
    case "tablet":
      return tablet ?? pc;
    default:
      return pc;
  }
}

export function useOrientationValue({ portrait, landscape }) {
  const { orientation } = useMediaQuery();
  return orientation === "portrait" ? portrait : landscape;
}

export function ResponsiveSwitch({ mobile, tablet, pc, defaultComponent }) {
  const { device, mounted, getValue } = useMediaQuery();

  const value = {
    mobile,
    tablet,
    pc,
  };

  if (!mounted) return defaultComponent;

  return getValue(value);
}

export function OrientationSwitch({ portrait, landscape, defaultComponent }) {
  const { orientation, mounted } = useMediaQuery();

  if (!mounted) return defaultComponent;

  return orientation === "portrait" ? portrait : landscape;
}
