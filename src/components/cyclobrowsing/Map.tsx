import React, { memo } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import "../style.css";

export const RED = "#ec1556";

export const Map = memo(
  ({
    coordinates,
    style,
    isMobile,
    className,
  }: {
    coordinates: [number, number][];
    isMobile: boolean;
    style?: React.CSSProperties;
    className?: string;
  }) => {
    const geoUrl = "./../geo/topo.json";

    const isLoading = !coordinates;

    const currentPosition = coordinates[coordinates.length - 1];
    const scale = isMobile ? 1600 : 1000;
    const verticalTilt = isMobile ? 5 : 5;
    const horizontalTilt = isMobile ? 0 : -25;

    return (
      <div style={style} className={className}>
        {!isLoading && (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              rotate: [
                -currentPosition[0] + horizontalTilt,
                -currentPosition[1] + verticalTilt,
                0,
              ],
              scale: scale,
            }}
            style={{
              opacity: navigator.userAgent !== "ReactSnap" ? 1 : 0,
              height: "100%",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <ZoomableGroup style={{ backgroundColor: "white" }}>
              <Geographies
                style={{ backgroundColor: "white" }}
                geography={geoUrl}
              >
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#F2F2F2"
                      stroke="#F2F2F2"
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))
                }
              </Geographies>

              <Line
                coordinates={coordinates}
                stroke={RED}
                strokeWidth={5.5}
                opacity={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Line
                coordinates={coordinates}
                stroke="white"
                strokeWidth={3}
                opacity={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {currentPosition && (
                <Marker coordinates={currentPosition}>
                  <circle r={5} fill={"white"} />
                </Marker>
              )}
              {currentPosition && (
                <>
                  <Marker coordinates={currentPosition}>
                    <circle r={3} fill={RED} />
                  </Marker>
                  <Marker coordinates={currentPosition}>
                    <circle r={20} fill={RED} className="today" />
                  </Marker>
                </>
              )}
            </ZoomableGroup>
          </ComposableMap>
        )}
      </div>
    );
  }
);
